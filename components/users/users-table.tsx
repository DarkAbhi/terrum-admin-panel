import { getAccessTokenCookie } from "@/lib/session";
import { UsersTableShell } from "@/components/users/users-table-shell";

interface UsersTableProps {
  url: string;
}

async function UsersTable({ url }: UsersTableProps) {
  const apiResponse = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessTokenCookie()}`,
    },
  });

  const users = await apiResponse.json();
  const pageCount = users.total_pages;

  return (
    <div className="px-2 py-10">
      <UsersTableShell data={users.results} pageCount={pageCount} />
    </div>
  );
}

export default UsersTable;
