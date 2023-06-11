import CreateBrandForm from "@/components/brand/create-brand-form";
import { DashboardHeader } from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create brand"
};

export default function CreateBrandPage() {
    return (
      <div>
        <DashboardHeader heading="Create brand"></DashboardHeader>
        <CreateBrandForm />
      </div>
    );
}