"use client";

import Login from "@/components/Login";
import useUserStore from "@/store/zustand";
import { Divide } from "lucide-react";
import Link from "next/link";

export default function Home() {
    const user = useUserStore((state) => state.user);
    const isAuthenticated = useUserStore((state) => state.isAuthenticated);
    return (
        <main className="min-h-screen ml-[-120px] grid place-items-center">
            {isAuthenticated ? (
                <div>
                    <p>You are logged in</p>
                </div>
            ) : (
                <div>
                    <Login />
                </div>
            )}
            {user && <p>{user?.email}</p>}
        </main>
    );
}
