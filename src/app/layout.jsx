"use client";

import { useEffect } from 'react'; 
import "./globals.css";
import styles from "./utils.module.css";
import Navbar from '@/components/Navbar'
import Link from "next/link"; 
import Sidebar from '@/components/Sidebar'
import useUserStore from "../store/zustand";
import NextAuthProvider from './provider';
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {
    const user = useUserStore((state) => state?.user);
    const token = useUserStore((state) => state?.token);
    const isAuthenticated = useUserStore((state) => state?.isAuthenticated);

    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router?.push('/')
        }
    }, [isAuthenticated, router]);
    
    return (
        <html>
            <head />
            <body>
                <Navbar/>
                {user?.verified && (
                    <div
                        className={`m-0 mt-16 p-0 w-34 fixed h-full overflow-auto border-r border-slate-300`}
                    >                    
                        <Sidebar/>
                    </div>
                )}
                <NextAuthProvider>
                    <div className={styles.content}>{children}</div>
                </NextAuthProvider>
            </body>
        </html>
    );
}
