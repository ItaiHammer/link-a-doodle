import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { ReactComponent as Icon } from "../icons/icon.svg";
import { ReactComponent as IconBlack } from "../icons/icon.svg";
import QRCode from "react-qr-code";

import "./Home.css";

// components
import Textarea from "../components/Input";
import PrimaryButton from "../components/PrimaryButton";
import BackToGeneratingButton from "../components/BackToGeneratingButton";

function GenerateContent() {

}

function Home({ darkMode }) {
  const navigate = useNavigate();

  const [customKey, setCustomKey] = useState("");
  const [customKeyError, setCustomKeyError] = useState("");

  const [inputUrl, setInputUrl] = useState("");
  const [inputUrlError, setInputUrlError] = useState("");

  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!inputUrl) return;
    setLoading(true);
    
    setCustomKeyError("");
    setInputUrlError("");

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

      navigate(`/generated/${response.data.key}`);
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

      const errorMessage = err?.response?.data?.error;

      if (errorMessage.toLowerCase().includes("url")) {
        setInputUrlError(errorMessage);
      } else if (errorMessage.toLowerCase().includes("key")){
        setCustomKeyError(errorMessage);
      }

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
              label="Enter URL Here"
              placeholder="Enter URL"
              errorMessage={inputUrlError}
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)"/><path d="M2 12h20"/></g></svg>}
            />
            <Textarea
              value={customKey}
              onChange={setCustomKey}
              label="Doodle Name (optional)"
              placeholder="Custom Name"
              errorMessage={customKeyError}
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></g></svg>}
            />
            <PrimaryButton
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="currentColor" d="M9.31 6.71a.996.996 0 0 0 0 1.41L13.19 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L10.72 6.7c-.38-.38-1.02-.38-1.41.01"/></svg>}
            />
          </form>
        </motion.div>

        <motion.button
          className="analytics-button"
          onClick={()=> navigate("/analytics")}

          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M6 13H2c-.6 0-1 .4-1 1v8c0 .6.4 1 1 1h4c.6 0 1-.4 1-1v-8c0-.6-.4-1-1-1m16-4h-4c-.6 0-1 .4-1 1v12c0 .6.4 1 1 1h4c.6 0 1-.4 1-1V10c0-.6-.4-1-1-1m-8-8h-4c-.6 0-1 .4-1 1v20c0 .6.4 1 1 1h4c.6 0 1-.4 1-1V2c0-.6-.4-1-1-1"/></svg>
          Check Analytics
        </motion.button>
      </div>
    </>
  );
}

export default Home;
