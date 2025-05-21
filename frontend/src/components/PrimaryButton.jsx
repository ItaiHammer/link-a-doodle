import { motion } from "framer-motion";

import './PrimaryButton.css';

export default function PrimaryButton({ icon, text, loading, success, onClick }) {
  const buttonVariants = {
    initial: {
      backgroundColor: "#DA667B",
    },
    loading: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      transition: { duration: 0.3 },
    },
    success: {
      backgroundColor: "#71816d",
      transition: { duration: 0.3 },
    },
    hover: {
      backgroundColor: "rgb(185, 89, 107)",
      transition: { duration: 0.3, delay: 0 },
    },
  };

  const pulseAnimation = {
    scale: [1, 1.2, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <motion.button
      className="primary-button"
      onClick={onClick}
      variants={buttonVariants}
      animate={loading ? "loading" : success ? "success" : "initial"}
      initial="initial"
      whileHover="hover"
    >
      {loading ? (
        <motion.div
          className="loader"
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            backgroundColor: "#DA667B",
          }}
          animate={pulseAnimation}
        />
      ) : success ? (
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="#fff"
            d="M9 16.17l-3.88-3.88L4 13.41 9 18.41l12-12-1.41-1.41z"
          />
        </svg>
      ) : (
        <>
          {icon}
          {text}
        </>
      )}
    </motion.button>
  );
}