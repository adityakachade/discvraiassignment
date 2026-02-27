// components/AskForm.jsx

import React, { useState } from "react";
import styles from "./AskForm.module.css";


const EXAMPLES = [
  "Budget laptop for students",
  "Best noise-cancelling headphones",
  "Premium smartphone with great camera",
  "Wireless accessories for my desk",
  "Gaming laptop under $2000",
];

export const AskForm = ({ onResult, onLoading, onError }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (overrideQuery) => {
    const text = (overrideQuery ?? query).trim();
    if (!text) return;

    setLoading(true);
    onLoading(true);
    onError(null);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      onResult(data);
    } catch (err) {
      onError(err.message ?? "An unexpected error occurred.");
    } finally {
      setLoading(false);
      onLoading(false);
    }
  };

  const handleExample = (ex) => {
    setQuery(ex);
    submit(ex);
  };

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.inputRow} ${loading ? styles.disabled : ""}`}>
        <input
          className={styles.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Describe what you're looking for…"
          disabled={loading}
          aria-label="Product search query"
        />
        <button
          className={styles.button}
          onClick={() => submit()}
          disabled={loading || !query.trim()}
          aria-label="Search products"
        >
          {loading ? (
            <span className={styles.spinner} aria-hidden="true" />
          ) : (
            "Ask AI →"
          )}
        </button>
      </div>

      <div className={styles.examples} aria-label="Example queries">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            className={styles.chip}
            onClick={() => handleExample(ex)}
            disabled={loading}
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  );
};
