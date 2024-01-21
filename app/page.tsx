"use client";

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";

export default function Home() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { user } = useUser();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="h-screen flex items-center justify-center flex-col gap-y-4">
      <h1 className="text-xl font-semibold">
        ようこそ！{isAuthenticated ? user?.fullName : "ゲスト"}さん
      </h1>
      <div className="flex gap-4">
        {!isAuthenticated ? (
          <SignInButton mode="modal">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              ログイン
            </button>
          </SignInButton>
        ) : (
          <SignOutButton>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              ログアウト
            </button>
          </SignOutButton>
        )}
      </div>
    </div>
  );
}
