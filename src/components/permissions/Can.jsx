import React from "react";
import { useAbility } from "../../hooks/useAbility";
import { motion, AnimatePresence } from "framer-motion";

const Can = ({
  I: action,
  a: subject,
  field,
  this: conditions,
  children,
  passThrough = false,
  animate = true,
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

  // If animations are disabled, use the original behavior
  if (!animate) {
    if (allowed) {
      return children;
    }

    if (passThrough && React.isValidElement(children)) {
      return React.cloneElement(children, { disabled: true });
    }

    return null;
  }

  // With animations enabled
  return (
    <AnimatePresence>
      {allowed ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          style={{ overflow: "hidden" }}
        >
          {children}
        </motion.div>
      ) : passThrough && React.isValidElement(children) ? (
        <motion.div
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.2 }}
        >
          {React.cloneElement(children, { disabled: true })}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Can;
