import React, { useState } from "react";
import {
  useGetProductsQuery,
  useDeleteProductsMutation,
} from "../../services/myProductsApi";
import ProductCard from "../ProductCard/ProductCard";
import { Link } from "react-router-dom";

import "./Home.css";

function Home() {
  const [deletedArr, setDeletedArr] = useState([]);
  const {
    data: productsData,
    error: productsError,
    isLoading: isProductsLoading,
  } = useGetProductsQuery();

  const [
    deleteProducts,
    { data, isLoading: isDeleteLoading, error: deleteError },
  ] = useDeleteProductsMutation();

  function massDelete() {
    const arrObj = { delete_ids: deletedArr };

    deleteProducts(arrObj);
  }

  function handleBox(e) {
    if (deletedArr.includes(e)) {
      setDeletedArr(deletedArr.filter((ele) => ele !== e));
    } else {
      setDeletedArr((prev) => [...prev, e]);
    }
  }

  const productsList = productsData?.map((e) => (
    <ProductCard key={e.id} product={e} setDel={handleBox} />
  ));
  return (
    <div className="main-container">
      <div className="head">
        <div className="p-list">Product List</div>
        <Link to="/add-product">
          <button className="btn">ADD</button>
        </Link>
        <button className="btn" onClick={massDelete} id="delete-product-btn">
          MASS DELETE
        </button>
      </div>

      <div className="products-container">{productsList}</div>
    </div>
  );
}

export default Home;
