import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import BuyMeACoffeeIcon from "../icons/bmc-full-logo.svg";
import { ReactComponent as Logo } from "../icons/logo.svg";
import AnimatedBackground from "../components/AnimatedBackground";

function BuyMeACoffeeButton() {
  return (
    <motion.a
      className="buy-me-a-coffee-container"
      href="https://buymeacoffee.com/itaihammer"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ y: 20, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <img alt="Buy Me a Coffee" className="buy-me-a-coffee-icon" src={BuyMeACoffeeIcon} />
    </motion.a>
  );
}

function Analytics({ darkMode }) {
  const { key } = useParams(); // <-- Get the short URL key from the route

  return (
    <>
      <AnimatedBackground darkMode={darkMode} />
      <div className="container">
        <motion.div
          className="card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="logo-container">
            <Logo className="logo" />
          </div>

          <div className="analytics-content">
            <h1>Analytics Page</h1>
            <p>Short Link Key: <strong>{key}</strong></p>
            <p>This is test data. Eventually this will show click analytics.</p>
          </div>
        </motion.div>
      </div>
      <BuyMeACoffeeButton />
    </>
  );
}

export default Analytics;
