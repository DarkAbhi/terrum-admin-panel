import { ChallengesTableShell } from "@/components/challenges-table-shell";
import CreateButton from "@/components/create-button";
import { DashboardHeader } from "@/components/header";
import { BASE_API_URL } from "@/constants/constants";
import { CHALLENGES_ENDPOINT } from "@/constants/routes";
import { getAccessTokenCookie } from "@/lib/session";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Challenges",
  description: "Challenges",
};

interface IndexPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function ChallengesPage({ searchParams }: IndexPageProps) {
  const { page, per_page } = searchParams;

  // Number of items per page
  const pageSize = typeof per_page === "string" ? parseInt(per_page) : 10;
  // Current page number
  const pageNumber = page === undefined ? 1 : page;

  const apiResponse = await fetch(
    `${BASE_API_URL}${CHALLENGES_ENDPOINT}?page=${pageNumber}&size=${pageSize}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessTokenCookie()}`,
      },
    }
  );
  const challenges = await apiResponse.json();
  const pageCount = challenges.total_pages;

  return (
    <div>
      <DashboardHeader heading="Challenges" text="Create and manage challenges">
        <CreateButton text="Add challenge" route="challenges/create" />
      </DashboardHeader>
      <div className="px-2 py-10">
        <ChallengesTableShell data={challenges.results} pageCount={pageCount} />
      </div>
    </div>
  );
}
