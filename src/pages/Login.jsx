import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { users } from "../data/users";
import Button from "../components/common/Button";
import { motion } from "framer-motion";

const Login = () => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (selectedUserId) {
      const success = login(parseInt(selectedUserId));
      if (success) {
        navigate("/dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-2">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-md"
      >
        {/* Glassmorphism Container */}
        <div className="relative backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/20 p-6 mb-5">
          {/* Inner glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

          <div className="relative z-10">
            <motion.h3
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-2xl font-bold text-white mb-8 text-center tracking-wide"
            >
              Welcome Back
            </motion.h3>

            <form onSubmit={handleLogin} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <label
                  htmlFor="user"
                  className="block text-sm font-medium text-white/90 mb-2"
                >
                  Select User Role
                </label>
                <select
                  id="user"
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  className="w-full px-4 py-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300"
                  required
                >
                  <option value="" className="bg-gray-800 text-white">
                    Choose your role
                  </option>
                  {users.map((user) => (
                    <option
                      key={user.id}
                      value={user.id}
                      className="bg-gray-800 text-white"
                    >
                      {user.name} ({user.role} at Tenant {user.tenantId})
                    </option>
                  ))}
                </select>
              </motion.div>

              {selectedUserId && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="backdrop-blur-md bg-white/5 border border-white/10 p-4 rounded-xl">
                    <h4 className="text-sm font-semibold text-white/90 mb-3">
                      User Details
                    </h4>
                    {(() => {
                      const user = users.find(
                        (u) => u.id === parseInt(selectedUserId)
                      );
                      return (
                        <div className="text-sm text-white/70 space-y-1">
                          <p>
                            <span className="font-medium text-white/90">
                              Name:
                            </span>{" "}
                            {user.name}
                          </p>
                          <p>
                            <span className="font-medium text-white/90">
                              Email:
                            </span>{" "}
                            {user.email}
                          </p>
                          <p>
                            <span className="font-medium text-white/90">
                              Role:
                            </span>{" "}
                            {user.role}
                          </p>
                          <p>
                            <span className="font-medium text-white/90">
                              Tenant:
                            </span>{" "}
                            {user.tenantId}
                          </p>
                        </div>
                      );
                    })()}
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  fullWidth
                  disabled={!selectedUserId}
                  className={`
                    relative py-3 px-6 font-semibold text-white rounded-xl transition-all duration-300
                    ${
                      selectedUserId
                        ? "bg-gradient-to-r from-blue-500/80 to-purple-600/80 hover:from-blue-600/90 hover:to-purple-700/90 shadow-lg shadow-blue-500/25 backdrop-blur-sm border border-white/20"
                        : "bg-white/10 border border-white/10 text-white/50 cursor-not-allowed"
                    }
                  `}
                >
                  <span className="relative z-10">
                    {selectedUserId ? "Sign In" : "Select a user to continue"}
                  </span>
                  {selectedUserId && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-700/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Decorative elements */}
            <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-pink-400/10 to-blue-600/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
