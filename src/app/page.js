"use client";

import Login from "@/components/Login";
import useUserStore from "@/store/zustand";
import { Divide } from "lucide-react";

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
                <Login />
            )}
            {user && <p>{user?.email}</p>}
        </main>
    );
}
