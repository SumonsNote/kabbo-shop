import "../globals.css";

export const metadata = {
  title: "Admin Dashboard",
  description: "Next gen Admin Dashboard",
};

const RootLayout = async ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
