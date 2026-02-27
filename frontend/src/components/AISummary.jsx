// components/AISummary.jsx

import React from "react";
import styles from "./AISummary.module.css";


export const AISummary = ({ summary, cached }) => {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <div className={styles.icon} aria-hidden="true">
        ✦
      </div>
      <div className={styles.content}>
        <div className={styles.label}>
          AI Recommendation
          {cached && <span className={styles.cachedBadge}>cached</span>}
        </div>
        <p className={styles.text}>{summary}</p>
      </div>
    </div>
  );
};
