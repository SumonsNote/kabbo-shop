export const RelatedProducts = ({ products }) => (
  <div className="my-8 dark:bg-gray-900 p-5 rounded-xl">
    <h2 className="text-2xl font-bold mb-4">Related Products</h2>
    <div className="grid grid-cols-4 gap-10">
      {products.map((product) => (
        <div
          key={product.id}
          className="border border-black-100/20 dark:border-gray-100/20 bg rounded-lg overflow-hidden p-1 flex items-center justify-start text-md"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-20 h-20 object-cover"
          />
          <div className="p-1">
            <h3 className="font-bold">{product.name}</h3>
            <div className="mt-2">৳{product.price.toLocaleString()}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
