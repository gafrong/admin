import Today from "@/components/Today";
import DailySales from "@/components/DailySales";
export default function Home() {
    const isUserLoggedIn = true;
    return (
        <main className="min-h-screen">
            <h1 className={isUserLoggedIn && " pl-5 pt-5"}>
                <Today />
                <DailySales className="mt-10" />
            </h1>
        </main>
    );
}
