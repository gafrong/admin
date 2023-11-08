"use client";
import Link from "next/link";
import Register from "@/components/Register";
export default function Page() {
    return (
        <main className="min-h-screen ml-[-120px] grid place-items-center">
            <h1>Partner Register Page</h1>
            <Register />
            <Link href="/onboarding">on board</Link>
        </main>
    );
}
