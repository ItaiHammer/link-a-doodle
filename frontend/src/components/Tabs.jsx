import React, {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import './Tabs.css';

function Tabs({tabs}) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="custom-tabs-wrapper">
      <div className="custom-tabs">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              className={`custom-tab ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="custom-tab-active"
                  transition={{type: 'spring', stiffness: 500, damping: 30}}
                />
              )}
              <div className="custom-tab-content">
                {tab.icon}
                <span>{tab.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="custom-tab-panel">
        <AnimatePresence mode="wait">
          {tabs.map((tab) =>
            tab.id === activeTab ? (
              <motion.div
                key={tab.id}
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -20}}
                transition={{duration: 0.3}}
              >
                {tab.content}
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Tabs;
