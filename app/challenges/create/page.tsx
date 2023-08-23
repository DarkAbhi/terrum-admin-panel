import { CreateChallengeForm } from "@/components/challenge/create-challenge-form";
import { DashboardHeader } from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create challenge"
};

export default function CreateChallengePage() {
    return (
      <div>
        <DashboardHeader heading="Create challenge"></DashboardHeader>
        <CreateChallengeForm />
      </div>
    );
}