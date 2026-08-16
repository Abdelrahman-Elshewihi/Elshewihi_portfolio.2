import { isCurrentUserAdmin } from "@/lib/auth";
import { getAllProjectsForAdmin } from "@/lib/data";
import { redirect } from "next/navigation";
import DashboardClient from "./dashboard-client";

export default async function DashboardPage() {
  const isAdmin = await isCurrentUserAdmin();

  if (!isAdmin) {
    redirect("/admin/login");
  }

  const projects = await getAllProjectsForAdmin();

  return <DashboardClient initialProjects={projects} />;
}
