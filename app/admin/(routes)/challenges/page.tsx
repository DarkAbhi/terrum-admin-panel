import ChallengesTable from "@/components/challenge/challenges-table";
import CreateButton from "@/components/create-button";
import { DashboardHeader } from "@/components/header";
import { DataTableLoading } from "@/components/ui/data-table/data-table-loading";
import { BASE_API_URL } from "@/constants/constants";
import { CHALLENGES_ENDPOINT } from "@/constants/routes";
import { Challenge } from "@/types/challenge";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Challenges",
  description: "Challenges",
};

interface IndexPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default function ChallengesPage({ searchParams }: IndexPageProps) {
  const { page, per_page, name, sort } = searchParams;

  // Number of items per page
  const pageSize = typeof per_page === "string" ? parseInt(per_page) : 10;
  // Current page number
  const pageNumber = page === undefined ? 1 : page;

  const [column, order] =
    typeof sort === "string"
      ? (sort.split(".") as [
          keyof Challenge | undefined,
          "asc" | "desc" | undefined
        ])
      : [];

  let getAllChallengesUrl: string = `${BASE_API_URL}${CHALLENGES_ENDPOINT}?page=${pageNumber}&size=${pageSize}`;
  if (name !== null && name !== undefined) {
    getAllChallengesUrl = getAllChallengesUrl + `&name=${name}`;
  }

  if (column !== undefined && order !== undefined) {
    getAllChallengesUrl =
      getAllChallengesUrl + `&ordering=${order == "asc" ? "" : "-"}${column}`;
  }

  return (
    <div>
      <DashboardHeader heading="Challenges" text="Create and manage challenges">
        <CreateButton text="Add challenge" route="challenges/create" />
      </DashboardHeader>
      <Suspense fallback={<DataTableLoading columnCount={5} rowCount={5} />}>
        <ChallengesTable url={getAllChallengesUrl} />
      </Suspense>
    </div>
  );
}
