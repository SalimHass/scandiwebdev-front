import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAddProductMutation } from "../../services/myProductsApi";

function AddProduct() {
  const [inputs, setInputs] = useState({ type: "DVD" });
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const [addProduct, { data, isLoading: isAddLoading, error: addError }] =
    useAddProductMutation();
  
    
  const handleSave = (e) => {
    e.preventDefault();
    let productData={};
    switch (inputs.type) {
      case "DVD":
        productData = {
            "name": inputs.name,
            "price": inputs.price,
            "sku": inputs.sku,
            "type": inputs.type,
            "dvd_size": inputs.dvd_size,
        };
        if(!inputs.name || !inputs.price || !inputs.sku || !inputs.dvd_size){
            console.log("missing")
           

        }

            
            break;
      case "Book":
        productData = {
            "name": inputs.name,
            "price": inputs.price,
            "sku": inputs.sku,
            "type": inputs.type,
            "book_weight": inputs.book_weight,
        };
        break;
      case "Furniture":
        productData = {
            "name": inputs.name,
            "price": inputs.price,
            "sku": inputs.sku,
            "type": inputs.type,
            "f_height":inputs.f_height,
            "f_length":inputs.f_length,
            "f_width":inputs.f_width

        };
        break;

      default:
        break;

    }
    
    //addProduct(productData)
  };
  console.log(inputs);
  let attrDetails;
  switch (inputs.type) {
    case "DVD":
      attrDetails = (
        <>
          <div>Please provide DVD Size:</div>
          <label>Size (MB)</label>
          <input
            type="number"
            id="size"
            name="dvd_size"
            onChange={handleChange}
            value={inputs.dvd_size || ""}
          />
        </>
      );
      break;
    case "Book":
      attrDetails = (
        <>
          <div>Please provide book weight:</div>
          <label>Weight (KG)</label>
          <input
            type="number"
            id="weight"
            name="book_weight"
            onChange={handleChange}
            value={inputs.book_weight || ""}
          />
        </>
      );
      break;
    case "Furniture":
      attrDetails = (
        <>
          <div>Please provide Furniture Dimensions:</div>
          <label>Height (CM)</label>
          <input
            type="number"
            id="height"
            name="f_height"
            onChange={handleChange}
            value={inputs.f_height || ""}
          />
          <label>Width (CM)</label>
          <input
            type="number"
            id="width"
            name="f_width"
            onChange={handleChange}
            value={inputs.f_width || ""}
          />
          <label>Length (CM)</label>
          <input
            type="number"
            id="length"
            name="f_length"
            onChange={handleChange}
            value={inputs.f_length || ""}
          />
        </>
      );
      break;

    default:
      <></>;
  }

  return (
    <div>
      <div className="head">
        <div className="p-list">Product Add</div>
        <button className="btn" onClick={handleSave}>
          Save
        </button>
        <Link to="/">
          <button className="btn">Cancel</button>
        </Link>
      </div>
      
      <form id="product_form">
        <label>Sku</label>
        <input type="text" name="sku" id="sku" onChange={handleChange} />
        <label>name</label>
        <input type="text" name="name" id="name" onChange={handleChange} />
        <label>price</label>
        <input type="number" name="price" id="price" onChange={handleChange} />
        <label>Type Switcher</label>
        <select id="productType" name="type" onChange={handleChange}>
          <option value="DVD">DVD</option>
          <option value="Book">Book</option>
          <option value="Furniture">Furniture</option>
        </select>
       
        {attrDetails}
      </form>
    </div>
  );
}

export default AddProduct;
