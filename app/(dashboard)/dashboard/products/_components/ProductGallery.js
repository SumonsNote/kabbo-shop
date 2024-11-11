import Image from "next/image";

export const ProductGallery = ({ product }) => {
  return (
    <div className="col-span-4 mb-4   ">
      <div className="product__gallery">
        <figure className="gallery__image ring-1 ring-gray-300 dark:ring-gray-500 overflow-hidden relative rounded-lg">
          <Image
            src={product?.product?.image[0].url}
            width={400}
            height={400}
            alt="Product"
            className="w-full rounded-lg"
          />
          <div className="absolute top-10 -left-10 px-10 bg-gray-300 text-emerald-700 dark:bg-blue-800 text-sm font-bold py-1 rounded -rotate-45">
            Earn Points
          </div>
        </figure>
      </div>
    </div>
  );
};
