import ProductList from "./ProductList";
import "./product.css";
import "../Helper/CreateProduct";

import "react-loading-skeleton/dist/skeleton.css";
import CreateProduct from "../Helper/CreateProduct";
import { useState } from "react";

function Product(){
  const [reload,setRelaoad]= useState(false);
  const handleReload=()=>{
    setRelaoad(!reload);
  }
    return (
      <>
        <CreateProduct onReload={handleReload} />
        <ProductList reload={reload} />
      </>
    );
}
export default Product;