import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import DarkModeToggle from './DarkModeToggle'; // Make sure this file exists as defined earlier
import { ReactComponent as Logo } from '../icons/logo.svg';
import './UrlShortener.module.css';
import './styles.css';

const AnimatedSubmitButton = ({ loading, success, onClick }) => {
    const buttonVariants = {
        initial: {
            width: '100%',
            borderRadius: '8px',
            backgroundColor: 'var(--submit-button-bg)',
        },
        loading: {
            backgroundColor: 'rgba(0,0,0,0)',
            transition: { duration: 0.3 },
        },
        success: {
            backgroundColor: 'var(--submit-button-success)',
            transition: { duration: 0.3 },
        },
    };

    const pulseAnimation = {
        scale: [1, 1.2, 1],
        transition: {
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    };

    return (
        <motion.button
            className="submit-button"
            onClick={onClick}
            variants={buttonVariants}
            animate={loading ? 'loading' : success ? 'success' : 'initial'}
            initial="initial"
        >
            {loading ? (
                <motion.div
                    className="loader"
                    style={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        backgroundColor: 'var(--submit-button-bg)',
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
                'Shorten URL'
            )}
        </motion.button>
    );
};

const UrlShortener = () => {
    const [inputUrl, setInputUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputUrl) return;
        setLoading(true);
        setError('');
        setSuccess(false);
        try {
            const response = await axios.post(
                'http://localhost:5000/api/url/shorten',
                {
                    originalUrl: inputUrl,
                }
            );
            setShortUrl(response.data.shortUrl);
            setLoading(false);
            setSuccess(true);
            setInputUrl('');
            setTimeout(() => {
                setSuccess(false);
            }, 2000);
        } catch (err) {
            setError('Failed to shorten URL');
            setLoading(false);
        }
    };

    return (
        <>
            {/* Dark Mode Toggle is rendered here. CSS positions it at top-right */}
            <DarkModeToggle />
            <div className="container">
                <motion.div
                    className="card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="logo-wrapper">
                        <Logo className="logo" width="50px" height="50px" />
                    </div>
                    <form onSubmit={handleSubmit}>
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
                            <a
                                href={shortUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {shortUrl}
                            </a>
                        </div>
                    )}
                </motion.div>
            </div>
        </>
    );
};

export default UrlShortener;
