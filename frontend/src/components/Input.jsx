import {useState} from "react";

import "./Input.css";

export default function Input({
  style,
  value,
  onChange,
  label,
  placeholder,
  icon,
  tooltipText,
  errorMessage,
  maxCharacters,
  prefix,
  width,
  height,
  borderRadius,
  fontSize,
}) {
  const darkMode = localStorage.getItem("darkMode") == "true" ? true : false;
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipIcon = (
    <span
      style={{position: "relative", display: "inline-block"}}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      tabIndex={0}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="11"
        height="11"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M11.95 18q.525 0 .888-.363t.362-.887t-.362-.888t-.888-.362t-.887.363t-.363.887t.363.888t.887.362m.05 4q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m.1-12.3q.625 0 1.088.4t.462 1q0 .55-.337.975t-.763.8q-.575.5-1.012 1.1t-.438 1.35q0 .35.263.588t.612.237q.375 0 .638-.25t.337-.625q.1-.525.45-.937t.75-.788q.575-.55.988-1.2t.412-1.45q0-1.275-1.037-2.087T12.1 6q-.95 0-1.812.4T8.975 7.625q-.175.3-.112.638t.337.512q.35.2.725.125t.625-.425q.275-.375.688-.575t.862-.2"
        />
      </svg>
      {showTooltip && tooltipText && (
        <span
          style={{
            position: "absolute",
            left: "120%",
            top: "40%",
            transform: "translateY(-50%)",
            background: "rgba(0, 0, 0, 0.40)",
            color: "#fff",
            padding: "6px 12px",
            borderRadius: "6px",
            fontSize: "12px",
            whiteSpace: "nowrap",
            zIndex: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            pointerEvents: "none",
          }}
        >
          {tooltipText}
        </span>
      )}
    </span>
  );

  return (
    <div className="input-container" style={style}>
      <div className="input-label-container">
        <label className="input-label">{label}</label>
        {tooltipText ? tooltipIcon : null}
      </div>
      <div
        className={`input-wrapper ${errorMessage ? "problematic" : ""}`}
        style={{
          color: darkMode
            ? value === ""
              ? "#3b414d"
              : "#757f95"
            : value === ""
            ? "#A8ADBD"
            : "#676E8B",
          width,
          height,
          borderRadius,
        }}
      >
        {icon}
        <div className="input-prefix-container">
          {prefix ? (
            <p style={{fontSize}} class="input-prefix">
              {prefix}
            </p>
          ) : null}
          <input
            style={{fontSize}}
            type="text"
            placeholder={placeholder}
            value={value}
            maxLength={maxCharacters}
            onChange={(e) => {
              if (onChange) onChange(e.target.value);
            }}
            readOnly={!onChange}
          />
        </div>
        {maxCharacters !== undefined && (
          <div style={{fontSize}} className="input-char-counter">
            {value.length} / {maxCharacters}
          </div>
        )}
      </div>
      {errorMessage ? (
        <div className="input-error-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M13 17a.999.999 0 1 0-1.998 0a.999.999 0 0 0 1.997 0m-.26-7.853a.75.75 0 0 0-1.493.103l.004 4.501l.007.102a.75.75 0 0 0 1.493-.103l-.004-4.502zm1.23-5.488c-.857-1.548-3.082-1.548-3.938 0L2.286 17.66c-.83 1.5.255 3.34 1.97 3.34h15.49c1.714 0 2.799-1.84 1.969-3.34zm-2.626.726a.75.75 0 0 1 1.313 0l7.746 14.002a.75.75 0 0 1-.657 1.113H4.256a.75.75 0 0 1-.657-1.113z"
            />
          </svg>
          <p className="input-error-message">{errorMessage}</p>
        </div>
      ) : null}
    </div>
  );
}
