export const metadata = {
  title: "Admin Dashboard",
  description: "Next gen Admin Dashboard",
};
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
