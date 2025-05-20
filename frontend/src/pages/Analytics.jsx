import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import BuyMeACoffeeIcon from "../icons/bmc-full-logo.svg";
import { ReactComponent as Logo } from "../icons/logo.svg";
import { ReactComponent as Icon } from "../icons/icon.svg";
import { ReactComponent as IconBlack } from "../icons/icon-black-highlights.svg";
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
  const { key } = useParams();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAnalytics() {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`/api/url/analytics/${key}`);
        setAnalytics(response.data);
      } catch (err) {
        setError("Failed to fetch analytics data.");
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, [key]);

  return (
    <>
      <div className="container">
        <motion.div
          className="card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="logo-container">
            {darkMode ? (
              <IconBlack className="logo" />
            ) : (
              <Icon className="logo" />
            )}
          </div>

          <div className="analytics-content">
            <h1>Analytics for <span style={{ color: '#da667b' }}>{key}</span></h1>
            {loading && <p>Loading analytics...</p>}
            {error && <p className="error">{error}</p>}
            {analytics && (
              <>
                <p><strong>Created At:</strong> {new Date(analytics.createdAt).toLocaleString()}</p>
                <p><strong>Total Clicks:</strong> {analytics.totalClicks}</p>
                <h3>Click History:</h3>
                {analytics.clicks.length === 0 ? (
                  <p>No clicks yet.</p>
                ) : (
                  <ul style={{ textAlign: 'left', maxHeight: 200, overflowY: 'auto', paddingLeft: 20 }}>
                    {analytics.clicks.map((click, idx) => (
                      <li key={click._id || idx}>
                        <span>{new Date(click.timestamp).toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
      <BuyMeACoffeeButton />
    </>
  );
}

export default Analytics;
