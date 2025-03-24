"use client";
import { useAuth } from "@/app/components/authorization";
import { redirect } from "next/navigation";

export default function PrivateLayout({ children }) {
  const { isLogin } = useAuth();
  if (!isLogin) {
    redirect("/login");
  }
  return <>{children}</>;
}
