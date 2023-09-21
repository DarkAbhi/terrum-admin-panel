import { getAccessTokenCookie } from "@/lib/session";
import { ChallengesTableShell } from "../challenges-table-shell";

interface ChallengesTableProps {
  url: string;
}

async function ChallengesTable({ url }: ChallengesTableProps) {
  const apiResponse = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessTokenCookie()}`,
    },
  });

  const challenges = await apiResponse.json();
  const pageCount = challenges.total_pages;
  return (
    <div className="px-2 py-10">
      <ChallengesTableShell data={challenges.results} pageCount={pageCount} />
    </div>
  );
}

export default ChallengesTable;
