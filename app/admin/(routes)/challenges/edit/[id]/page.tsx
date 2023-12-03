import { EditChallengeForm } from "@/components/challenge/edit-challenge-form";
import { DashboardHeader } from "@/components/header";
import { BASE_API_URL } from "@/constants/constants";
import { CHALLENGES_ENDPOINT } from "@/constants/routes";
import { Challenge } from "@/types/challenge";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export const metadata: Metadata = {
  title: "Edit challenge",
};

export default async function EditChallenge({
  params,
}: {
  params: { id: number };
}) {

  const session = await getServerSession(authOptions);

  const apiResponse = await fetch(
    `${BASE_API_URL}${CHALLENGES_ENDPOINT}${params.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    }
  );

  const challengeResponse: Challenge = await apiResponse.json();

  return (
    <div>
      <DashboardHeader heading="Edit challenge"></DashboardHeader>
      <EditChallengeForm challenge={challengeResponse} />
    </div>
  );
}
