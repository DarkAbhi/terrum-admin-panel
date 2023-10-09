import { Metadata } from "next";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { BASE_API_URL } from "@/constants/constants";
import { STAFF_PROFILE_ENDPOINT } from "@/constants/routes";

export const metadata: Metadata = {
  title: "Profile",
  description: "Terrum Dashboard",
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  const apiResponse = await fetch(`${BASE_API_URL}${STAFF_PROFILE_ENDPOINT}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  const profileResponse = await apiResponse.json();

  return (
    <div>
      <div className="flex md:flex-row flex-col justify-center items-center md:justify-start md:items-start">
        <Image
          src={profileResponse.image ?? "/profile_picture_placeholder.png"}
          alt="Image"
          width={200}
          height={200}
          className="rounded-xl"
        />
        <div className="text-xl md:text-2xl font-semibold md:ml-6 mt-8 md:mt-0">
          {profileResponse.full_name}
        </div>
      </div>
      <div className="font-medium mt-4">Recent Activity</div>
      <div className="text-gray-400 mt-8">No activities to show</div>
    </div>
  );
}
