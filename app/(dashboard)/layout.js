import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Dashboard",
  description: "Next gen Admin Dashboard",
};
const RootLayout = async ({ children }) => {
  const session = await auth();

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
