import axios from "axios";

// Route List
const routeList = [
  "/api/auth/[...nextauth]",
  "/api/best-selling",
  "/api/cart",
  "/api/category",
  "/api/checkout",
  "/api/cloudinary",
  "/api/countdown",
  "/api/customer",
  "/api/deal",
  "/api/exclusive",
  "/api/features",
  "/api/invoice/create",
  "/api/invoice/invoice-product",
  "/api/invoice/list",
  "/api/new-arrival",
  "/api/order",
  "/api/order/[id]",
  "/api/payment/payment-cancel",
  "/api/payment/payment-fail",
  "/api/payment/payment-ipn",
  "/api/payment/payment-success",
  "/api/payment/sslcom",
  "/api/policies",
  "/api/product/best-seller",
  "/api/product/brand",
  "/api/product/category",
  "/api/product/details",
  "/api/product/list-by-brand",
  "/api/product/list-by-category",
  "/api/product/list-by-keyword",
  "/api/product/list-by-remark",
  "/api/product/new",
  "/api/product/new/[id]",
  "/api/product/new-arrival",
  "/api/product/offer",
  "/api/product/review",
  "/api/product",
  "/api/product/slider",
  "/api/product/trending",
  "/api/product/[id]/new-arrival",
  "/api/product/[id]",
  "/api/shop/order",
  "/api/shop",
  "/api/slider",
  "/api/stock/product/[id]",
  "/api/stock",
  "/api/stock/[id]",
  "/api/user/logout",
  "/api/user/profile",
  "/api/user",
  "/api/weekend",
  "/api/wish",
];

export const protectedApiRoutesList = [
  "/api/cloudinary",
  "/api/customer",
  "/api/payment/payment-cancel",
  "/api/payment/payment-fail",
  "/api/payment/payment-ipn",
  "/api/payment/payment-success",
  "/api/user/profile",
  "/api/user",
];
// 1. Filter Specific Routes
const filterRoutes = (keyword) => {
  return routeList.filter((route) => route.includes(keyword));
};

// 2. Generate API Documentation
const generateDocs = () => {
  console.log("API Documentation:");
  routeList.forEach((route) => {
    console.log(`Endpoint: ${route.replace("/api", "")}`);
  });
};

// 3. Test All Routes
const testRoutes = async (baseUrl) => {
  console.log("Testing Routes...");
  for (const route of routeList) {
    const url = `${baseUrl}${route.replace("/api", "")}`;
    try {
      const response = await axios.get(url);
      console.log(`✅ Passed: ${url} (Status: ${response.status})`);
    } catch (err) {
      console.log(
        `❌ Failed: ${url} (${
          err.response ? err.response.status : err.message
        })`
      );
    }
  }
};

// 4. Group Routes by Feature
const groupRoutes = () => {
  const groupedRoutes = routeList.reduce((acc, route) => {
    const category = route.split("/")[3]; // Extract category
    acc[category] = acc[category] || [];
    acc[category].push(route);
    return acc;
  }, {});
  return groupedRoutes;
};

// Exporting Utilities
export { routeList, filterRoutes, generateDocs, testRoutes, groupRoutes };

// Example Usage:
// const { filterRoutes, generateDocs, testRoutes, groupRoutes, transformRoutes } = require('./routeUtils');
// generateDocs();
// testRoutes("http://localhost:3000");
// find ./api -type f -name "*.js" -o -name "*.ts" | wc -l
// find ./api -type f -name "*.js" -o -name "*.ts"
