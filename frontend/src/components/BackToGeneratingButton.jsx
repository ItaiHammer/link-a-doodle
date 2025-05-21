import React from "react";
import { useNavigate } from "react-router-dom";

import "./BackToGeneratingButton.css";

export default function BackToGeneratingButton() {
    const navigate = useNavigate();

    return (
        <button 
            className="back-to-generating-button"
            onClick={() => {
                navigate("/");
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.426 12t.063-.375t.212-.325l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12t-.288.713T19 13z"/></svg>
            Back to Generating
        </button>
    );
}