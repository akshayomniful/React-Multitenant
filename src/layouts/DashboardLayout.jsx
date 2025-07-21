import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import Toast from "../components/common/Toast";
import PageTransition from "../animations/PageTransition";

const DashboardLayout = () => {
  const { currentUser, loading } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Check screen size and set states accordingly
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (mobile) {
        setIsSidebarCollapsed(true);
        setIsSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // Toggle sidebar functions
  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Calculate content margin based on sidebar state
  const contentMarginLeft = isMobile
    ? "0px"
    : isSidebarCollapsed
    ? "5rem"
    : "16rem";

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      {/* Mobile overlay when sidebar is open */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Navbar with toggle button */}
      <div
        className="fixed top-0 right-0 left-0 z-20 transition-all duration-300"
        style={{ marginLeft: contentMarginLeft }}
      >
        <Navbar
          toggleSidebar={toggleSidebar}
          isSidebarCollapsed={isSidebarCollapsed}
          isMobile={isMobile}
          isSidebarOpen={isSidebarOpen}
        />
      </div>

      {/* Sidebar with collapsible state */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        isMobile={isMobile}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main content area that adjusts with sidebar */}
      <div
        className="pt-16 transition-all duration-300"
        style={{ marginLeft: contentMarginLeft }}
      >
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <PageTransition>
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        </main>
      </div>

      <Toast />
    </div>
  );
};

export default DashboardLayout;
