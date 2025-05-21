import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { ReactComponent as Icon } from "../icons/icon.svg";
import { ReactComponent as IconBlack } from "../icons/icon.svg";
import QRCode from "react-qr-code";
import Confetti from "react-confetti";
import { Canvg } from 'canvg';

import "./GeneratedPage.css";

// components
import Textarea from "../components/Input";
import PrimaryButton from "../components/PrimaryButton";
import BackToGeneratingButton from "../components/BackToGeneratingButton";

export default function Home({ darkMode }) {
    const navigate = useNavigate();

    const { key } = useParams();
    const [shortUrl, setShortUrl] = useState(`${window.location.origin}/${key}`);

    // confetti animation
    const [pieces, setPieces] = useState(200);

    useEffect(() => {
        const timer = setTimeout(() => setPieces(0), 3000);
        return () => clearTimeout(timer);
    });

    function copyLinkToClipboard() {
        console.groupCollapsed(
            '%c📋 Copy Action - Link',
            'color: #71816d; font-family: monospace; font-weight: bold; font-size: 12px;'
        );

        console.log(
            '%c• Copied URL:     %c' + shortUrl,
            'color: #f1e0c5; font-family: monospace;',
            'color: white; font-family: monospace;'
        );

        console.log(
            '%c• Timestamp:      %c' + new Date().toLocaleTimeString(),
            'color: #f1e0c5; font-family: monospace;',
            'color: white; font-family: monospace;'
        );

        console.groupEnd();

        navigator.clipboard.writeText(shortUrl).catch((err) => {
            console.groupCollapsed(
            '%c❌ Copy Link Failed',
            'color: #ff6b6b; font-family: monospace; font-weight: bold; font-size: 12px;'
            );
            console.error(err);
            console.groupEnd();
        });
    }

    async function copyQrToClipboard() {
        const svgElement = document.getElementById("qr-svg");
        if (!svgElement) return;

        const svgString = new XMLSerializer().serializeToString(svgElement);
        const canvas = document.createElement("canvas");
        canvas.width = 256;
        canvas.height = 256;

        const ctx = canvas.getContext("2d");
        const v = await Canvg.from(ctx, svgString);
        await v.render();

        canvas.toBlob(async (blob) => {
            if (!blob) return;

            try {
            await navigator.clipboard.write([
                new ClipboardItem({ "image/png": blob })
            ]);

            console.groupCollapsed(
                '%c📋 Copy Action - QR Code',
                'color: #71816d; font-family: monospace; font-weight: bold; font-size: 12px;'
            );

            console.log(
                '%c• Copied QR for: %c' + shortUrl,
                'color: #f1e0c5; font-family: monospace;',
                'color: white; font-family: monospace;'
            );

            console.log(
                '%c• Format:        %cPNG',
                'color: #f1e0c5; font-family: monospace;',
                'color: white; font-family: monospace;'
            );

            console.log(
                '%c• Timestamp:     %c' + new Date().toLocaleTimeString(),
                'color: #f1e0c5; font-family: monospace;',
                'color: white; font-family: monospace;'
            );

            console.groupEnd();

            } catch (err) {
            console.groupCollapsed(
                '%c❌ Copy QR Failed',
                'color: #ff6b6b; font-family: monospace; font-weight: bold; font-size: 12px;'
            );
            console.error(err);
            console.groupEnd();
            }
        }, "image/png");
    }

  return (
    <>
      <Confetti numberOfPieces={pieces} recycle={false} />
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
          <div className="card-content-container">
              <motion.button
                    className="qr-code-button"
                    onClick={copyQrToClipboard}
                    whileTap={{ rotate: -20 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                <QRCode
                  className="qr-code"
                  value={shortUrl}
                  size={256}
                  id="qr-svg"
                />
              </motion.button>
              <div className="short-url-row">
                <div className="short-url-container">
                  <p className="first">{shortUrl.substring(0, shortUrl.lastIndexOf("/") + 1)}</p>
                  <p className="second">{shortUrl.substring(shortUrl.lastIndexOf("/") + 1)}</p>
                </div>
                <motion.button
                    className="copy-button"
                    onClick={copyLinkToClipboard}
                    whileTap={{ rotate: -20 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M19.4 20H9.6a.6.6 0 0 1-.6-.6V9.6a.6.6 0 0 1 .6-.6h9.8a.6.6 0 0 1 .6.6v9.8a.6.6 0 0 1-.6.6"/><path d="M15 9V4.6a.6.6 0 0 0-.6-.6H4.6a.6.6 0 0 0-.6.6v9.8a.6.6 0 0 0 .6.6H9"/></g></svg>
                </motion.button>
              </div>

              <button
                className="generated-analytics-button"
                onClick={() => {
                    navigate("/analytics/" + key);
                }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M6 13H2c-.6 0-1 .4-1 1v8c0 .6.4 1 1 1h4c.6 0 1-.4 1-1v-8c0-.6-.4-1-1-1m16-4h-4c-.6 0-1 .4-1 1v12c0 .6.4 1 1 1h4c.6 0 1-.4 1-1V10c0-.6-.4-1-1-1m-8-8h-4c-.6 0-1 .4-1 1v20c0 .6.4 1 1 1h4c.6 0 1-.4 1-1V2c0-.6-.4-1-1-1"/></svg>
                    Check Analytics
                </button>

              <BackToGeneratingButton/>
            </div>
        </motion.div>
      </div>
    </>
  );
}
