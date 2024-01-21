"use client";

import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";

const MessagesLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return <>{children}</>;
};

export default MessagesLayout;
