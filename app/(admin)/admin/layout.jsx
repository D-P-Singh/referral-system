import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }) {

    return (
        <div
            className="
        min-h-screen
        bg-[#F8FAFC]
        flex
      "
        >
            {/* Sidebar */}

            <AdminSidebar />

            {/* Main Content */}

            <div
                className="
          flex-1
          flex flex-col
          w-full
          overflow-hidden
        "
            >
                {/* Navbar */}

                <AdminNavbar />

                {/* Page Content */}

                <main
                    className="
            flex-1
            p-5 lg:p-8
            overflow-y-auto
          "
                >
                    {children}
                </main>
            </div>
        </div>
    );
}