import { motion } from "framer-motion";
import BuyMeACoffeeIcon from "../icons/bmc-full-logo.svg";
import { ReactComponent as Logo } from "../icons/logo.svg";
import AnimatedBackground from "../components/AnimatedBackground";
import { useNavigate } from "react-router-dom";

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
      <img alt="" className="buy-me-a-coffee-icon" src={BuyMeACoffeeIcon} />
    </motion.a>
  );
}

function ErrorPage({ darkMode }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        <motion.div
          className="card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 style={{color: darkMode ? "#fff": "#464646"}} >Oops! Something went wrong.</h2>
          <svg xmlns="http://www.w3.org/2000/svg" style={{padding: "2%"}} width="140" height="140" viewBox="0 0 24 24"><path fill="#da667b" d="M12 4c-4.42 0-8 3.58-8 8s3.58 8 8 8s8-3.58 8-8s-3.58-8-8-8m1 13h-2v-2h2zm0-4h-2V7h2z" opacity="0.3"/><path fill="#da667b" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8m-1-5h2v2h-2zm0-8h2v6h-2z"/></svg>
          <p style={{ color: darkMode ? "rgb(119, 119, 119)" : "rgb(123, 123, 123)" }}>
            We couldn't find the page you're looking for.<br />
            It seems this link has wandered off!
          </p>
          <button
            className="submit-button"
            onClick={() => navigate("/")}
            style={{ marginTop: 20, width: "100%", padding: 15 }}
          >
            Go to Main Page
          </button>
        </motion.div>
      </div>
      <BuyMeACoffeeButton />
    </>
  );
}

export default ErrorPage;
