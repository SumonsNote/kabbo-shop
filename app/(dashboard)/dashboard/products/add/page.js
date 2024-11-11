import React from "react";
import AddProductForm from "./ProductForm";
import ProductForm from "./NewForm";

export default function page() {
  return (
    <div className="w-full px-20">
      {/* <AddProductForm /> */}
      <ProductForm />
    </div>
  );
}
