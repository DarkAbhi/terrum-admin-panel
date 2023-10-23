// Importing necessary modules and components
import CreateButton from "@/components/create-button"; // Importing a button component for creating new items
import ShoppingCategoryTable from "@/components/e-commerce/shopping-categories/shopping-categories-table"; // Importing a table component to display shopping categories
import { DashboardHeader } from "@/components/header"; // Importing a header component for the dashboard
import { DataTableLoading } from "@/components/ui/data-table/data-table-loading"; // Importing a loading placeholder for the data table
import { BASE_API_URL } from "@/constants/constants"; // Importing a constant which holds the base URL of the API
import { SHOPPING_CATEGORIES_ENDPOINT } from "@/constants/routes"; // Importing a constant which holds the endpoint for shopping categories
import { Metadata } from "next"; // Importing a type for handling metadata
import { Suspense } from "react"; // Importing Suspense for handling lazy loading

// Defining metadata for this page
export const metadata: Metadata = {
  title: "Shopping Categories", // Title of the page
  description: "Shopping categories", // Description of the page
};

// Defining the props type for this page
interface IndexPageProps {
  searchParams: {
    // Search parameters for fetching data
    [key: string]: string | string[] | undefined; // The keys and values of the search parameters
  };
}

// Defining the main component for this page
export default async function BrandsPage({ searchParams }: IndexPageProps) {
  // Destructuring the search parameters for easier access
  const { page, per_page, name } = searchParams;

  // Defining the number of items per page, default is 10
  const pageSize = typeof per_page === "string" ? parseInt(per_page) : 10;
  // Defining the current page number, default is 1
  const pageNumber = page === undefined ? 1 : page;

  // Constructing the URL for fetching all shopping categories
  let getAllShoppingCategoriesUrl = `${BASE_API_URL}${SHOPPING_CATEGORIES_ENDPOINT}?page=${pageNumber}&size=${pageSize}`;
  // If a name is provided, add it to the URL as a query parameter
  if (name !== null && name !== undefined) {
    getAllShoppingCategoriesUrl = getAllShoppingCategoriesUrl + `&name=${name}`;
  }

  return (
    <div>
      <DashboardHeader // Rendering the dashboard header with a title and description
        heading="Shopping Categories" // Title of the dashboard
        text="Create and manage shopping categories" // Description of the dashboard
      >
        <CreateButton text="Add Category" route="shopping-categories/create" />
      </DashboardHeader>
      <Suspense fallback={<DataTableLoading columnCount={5} rowCount={5} />}>
        <ShoppingCategoryTable url={getAllShoppingCategoriesUrl} />
      </Suspense>
    </div>
  );
}
