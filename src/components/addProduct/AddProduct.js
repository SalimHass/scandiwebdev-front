import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./AddProduct.css";
import {
  useAddProductMutation,
  useGetProductsQuery,
} from "../../services/myProductsApi";

function AddProduct() {
  const [inputs, setInputs] = useState({ type: "DVD" });
  const [missingData, setMissingData]=useState();
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const navigate = useNavigate();
  const {
    data: productsData,
    error: productsError,
    isLoading: isProductsLoading,
  } = useGetProductsQuery();

  const [addProduct, mutationResult] = useAddProductMutation();
  console.log(mutationResult);

  let skuArr = productsData?.map((e) => e.sku);
  
  

  const handleSave = (e) => {
    e.preventDefault();
    let productData = {};
    switch (inputs.type) {
      case "DVD":
        productData = {
          name: inputs.name,
          price: inputs.price,
          sku: inputs.sku,
          type: inputs.type,
          dvd_size: inputs.dvd_size,
        };
        if (inputs.name && inputs.price && inputs.sku && inputs.dvd_size) {
          if (skuArr?.includes(inputs.sku)) {
          } else {
            navigate("/");
          }
        } else {
          setMissingData (
            <div className="missing-info">please fill all fields </div>
          );
        }
        break;

      case "Book":
        productData = {
          name: inputs.name,
          price: inputs.price,
          sku: inputs.sku,
          type: inputs.type,
          book_weight: inputs.book_weight,
        };
        if (inputs.name && inputs.price && inputs.sku && inputs.book_weight) {
          if (skuArr?.includes(inputs.sku)) {
            console.log("same sku");
          } else {
            addProduct(productData);
            console.log("save");
            navigate("/");
          }
        } else {
          setMissingData (
            <div className="missing-info">please fill all fields </div>
          );
        }
        break;
      case "Furniture":
        productData = {
          name: inputs.name,
          price: inputs.price,
          sku: inputs.sku,
          type: inputs.type,
          f_height: inputs.f_height,
          f_length: inputs.f_length,
          f_width: inputs.f_width,
        };
        if (
          inputs.name &&
          inputs.price &&
          inputs.sku &&
          inputs.f_height &&
          inputs.f_length &&
          inputs.f_width
        ) {
          if (skuArr?.includes(inputs.sku)) {
            console.log("same sku");
          } else {
            addProduct(productData);

            navigate("/");
          }
        } else {
          setMissingData (
            <div className="missing-info">please fill all fields </div>
          );
        }
        break;

      default:
        break;
    }
  };

  let attrDetails;
  switch (inputs.type) {
    case "DVD":
      attrDetails = (
        <div className="pro-details">
          <div className="please-provide">Please provide DVD Size:</div>
          <div className="p-details">
            <label>Size (MB)</label>
            <input
              type="number"
              id="size"
              name="dvd_size"
              onChange={handleChange}
              value={inputs.dvd_size || ""}
            />
            
          </div>
        </div>
      );
      break;
    case "Book":
      attrDetails = (
        <div className="pro-details">
          <div className="please-provide">Please provide book weight:</div>
          <div className="p-details">
            <label>Weight (KG)</label>
            <input
              type="number"
              id="weight"
              name="book_weight"
              onChange={handleChange}
              value={inputs.book_weight || ""}
            />
          </div>
        </div>
      );
      break;
    case "Furniture":
      attrDetails = (
        <div className="pro-details">
          <div className="please-provide">
            Please provide Furniture Dimensions:
          </div>
          <div>
            <div className="p-details">
              <label>Height (CM)</label>
              <input
                type="number"
                id="height"
                name="f_height"
                onChange={handleChange}
                value={inputs.f_height || ""}
              />
              
            </div>
            <div className="p-details">
              <label>Width (CM)</label>
              <input
                type="number"
                id="width"
                name="f_width"
                onChange={handleChange}
                value={inputs.f_width || ""}
              />
              
            </div>
            <div className="p-details">
              <label>Length (CM)</label>
              <input
                type="number"
                id="length"
                name="f_length"
                onChange={handleChange}
                value={inputs.f_length || ""}
              />
              
            </div>
          </div>
        </div>
      );
      break;

    default:
      <></>;
  }
  

  return (
    <div className="add-page">
      <div className="head">
        <div className="p-list">Product Add</div>
        <button className="btn" onClick={handleSave}>
          Save
        </button>
        <Link to="/">
          <button className="btn">Cancel</button>
        </Link>
      </div>
      {missingData}

      <form id="product_form">
        <div className="main-details">
          <label>Sku</label>
          <input type="text" name="sku" id="sku" onChange={handleChange} />

          {skuArr?.includes(inputs.sku) && (
            <div className="sku-fault">
              sku is already used please chose another
            </div>
          )}

          <label>Name</label>
          <input type="text" name="name" id="name" onChange={handleChange} />

          <label>Price</label>
          <input
            type="number"
            name="price"
            id="price"
            onChange={handleChange}
          />
          
          <label>Type Switcher</label>
          <select id="productType" name="type" onChange={handleChange}>
            <option id="DVD" value="DVD">
              DVD
            </option>
            <option id="Book" value="Book">
              Book
            </option>
            <option id="Furniture" value="Furniture">
              Furniture
            </option>
          </select>
        </div>

        {attrDetails}
      </form>
      
    </div>
  );
}

export default AddProduct;
