import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminTopbar } from "@/components/admin/topbar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-steel-50 dark:bg-steel-900/20">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminTopbar />
        <div className="p-5 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
