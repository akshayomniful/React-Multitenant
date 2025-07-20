import React, { createContext, useState, useEffect, useContext } from "react";
import { users } from "../data/users";
import { tenants } from "../data/tenants";
import { AbilityContext } from "./AbilityContext";
import { updateAbility } from "../utils/ability";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const ability = useContext(AbilityContext);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      updateAbility(ability, user);
    }
    setLoading(false);
  }, [ability]);

  const login = (userId) => {
    const user = users.find((u) => u.id === parseInt(userId));
    if (user) {
      const tenant = tenants.find((t) => t.id === user.tenantId);
      const userWithTenant = { ...user, tenant };
      setCurrentUser(userWithTenant);
      localStorage.setItem("currentUser", JSON.stringify(userWithTenant));
      updateAbility(ability, userWithTenant);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    updateAbility(ability, null);
  };

  const value = {
    currentUser,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
