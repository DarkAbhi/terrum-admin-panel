import { EditChallengeForm } from "@/components/challenge/edit-challenge-form";
import { DashboardHeader } from "@/components/header";
import { BASE_API_URL } from "@/constants/constants";
import { CHALLENGES_ENDPOINT } from "@/constants/routes";
import { getAccessTokenCookie } from "@/lib/session";
import { Challenge } from "@/types/challenge";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit challenge",
};

export default async function EditChallenge({
  params,
}: {
  params: { id: number };
}) {
  const apiResponse = await fetch(
    `${BASE_API_URL}${CHALLENGES_ENDPOINT}${params.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessTokenCookie()}`,
      },
    }
  );
  const challengeResponse: Challenge = await apiResponse.json();

  return (
    <div>
      <DashboardHeader heading="Edit brand"></DashboardHeader>
      <EditChallengeForm challenge={challengeResponse} />
    </div>
  );
}
