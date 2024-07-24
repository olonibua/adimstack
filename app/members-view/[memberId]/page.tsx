"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getGym } from "@/lib/actions/gym.action";
import { DataTable } from "@/components/table/DataTable";
import { getColumns } from "@/components/table/columns";
import { fetchUserSubscription, getMember } from "@/lib/actions/member.actions";
import withLoginAuth from "@/components/hoc/withLoginAuth";
import { Plan } from "@/components/Plan";
import LoadingSpinner from "@/components/LoadingSpinner";

type PlanType = "weekly" | "monthly" | "quarterly" | "yearly";

const MembersPage = ({
  params: { memberId },
}: {
  params: { memberId: string };
}) => {
  const [member, setMember] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [subscription, setSubscription] = useState<any>(null);
  const [gym, setGym] = useState<any>(null);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const [sub, fetchedMember] = await Promise.all([
          fetchUserSubscription(memberId),
          getMember(memberId),
        ]);

        if (isMounted) {
          setSubscription(sub);
          setMember(fetchedMember);
          setHasActiveSubscription(
            !!sub &&
              sub.documents.some(
                (doc: any) => doc.status === "active" || doc.status === "paused"
              )
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [memberId, refreshTrigger]);

  useEffect(() => {
    if (!member?.gymId) return;

    let isMounted = true;
    setIsLoading(true);

    const fetchGym = async () => {
      try {
        const gymData = await getGym(member.gymId);
        if (isMounted) {
          setGym(gymData);
        }
      } catch (error) {
        console.error("Error fetching gym:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchGym();

    return () => {
      isMounted = false;
    };
  }, [member?.gymId]);

  const handleSubscriptionUpdate = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const planTypes: PlanType[] = ["weekly", "monthly", "quarterly", "yearly"];
  const columns = getColumns(handleSubscriptionUpdate);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>
        <h3
          className="text-16-semibold"
        >
          {gym?.name
            ? gym.name.charAt(0).toUpperCase() + gym.name.slice(1)
            : "Guest"}{" "}
          Gym!
        </h3>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">
            Welcome! 👋{" "}
            {member?.name
              ? member.name.charAt(0).toUpperCase() + member.name.slice(1)
              : "Guest"}
          </h1>
          <p className="text-dark-700">
            Start the day with managing new appointment
          </p>
        </section>
        <DataTable
          columns={columns}
          data={
            subscription && subscription.documents ? subscription.documents : []
          }
        />

        <section className="admin-stat">
          {!hasActiveSubscription &&
            gym?.subscriptionPlans?.map((plan: any, index: any) => (
              <Plan
                key={plan.planId}
                planId={plan.planId}
                name={plan.name}
                memberId={member?.$id}
                duration={plan.duration}
                price={plan.price}
                type={planTypes[index % planTypes.length]}
              />
            ))}
        </section>
      </main>
    </div>
  );
};

export default withLoginAuth(MembersPage);
