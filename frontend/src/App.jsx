// App.jsx

import React, { useEffect, useState } from "react";
import { AskForm } from "./components/AskForm.jsx";
import { AISummary } from "./components/AISummary.jsx";
import { ProductList } from "./components/ProductList.jsx";
import "./App.css";


function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [aiLoading, setAILoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setAllProducts(data.products ?? []))
      .catch(() => setError("Could not load product catalog."))
      .finally(() => setLoadingProducts(false));
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div className="header-dot" aria-hidden="true" />
        <span className="header-title">Discover</span>
        <span className="header-sub">AI Commerce · Demo</span>
      </header>

      <main className="main">
        <section className="hero" aria-label="Page introduction">
          <h1>
            Find your next
            <br />
            <em>perfect</em> device.
          </h1>
          <p>
            Describe what you need in plain language — our AI will match you
            with the right products from our catalog.
          </p>
        </section>

        <AskForm
          onResult={setResult}
          onLoading={setAILoading}
          onError={setError}
        />

        {aiLoading && (
          <div className="loading" aria-live="polite">
            <div className="spinner" aria-hidden="true" />
            <span>Analyzing your request…</span>
          </div>
        )}

        {error && (
          <div className="error" role="alert">
            ⚠ {error}
          </div>
        )}

        {result && !aiLoading && (
          <>
            <AISummary summary={result.summary} cached={result.cached} />
            <ProductList
              products={result.products}
              label="Recommended for you"
              highlighted
              emptyMessage="No matching products found. Try a different query."
            />
          </>
        )}

        <div className="all-section">
          {loadingProducts ? (
            <div className="loading">
              <div className="spinner" aria-hidden="true" />
              <span>Loading catalog…</span>
            </div>
          ) : (
            <ProductList
              products={allProducts}
              label="All Products"
              highlighted={false}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
