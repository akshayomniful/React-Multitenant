import React from "react";
import { motion } from "framer-motion";
import Card from "../common/Card";

const AnimatedCard = ({ children, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card {...props}>{children}</Card>
    </motion.div>
  );
};

export default AnimatedCard;
