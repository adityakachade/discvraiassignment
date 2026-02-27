// components/ProductList.jsx

import React from "react";
import { ProductCard } from "./ProductCard.jsx";
import styles from "./ProductList.module.css";


export const ProductList = ({
  products,
  label,
  highlighted = false,
  emptyMessage = "No products found.",
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.sectionTitle}>
        <span>{label}</span>
        <span className={styles.count}>{products.length}</span>
      </div>
      {products.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>🔍</span>
          <p>{emptyMessage}</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {products.map((product, i) => (
            <div
              key={product.id}
              style={{ animationDelay: `${i * 60}ms` }}
              className={styles.cardWrapper}
            >
              <ProductCard product={product} highlighted={highlighted} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
