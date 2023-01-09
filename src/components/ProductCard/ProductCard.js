import React from "react";

import "./ProductCard.css";

function ProductCard(props) {
  function handleBox() {
    return props.setDel(props.product.id);
  }
  let attr;
  switch (props.product.type) {
    case "DVD":
      attr = <div>Size: {props.product.dvd_size} </div>;
      break;
    case "Book":
      attr = <div>Weight: {props.product.book_weight} </div>;
      break;
    case "Furniture":
      attr = (
        <div>
          Dimension: {props.product.height}X{props.product.width}X
          {props.product.length}{" "}
        </div>
      );
      break;
    default:
      break;
  }

  return (
    <div className="product-card">
      <input type="checkbox" className="delete-checkbox" onClick={handleBox} />

      <div>{props.product.sku}</div>
      <div>{props.product.name}</div>
      <div>{props.product.price} $</div>
      {attr}
    </div>
  );
}

export default ProductCard;
