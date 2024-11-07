import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <p>API TEST</p>
    </div>
  );
}
