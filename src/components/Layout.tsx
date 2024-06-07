import Navbar from "@/components/Navbar";

export default function Layout({ children }: any) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            {children}
        </div>
    );
};