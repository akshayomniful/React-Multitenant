import { AbilityBuilder, Ability } from "@casl/ability";
import { permissions } from "../data/permissions";

export function defineRulesFor(user) {
  const { can, rules } = new AbilityBuilder(Ability);

  if (!user) return new Ability([]);

  // Get permissions for the user's role
  const rolePermissions = permissions[user.role] || [];

  // Apply each permission
  rolePermissions.forEach((permission) => {
    // Handle conditions with variable substitution
    let conditions = permission.conditions;
    if (conditions) {
      conditions = JSON.parse(
        JSON.stringify(conditions).replace(/\$\{user\.id\}/g, user.id)
      );
    }

    can(permission.action, permission.subject, conditions);
  });

  // Add tenant-specific rule
  can("access", "Tenant", { id: user.tenantId });

  return new Ability(rules);
}

export function updateAbility(ability, user) {
  const newAbility = defineRulesFor(user);
  ability.update(newAbility.rules);
}
