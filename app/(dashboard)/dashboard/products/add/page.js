import React from "react";
// import AddProductForm from "./ProductForm";
import ProductForm from "./NewForm";
import AddProductForm from "./form/ProductForm";

export default function page() {
  return (
    <div className="w-full px-5">
      <AddProductForm />
      {/* <ProductForm /> */}
    </div>
  );
}
