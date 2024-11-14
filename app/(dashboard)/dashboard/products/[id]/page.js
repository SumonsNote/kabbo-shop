// import { getProductById } from "@/app/queries";
// import { NavLink } from "../_components/NavLink";
// import { ProductGallery } from "../_components/ProductGallery";
// import { ProductInfo } from "../_components/ProductInfo";
// import { ProductSpecification } from "../_components/ProductSpecification";

// export default async function ProductDetail({ params: { id } }) {
//   const product = await getProductById(id);
//   return (
//     <div className="container mx-auto px-4 text-gray-500 ">
//       <NavLink />

//       <div className="grid grid-cols-12  gap-16 w-full">
//         <ProductGallery product={product} />
//         <ProductInfo product={product} />
//       </div>

//       {/* <RelatedProducts products={relatedProducts} /> */}
//       <ProductSpecification product={product} />

//       <div
//         className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 my-4 rounded-lg"
//         role="alert"
//       >
//         <p className="font-bold">Note</p>
//         <p>
//           We aim to provide accurate info from trusted sources like the
//           manufacturer&apos;s website. If you find any mistakes, please let us
//           know.
//         </p>
//       </div>
//     </div>
//   );
// }
import React from "react";
import ProductDashboard from "../page";
import SingleProduct from "../_components/SingleProduct";

export default async function SingleProductPage({ params: { id } }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL_DEV}/api/product/${id}`
  );
  const data = await res.json();

  return (
    <div className="w-full">
      <SingleProduct productData={data?.products} />
    </div>
  );
}
