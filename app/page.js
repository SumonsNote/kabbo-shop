import { auth } from "@/auth";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  // console.log(session);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <p>API TEST</p>
    </div>
  );
}
