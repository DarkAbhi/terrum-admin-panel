// Importing necessary modules and components
import CreateShoppingCategoryForm from "@/components/e-commerce/shopping-categories/create-brand-form"; // Importing a form component for creating a new shopping category
import { DashboardHeader } from "@/components/header"; // Importing a header component for the dashboard
import { Metadata } from "next"; // Importing a type for handling metadata

// Defining metadata for this page
export const metadata: Metadata = {
  title: "Create shopping category", // Title of the page
};

// Defining the main component for this page
export default function CreateShoppingCategoryPage() {
  return (
    <div>
      <DashboardHeader heading="Create shopping category"/>
      <CreateShoppingCategoryForm />
    </div>
  );
}
