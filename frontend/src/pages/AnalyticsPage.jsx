import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { ReactComponent as Icon } from "../icons/icon.svg";
import { ReactComponent as IconBlack } from "../icons/icon.svg";

import "./Analytics.css";

// components
import Textarea from "../components/Input";
import PrimaryButton from "../components/PrimaryButton";
import BackToGeneratingButton from "../components/BackToGeneratingButton";

function Home({ darkMode }) {
    const navigate = useNavigate();

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

    // check if the input is a valid URL or key

    // if it's valid
    navigate(`/analytics/${inputUrl.split("/").pop()}`);
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
            {darkMode ? (
              <IconBlack className="logo" />
            ) : (
              <Icon className="logo" />
            )}
          </motion.div>

          <form className="home-form" onSubmit={handleSubmit}>
            <Textarea
              value={inputUrl}
              onChange={setInputUrl}
              label="URL or Key"
              placeholder="Enter URL or Key"
              tooltipText={"The key is the last part of your short URL"}
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)"/><path d="M2 12h20"/></g></svg>}
            />
            <PrimaryButton
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M6 13H2c-.6 0-1 .4-1 1v8c0 .6.4 1 1 1h4c.6 0 1-.4 1-1v-8c0-.6-.4-1-1-1m16-4h-4c-.6 0-1 .4-1 1v12c0 .6.4 1 1 1h4c.6 0 1-.4 1-1V10c0-.6-.4-1-1-1m-8-8h-4c-.6 0-1 .4-1 1v20c0 .6.4 1 1 1h4c.6 0 1-.4 1-1V2c0-.6-.4-1-1-1"/></svg>}
                text="Check Analytics"
            />
          </form>

          <BackToGeneratingButton/>
          {error && <p className="error">{error}</p>}
        </motion.div>
      </div>
    </>
  );
}

export default Home;
