'use client'
import { useEffect, useState } from "react";
import { getMember } from "@/lib/actions/member.actions"; // Adjust the path as per your project structure
import { useRouter } from "next/router";
import UserDetails from "@/components/UserDetails";
import LoadingSpinner from "@/components/LoadingSpinner";

const UserDetailsPage = ({ params: { memberId } }: any) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        if (memberId) {
          const member = await getMember(memberId); // Assuming getMember fetches member details
          setUser(member);
        }
      } catch (error) {
        console.error("Error fetching member details:", error);
      }
    };

    fetchMember();
  }, [memberId]);

  if (!user) {
    return <LoadingSpinner />; // Placeholder for loading state
  }

  return <UserDetails user={user} />;
};

export default UserDetailsPage;
