import React from 'react';
import { motion } from 'framer-motion';
import BuyMeACoffeeIcon from '../icons/bmc-full-logo.svg';

import './BuyMeACoffeeButton.css';

export default function BuyMeACoffeeButton() {
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