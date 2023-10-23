import Header from "@/components/Header";

export default function Home() {
    const isUserLoggedIn = true;
    return (
        <main className="min-h-screen">
            <h1 className={isUserLoggedIn && "text-red-500"}>
                page titjksdlfajklfjlsfjkldsfjklsdjklle
            </h1>
        </main>
    );
}
