"use client";
import styles from "./products.module.css";
import Link from "next/link";

export default function Page({ children }) {
    return (
        <>
            <div className={`${styles.sidebar}`}>
                <Link href="/products/first">First Menu</Link>
                <Link href="/products/second">Seond Menu</Link>
                <Link href="/products/third">Third Menu</Link>
            </div>
            <div className={styles.content}>{children}</div>
        </>
    );
}
