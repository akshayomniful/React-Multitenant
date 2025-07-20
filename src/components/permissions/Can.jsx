import React from "react";
import { useAbility } from "../../hooks/useAbility";

const Can = ({
  I: action,
  a: subject,
  field,
  this: conditions,
  children,
  passThrough = false,
}) => {
  const ability = useAbility();

  const check = () => {
    if (field) {
      return ability.can(action, subject, field);
    }
    if (conditions) {
      return ability.can(action, subject, conditions);
    }
    return ability.can(action, subject);
  };

  const allowed = check();

  if (allowed) {
    return children;
  }

  if (passThrough && React.isValidElement(children)) {
    return React.cloneElement(children, { disabled: true });
  }

  return null;
};

export default Can;
