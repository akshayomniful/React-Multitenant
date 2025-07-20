// Tenant service for multi-tenancy support
export const tenantService = {
  // Store current tenant ID
  currentTenant: null,

  // Set the current tenant
  setCurrentTenant(tenantId) {
    this.currentTenant = tenantId;
    localStorage.setItem("hg_tenant", tenantId);
  },

  // Get the current tenant
  getCurrentTenant() {
    if (!this.currentTenant) {
      this.currentTenant = localStorage.getItem("hg_tenant");
    }
    return this.currentTenant;
  },

  // Clear the current tenant
  clearCurrentTenant() {
    this.currentTenant = null;
    localStorage.removeItem("hg_tenant");
  },

  // Check if user belongs to tenant
  userBelongsToTenant(user, tenantId) {
    return user && user.tenantId === tenantId;
  },
};
