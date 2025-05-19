import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import BuyMeACoffeeIcon from "../icons/bmc-full-logo.svg";
import { ReactComponent as Logo } from "../icons/logo.svg";
import AnimatedBackground from "../components/AnimatedBackground";
import DarkModeToggle from "../components/DarkModeToggle";

function AnimatedSubmitButton({ loading, success, onClick }) {
  const buttonVariants = {
    initial: {
      width: "100%",
      borderRadius: "8px",
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
      className="submit-button"
      onClick={onClick}
      variants={buttonVariants}
      animate={loading ? "loading" : success ? "success" : "initial"}
      initial="initial"
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
        "Shorten URL"
      )}
    </motion.button>
  );
}

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

function Home({ darkMode }) {
  const [customKey, setCustomKey] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!inputUrl) return;
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      console.groupCollapsed(
        '%c┌─[ 🌐 URL Shortener Request ]──────────────╮',
        'color: rgb(177, 177, 177); font-family: monospace; font-size: 12px; font-weight: bold;'
      );

      console.log(
        '%c• Input URL:     %c' + inputUrl,
        'color: #f1e0c5; font-family: monospace;',
        'color: white; font-family: monospace;'
      );

      console.log(
        '%c• Custom Key:    %c' + (customKey || 'N/A'),
        'color: #f1e0c5; font-family: monospace;',
        'color: white; font-family: monospace;'
      );

      console.log(
        '%c• Timestamp:     %c' + new Date().toLocaleTimeString(),
        'color: #f1e0c5; font-family: monospace;',
        'color: white; font-family: monospace;'
      );

      console.groupEnd();


      const response = await axios.post(
        "/api/url/shorten",
        { redirectUrl: inputUrl, customKey }
      );

      console.groupCollapsed(
        '%c╰─[ 🎉 Shorten Response Received ]──────────╯',
        'color: #71816d; font-family: monospace; font-size: 12px; font-weight: bold;'
      );


      console.log(
        '%c• Short URL:      %c' + `${window.location.origin}/${response.data.key}`,
        'color: #da667b; font-family: monospace;',
        'color: white; font-family: monospace;'
      );

      console.log(
        '%c• Key:            %c' + response.data.key,
        'color: #f1e0c5; font-family: monospace;',
        'color: white; font-family: monospace;'
      );

      console.log(
        '%c• Full Response:  ',
        'color: #f1e0c5; font-family: monospace;'
      );
      console.log(response);

      setShortUrl(`${window.document.URL}${response.data.key}`);
      setLoading(false);
      setSuccess(true);
      setInputUrl("");
      setCustomKey("");
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.groupCollapsed(
        '%c╰─[ ❌ Shorten Request Failed ]─────────────╯',
        'color: #ff6b6b; font-family: monospace; font-size: 12px; font-weight: bold;'
      );


      console.log(
        '%c• Timestamp:     %c' + new Date().toLocaleTimeString(),
        'color: #f1e0c5; font-family: monospace;',
        'color: white; font-family: monospace;'
      );

      console.log(
        '%c• Error Message: %c' + (err?.message || 'Unknown Error'),
        'color: #f1e0c5; font-family: monospace;',
        'color: white; font-family: monospace;'
      );

      console.log(
        '%c• Full Error:    ',
        'color: #f1e0c5; font-family: monospace;'
      );
      console.error(err);

      console.groupEnd();

      setError("Failed to shorten URL");
      setLoading(false);
    }

  }

  return (
    <>
      <div className="container">
        <motion.div
          className="card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="logo-container"
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Logo className="logo" />
          </motion.div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Custom Name (optional)"
              value={customKey}
              onChange={(e) => setCustomKey(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter your URL here"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
            />
            <AnimatedSubmitButton
              loading={loading}
              success={success}
              onClick={handleSubmit}
            />
          </form>
          {error && <p className="error">{error}</p>}
          {shortUrl && (
            <div className="result">
              <p>Your shortened URL:</p>
              <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                {shortUrl}
              </a>
            </div>
          )}
        </motion.div>
      </div>
      <BuyMeACoffeeButton />
    </>
  );
}

export default Home;
