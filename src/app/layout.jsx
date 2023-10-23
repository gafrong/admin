"use client";

import "./globals.css";
import styles from "./utils.module.css";
import Link from "next/link";
import Image from "next/image";
import { FiHome, FiVideo, FiGift, FiShoppingCart, FiUsers, FiMessageCircle, FiBarChart2 } from "react-icons/fi";
import Navbar from '@/components/Navbar'
const list = "block text-black p-5";

export default function RootLayout({ children }) {
    const isUserLoggedIn = true;
    return (
        <html>
            <head />
            <body>
                <Navbar/>
                <div
                    className={`m-0 p-0 w-34 fixed h-full overflow-auto border-r border-slate-300`}
                >
                    {isUserLoggedIn && (
                        <>
                            <Link
                                className="block text-black p-5"
                                href="/orders"
                            >
                                <div className="flex flex-row">
                                    <FiShoppingCart className="mr-2 mt-1"/>Orders
                                </div>
                            </Link>
                            <Link
                                className="block text-black p-5"
                                href="/videos"
                            >
                                <div className="flex flex-row">
                                    <FiVideo className="mr-2 mt-1"/><div>Videos</div>
                                </div>
                            </Link>

                            <Link
                                className="block text-black p-5"
                                href="/products"
                            >
                                <div className="flex flex-row">
                                    <FiGift className="mr-2 mt-1"/>Product
                                </div>
                            </Link>
                            <Link
                                className="block text-black p-5"
                                href="/clients"
                            >
                                <div className="flex flex-row">
                                    <FiUsers className="mr-2 mt-1"/>Clients
                                </div>
                            </Link>
                            <Link
                                className="block text-black p-5"
                                href="/messages"
                            >
                                <div className="flex flex-row">
                                    <FiMessageCircle  className="mr-2 mt-1"/><div>Message</div>
                                </div>
                            </Link>
                            <Link
                                className="block text-black p-5"
                                href="/statistics"
                            >
                                <div className="flex flex-row">
                                    <FiBarChart2  className="mr-2 mt-1"/>Statistics
                                </div>
                            </Link>
                        </>
                    )}
                </div>
                <div className={styles.content}>{children}</div>
            </body>
        </html>
    );
}
