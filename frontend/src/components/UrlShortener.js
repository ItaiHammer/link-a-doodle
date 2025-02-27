import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './UrlShortener.module.css';
import { ReactComponent as Logo } from '../icons/logo.svg';
import AnimatedBackground from './AnimatedBackground';

function AnimatedSubmitButton({ loading, success, onClick }) {
    const buttonVariants = {
        initial: {
            width: '100%',
            borderRadius: '8px',
            backgroundColor: '#DA667B',
        },
        loading: {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            transition: { duration: 0.3 },
        },
        success: {
            backgroundColor: '#71816d',
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
                        backgroundColor: '#DA667B',
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
}

function UrlShortener() {
    const [inputUrl, setInputUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        if (!inputUrl) return;
        setLoading(true);
        setError('');
        setSuccess(false);
        try {
            const response = await axios.post(
                'http://localhost:3001/api/url/shorten',
                {
                    redirectUrl: inputUrl,
                }
            );

            await console.log('Response: ');
            await console.log(response);

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
    }

    return (
        <>
            <AnimatedBackground />
            <div className="container">
                <motion.div
                    className="card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className="logo-container"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <Logo className="logo" />
                    </motion.div>

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
}

export default UrlShortener;
