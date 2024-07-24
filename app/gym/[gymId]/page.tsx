"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getGymDataByPlanId } from "@/lib/actions/member.actions";
import { getGym } from "@/lib/actions/gym.action";
import LoadingSpinner from "@/components/LoadingSpinner";

interface SearchParamProps {
  params: {
    gymId: string;
  };
}

const Success = ({ params: { gymId } }: SearchParamProps) => {
  const [gym, setGym] = useState<any>(null);

  useEffect(() => {
    if (gymId) {
      const fetchGym = async () => {
        try {
          const gymData = await getGym(gymId);
          setGym(gymData);
        } catch (error) {
          console.error("Error fetching gym:", error);
        }
      };
      fetchGym();
    }
  }, [gymId]);

  if (!gym) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>
        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your gym;{" "}
            <span className="text-green-500">
              {gym && gym.name ? gym.name : "Gym"}
            </span>{" "}
            has been successfully registered!
          </h2>
          <p>
            Kindly create adminstrators for{" "}
            <span className="text-green-500">
              {gym && gym.name ? gym.name : "Gym"}
            </span>{" "}
            immediately😊
          </p>
        </section>
        <section className="request-details">
          <Link href={`/register-admin/${gymId}`}>Register Admin</Link>
        </section>
        <p className="copyright">© 2024 CarePluse</p>
      </div>
    </div>
  );
};

export default Success;
