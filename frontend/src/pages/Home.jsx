import {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {motion} from "framer-motion";
import {ReactComponent as Icon} from "../icons/icon.svg";
import {ReactComponent as IconBlack} from "../icons/icon.svg";
import QRCodeStyling from "qr-code-styling";
import Confetti from "react-confetti";

import Textarea from "../components/Input";
import PrimaryButton from "../components/PrimaryButton";
import BackToGeneratingButton from "../components/BackToGeneratingButton";
import Tabs from "../components/Tabs";

import "./Home.css";

function GenerateTab({darkMode}) {
  const [inputUrl, setInputUrl] = useState("");
  const [customKey, setCustomKey] = useState("");
  const [inputUrlError, setInputUrlError] = useState("");
  const [customKeyError, setCustomKeyError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shortenedLink, setShortenedLink] = useState();
  const QRSize = 200;
  const QRColor = !darkMode ? "#131313" : "#A8ADBD";
  const [QRCode, setQRCode] = useState(
    new QRCodeStyling({
      width: QRSize,
      height: QRSize,
      dotsOptions: {
        color: "#000000",
        type: "rounded",
      },
      backgroundOptions: {
        color: "none",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 5,
      },
    })
  );
  const [key, setKey] = useState();
  const [newKey, setNewKey] = useState();
  const [newKeyError, setNewKeyError] = useState();
  const [newKeyCausingError, setNewKeyCausingError] = useState();

  // confetti animation
  const [pieces, setPieces] = useState(0);
  const [isFirstConfettiRender, setIsFirstConfettiRender] = useState(true);

  const handleGenerateSubmit = async (e) => {
    e.preventDefault();
    setInputUrlError("");
    setCustomKeyError("");
    setSuccess(false);
    setLoading(true);

    try {
      const response = await axios.post("/api/url/shorten", {
        redirectUrl: inputUrl,
        customKey,
      });

      const newShort = window.location.origin + "/" + response.data.key;
      setShortenedLink(newShort);
      setKey(response.data.key);
      setNewKey(response.data.key);
      setInputUrl("");
      setCustomKey("");
      setSuccess(true);
    } catch (err) {
      const error = err?.response?.data?.error || "Unknown error";
      if (error.toLowerCase().includes("url")) setInputUrlError(error);
      else if (error.toLowerCase().includes("key")) setCustomKeyError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFirstConfettiRender) {
      setIsFirstConfettiRender(false);
      return;
    }

    setPieces(300);
    const timer = setTimeout(() => {
      setPieces(0);
    }, 1500);
    return () => clearTimeout(timer);
  }, [success]);

  function copyLinkToClipboard() {
    console.groupCollapsed(
      "%c📋 Copy Action - Link",
      "color: #71816d; font-family: monospace; font-weight: bold; font-size: 12px;"
    );

    console.log(
      "%c• Copied URL:     %c" + shortenedLink,
      "color: #f1e0c5; font-family: monospace;",
      "color: white; font-family: monospace;"
    );

    console.log(
      "%c• Timestamp:      %c" + new Date().toLocaleTimeString(),
      "color: #f1e0c5; font-family: monospace;",
      "color: white; font-family: monospace;"
    );

    console.groupEnd();

    navigator.clipboard.writeText(shortenedLink).catch((err) => {
      console.groupCollapsed(
        "%c❌ Copy Link Failed",
        "color: #ff6b6b; font-family: monospace; font-weight: bold; font-size: 12px;"
      );
      console.error(err);
      console.groupEnd();
    });
  }

  async function copyQrToClipboard() {
    const canvas = document.getElementById("qr-code");
    if (!canvas) return;

    console.log(canvas);

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      try {
        await navigator.clipboard.write([
          new ClipboardItem({"image/png": blob}),
        ]);

        console.groupCollapsed(
          "%c📋 Copy Action - QR Code",
          "color: #71816d; font-family: monospace; font-weight: bold; font-size: 12px;"
        );

        console.log(
          "%c• Copied QR for: %c" + shortenedLink,
          "color: #f1e0c5; font-family: monospace;",
          "color: white; font-family: monospace;"
        );

        console.log(
          "%c• Format:        %cPNG",
          "color: #f1e0c5; font-family: monospace;",
          "color: white; font-family: monospace;"
        );

        console.log(
          "%c• Timestamp:     %c" + new Date().toLocaleTimeString(),
          "color: #f1e0c5; font-family: monospace;",
          "color: white; font-family: monospace;"
        );

        console.groupEnd();
      } catch (err) {
        console.groupCollapsed(
          "%c❌ Copy QR Failed",
          "color: #ff6b6b; font-family: monospace; font-weight: bold; font-size: 12px;"
        );
        console.error(err);
        console.groupEnd();
      }
    }, "image/png");
  }

  function StyledQRCode({url}) {
    const qrRef = useRef(null);

    useEffect(() => {
      if (url && qrRef.current) {
        QRCode.update({data: url});
        QRCode.append(qrRef.current);
        qrRef.current.firstChild.id = "qr-code";
      }
    }, [url]);

    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        ref={qrRef}
      />
    );
  }

  function QRCodeButton({icon, qrCodeSettings}) {
    function changeQRCodeStyling() {
      setQRCode(new QRCodeStyling(qrCodeSettings));
    }

    return (
      <button
        onClick={changeQRCodeStyling}
        className="home-qr-code-customization-buttons"
      >
        {icon}
      </button>
    );
  }

  async function editKey(e) {
    e.preventDefault();
    setNewKeyError("");

    try {
      const response = await axios.post("/api/url/changeKey/" + key, {
        newKey,
      });
      setKey(response.data.key);
      setNewKey(response.data.key);
    } catch (err) {
      const error = err?.response?.data?.error || "Unknown error";

      setNewKeyError(error);
      setNewKeyCausingError(newKey);
    }
  }

  // ressetting the error once the user has changed the new key
  useEffect(() => {
    setNewKeyError();
  }, [newKey]);

  return (
    <>
      <Confetti numberOfPieces={pieces} recycle={false} />
      <form className="home-form" onSubmit={handleGenerateSubmit}>
        <Textarea
          value={inputUrl}
          onChange={setInputUrl}
          label="Enter URL Here"
          placeholder="Enter URL"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{rotate: "-135deg"}}
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M8 12a1 1 0 0 0 1 1h6a1 1 0 0 0 0-2H9a1 1 0 0 0-1 1"
              />
              <path
                fill="currentColor"
                d="M9 16H7.21A4.13 4.13 0 0 1 3 12.37A4 4 0 0 1 7 8h2a1 1 0 0 0 0-2H7.21a6.15 6.15 0 0 0-6.16 5.21A6 6 0 0 0 7 18h2a1 1 0 0 0 0-2m14-4.76A6.16 6.16 0 0 0 16.76 6h-1.51C14.44 6 14 6.45 14 7a1 1 0 0 0 1 1h1.79A4.13 4.13 0 0 1 21 11.63A4 4 0 0 1 17 16h-2a1 1 0 0 0 0 2h2a6 6 0 0 0 6-6.76"
              />
            </svg>
          }
          errorMessage={inputUrlError}
        />
        <Textarea
          value={customKey}
          onChange={setCustomKey}
          label="Doodle Name (optional)"
          placeholder="Custom Name"
          tooltipText="The doodle name is the last part of your short URL"
          maxCharacters={15}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 11.172V5a2 2 0 0 1 2-2h6.172a2 2 0 0 1 1.414.586l8 8a2 2 0 0 1 0 2.828l-6.172 6.172a2 2 0 0 1-2.828 0l-8-8A2 2 0 0 1 3 11.172M7 7h.001"
              />
            </svg>
          }
          errorMessage={customKeyError}
        />
        <PrimaryButton
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M9.31 6.71a.996.996 0 0 0 0 1.41L13.19 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L10.72 6.7c-.38-.38-1.02-.38-1.41.01"
              />
            </svg>
          }
        />
      </form>

      {success && (
        <div className="home-sucess-menu">
          <div className="home-sucess-menu-seperator" />
          <div className="generate-sucess-menu-link-bar-container">
            <Textarea
              width={226}
              height={39}
              borderRadius={15}
              fontSize={12}
              prefix={window.location.host + "/"}
              value={newKey}
              onChange={setNewKey}
              errorMessage={newKeyError}
              maxCharacters={15}
            />
            {newKey != key ? (
              !newKeyError || newKey != newKeyCausingError ? (
                <motion.button
                  whileTap={{scale: 0.95}}
                  transition={{type: "spring", stiffness: 300}}
                  className="generate-sucess-menu-link-copy-button"
                  onClick={editKey}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" fill-rule="evenodd">
                      <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                      <path
                        fill="currentColor"
                        d="M21.546 5.111a1.5 1.5 0 0 1 0 2.121L10.303 18.475a1.6 1.6 0 0 1-2.263 0L2.454 12.89a1.5 1.5 0 1 1 2.121-2.121l4.596 4.596L19.424 5.111a1.5 1.5 0 0 1 2.122 0"
                      />
                    </g>
                  </svg>
                </motion.button>
              ) : (
                <motion.button
                  whileTap={{scale: 0.95}}
                  transition={{type: "spring", stiffness: 300}}
                  className="generate-sucess-menu-link-copy-button"
                  onClick={() => {
                    setNewKey(key);
                    setNewKeyError();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 18h3.75a5.25 5.25 0 1 0 0-10.5H5M7.5 4L4 7.5L7.5 11"
                    />
                  </svg>
                </motion.button>
              )
            ) : (
              <motion.button
                whileTap={{scale: 0.95}}
                transition={{type: "spring", stiffness: 300}}
                className="generate-sucess-menu-link-copy-button"
                onClick={copyLinkToClipboard}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 11c0-2.828 0-4.243.879-5.121C7.757 5 9.172 5 12 5h3c2.828 0 4.243 0 5.121.879C21 6.757 21 8.172 21 11v5c0 2.828 0 4.243-.879 5.121C19.243 22 17.828 22 15 22h-3c-2.828 0-4.243 0-5.121-.879C6 20.243 6 18.828 6 16z" />
                    <path
                      d="M6 19a3 3 0 0 1-3-3v-6c0-3.771 0-5.657 1.172-6.828S7.229 2 11 2h4a3 3 0 0 1 3 3"
                      opacity="0.5"
                    />
                  </g>
                </svg>
              </motion.button>
            )}
          </div>

          <div className="home-sucess-menu-qr-code-bar">
            <motion.button
              className="home-qr-code-button"
              whileTap={{scale: 0.95}}
              transition={{type: "spring", stiffness: 300}}
              onClick={copyQrToClipboard}
            >
              <StyledQRCode url={shortenedLink} />
            </motion.button>
            <div className="home-qr-code-customization-buttons-container">
              <QRCodeButton
                icon={"1"}
                qrCodeSettings={{
                  width: QRSize,
                  height: QRSize,
                  data: shortenedLink,
                  dotsOptions: {
                    color: QRColor,
                    type: "square",
                  },
                  cornersSquareOptions: {
                    type: "square",
                    color: QRColor,
                  },
                  cornersDotOptions: {
                    type: "square",
                    color: QRColor,
                  },
                  backgroundOptions: {
                    color: "none",
                  },
                }}
              />
              <QRCodeButton
                icon={"2"}
                qrCodeSettings={{
                  width: QRSize,
                  height: QRSize,
                  data: shortenedLink,
                  dotsOptions: {
                    color: QRColor,
                    type: "extra-rounded",
                  },
                  cornersSquareOptions: {
                    type: "dot",
                    color: QRColor,
                  },
                  cornersDotOptions: {
                    type: "dot",
                    color: QRColor,
                  },
                  backgroundOptions: {
                    color: "none",
                  },
                }}
              />
              <QRCodeButton
                icon={"3"}
                qrCodeSettings={{
                  width: QRSize,
                  height: QRSize,
                  data: shortenedLink,
                  dotsOptions: {
                    color: QRColor,
                    type: "rounded",
                  },
                  cornersSquareOptions: {
                    type: "extra-rounded",
                    color: QRColor,
                  },
                  cornersDotOptions: {
                    type: "dot",
                    color: QRColor,
                  },
                  backgroundOptions: {
                    color: "none",
                  },
                }}
              />
              <QRCodeButton
                icon={"4"}
                qrCodeSettings={{
                  width: QRSize,
                  height: QRSize,
                  data: shortenedLink,
                  dotsOptions: {
                    color: QRColor,
                    type: "dots",
                  },
                  cornersSquareOptions: {
                    type: "dot",
                    color: QRColor,
                  },
                  cornersDotOptions: {
                    type: "dot",
                    color: QRColor,
                  },
                  backgroundOptions: {
                    color: "none",
                  },
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function AnalyzeTab() {
  const navigate = useNavigate();
  const [analyzeInput, setAnalyzeInput] = useState("");
  const [analyzeError, setAnalyzeError] = useState("");

  const handleAnalyzeSubmit = (e) => {
    e.preventDefault();
    const key = analyzeInput.split("/").pop();
    if (!key) {
      setAnalyzeError("Please enter a valid key or short URL.");
      return;
    }
    navigate(`/analytics/${key}`);
  };

  return (
    <form className="home-form" onSubmit={handleAnalyzeSubmit}>
      <Textarea
        value={analyzeInput}
        onChange={setAnalyzeInput}
        label="URL or Doodle Name"
        placeholder="Enter URL or Doodle Name"
        tooltipText="The Doodle Name is the last part of your short URL"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
            </g>
          </svg>
        }
      />
      <PrimaryButton
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M6 13H2c-.6 0-1 .4-1 1v8c0 .6.4 1 1 1h4c.6 0 1-.4 1-1v-8c0-.6-.4-1-1-1m16-4h-4c-.6 0-1 .4-1 1v12c0 .6.4 1 1 1h4c.6 0 1-.4 1-1V10c0-.6-.4-1-1-1m-8-8h-4c-.6 0-1 .4-1 1v20c0 .6.4 1 1 1h4c.6 0 1-.4 1-1V2c0-.6-.4-1-1-1"
            />
          </svg>
        }
        text="Get Analytics"
      />
      {analyzeError && <p className="error">{analyzeError}</p>}
    </form>
  );
}

function Home({darkMode}) {
  const tabs = [
    {
      id: "generate",
      label: "Generate",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{rotate: "-90deg"}}
          width="16"
          height="16"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m9 15l6-6m-4-3l.463-.536a5 5 0 0 1 7.072 0a4.993 4.993 0 0 1-.001 7.072m-5.931 5.998a5.07 5.07 0 0 1-7.127 0a4.97 4.97 0 0 1 0-7.071L6 11m10 8h6m-3-3v6"
          />
        </svg>
      ),
      content: <GenerateTab darkMode={darkMode} />,
    },
    {
      id: "analyze",
      label: "Analyze",
      icon: (
        <svg width="10" height="10" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M6 13H2c-.6 0-1 .4-1 1v8c0 .6.4 1 1 1h4c.6 0 1-.4 1-1v-8c0-.6-.4-1-1-1m16-4h-4c-.6 0-1 .4-1 1v12c0 .6.4 1 1 1h4c.6 0 1-.4 1-1V10c0-.6-.4-1-1-1m-8-8h-4c-.6 0-1 .4-1 1v20c0 .6.4 1 1 1h4c.6 0 1-.4 1-1V2c0-.6-.4-1-1-1"
          />
        </svg>
      ),
      content: <AnalyzeTab />,
    },
  ];

  return (
    <div className="container">
      <motion.div
        className="card"
        initial={{opacity: 0, scale: 0.95}}
        animate={{opacity: 1, scale: 1}}
        transition={{duration: 0.5}}
      >
        <motion.div
          className="logo-container"
          transition={{delay: 0.2, duration: 0.5}}
        >
          {darkMode ? (
            <IconBlack className="logo" />
          ) : (
            <Icon className="logo" />
          )}
        </motion.div>

        <Tabs tabs={tabs} />
      </motion.div>
    </div>
  );
}

export default Home;
