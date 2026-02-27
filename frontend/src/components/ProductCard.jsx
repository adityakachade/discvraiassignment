// components/ProductCard.jsx

import React from "react";
import styles from "./ProductCard.module.css";


const CATEGORY_COLORS = {
  Laptops: "#7dd4e8",
  Smartphones: "#a87de8",
  Headphones: "#e8a87d",
  Accessories: "#7de8a8",
};

export const ProductCard = ({ product, highlighted = false }) => {
  const accentColor = CATEGORY_COLORS[product.category] ?? "#e8c87d";

  return (
    <article
      className={`${styles.card} ${highlighted ? styles.highlighted : ""}`}
      style={{ "--accent-color": accentColor }}
    >
      <div className={styles.header}>
        <span className={styles.category}>{product.category}</span>
        <span className={styles.price}>${product.price.toLocaleString()}</span>
      </div>
      <h3 className={styles.name}>{product.name}</h3>
      <p className={styles.description}>{product.description}</p>
      <div className={styles.tags}>
        {product.tags.slice(0, 4).map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
};
