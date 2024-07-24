"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { StatCard } from "@/components/StatCard";
import withAdminAuth from "@/components/hoc/withAdminAuth";
import {
  addSubscriptionPlan,
  fetchAllSubscription,
  getGym,
  getGymSubscriptionPlans,
} from "@/lib/actions/gym.action";
import {
  fetchUserSubscription,
  getMembers,
} from "@/lib/actions/member.actions";
import { memberColumns } from "@/components/table/memberColumns";
import { MemberDataTable } from "@/components/table/MemberDataTable";
import { AllMemberData } from "@/components/table/AllMember/AllMemberData";
import { allMemberColumns } from "@/components/table/AllMember/allMemberColumns";
import { PauseSubscriptionDataTable } from "@/components/table/pausedSubscription/PausedSubscriptionDataTable";
import { pausedSubscriptionColumns } from "@/components/table/pausedSubscription/pausedSubscriptionColumns";
import { BirthDayDataTable } from "@/components/table/monthlyCelebrants/BirthdayDataTable";
import { birthdayColumns } from "@/components/table/monthlyCelebrants/birthdayColumns";
import LoadingSpinner from "@/components/LoadingSpinner";
import { NavigationMenuDemo } from "@/components/Navigation";
import { SubscriptionPlanDataTable } from "@/components/table/subscriptionPlan/SubscriptionPlanDataTable";
import { subscriptionPlanColumns } from "@/components/table/subscriptionPlan/subscriptionPlanColumns";
import { Input } from "@/components/ui/input";

interface SearchParamProps {
  params: {
    gymId: string;
  };
}

const AdminPage = ({ params: { gymId } }: SearchParamProps) => {
  const [member, setMember] = useState<any[]>([]);
  const [subscription, setSubscription] = useState<any>(null);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [birthdaysCount, setBirthdaysCount] = useState(0);
  const [activeStat, setActiveStat] = useState("allMembers");
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [plans, setPlans] = useState([]);
  const [allMembersSearchQuery, setAllMembersSearchQuery] =
    useState<string>("");
  const [subscribedMembersSearchQuery, setSubscribedMembersSearchQuery] =
    useState<string>("");
  const [gym, setGym] = useState<any>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        const [fetchedMembers, sub, gymData, fetchedPlans] = await Promise.all([
          getMembers(gymId),
          fetchAllSubscription(gymId),
          getGym(gymId),
          getGymSubscriptionPlans(gymId),
        ]);

        setMember(fetchedMembers.documents);
        setSubscription(sub);
        setGym(gymData);
        setPlans(fetchedPlans);

        // Calculate birthdays
        const today = new Date();
        const currentMonth = today.getMonth();
        const birthdaysThisMonth = fetchedMembers.documents.filter(
          (member: any) => {
            const birthDate = new Date(member.birthDate);
            return birthDate.getMonth() === currentMonth;
          }
        );
        setBirthdaysCount(birthdaysThisMonth.length);

        // Check for active subscriptions
        setHasActiveSubscription(
          !!sub &&
            sub.documents.some(
              (doc: any) => doc.status === "active" || doc.status === "paused"
            )
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [gymId, refreshTrigger]);

  const handleStatCardClick = (statType: string) => {
    setActiveStat(statType);
  };

  const handleSubscriptionUpdate = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const PlanColumns = subscriptionPlanColumns(gymId, handleSubscriptionUpdate);

  const handleAllMembersSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAllMembersSearchQuery(e.target.value);
  };

  const handleSubscribedMembersSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSubscribedMembersSearchQuery(e.target.value);
  };

  const filteredAllMembersData = member.filter((member: any) => {
    return member.name
      .toLowerCase()
      .includes(allMembersSearchQuery.toLowerCase());
  });

  const filteredSubscribedMembersData =
    subscription?.documents?.filter((member: any) => {
      return member.name
        .toLowerCase()
        .includes(subscribedMembersSearchQuery.toLowerCase());
    }) || [];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const allMembers = member.length;
  const subscribedMembers =
    subscription && subscription.total ? subscription.total : 0;
  const pausedMembersArray =
    subscription?.documents?.filter((doc: any) => doc.status === "paused") ||
    [];
  const plansCount = plans.length;
  const pausedMembersCount = pausedMembersArray.length;

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
        <NavigationMenuDemo gymId={gymId} />
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">
            Welcome! {gym && gym.name ? gym.name : "Gym"} Administrator 👋
          </h1>
          <p className="text-dark-700">
            Start the day with managing new members
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={allMembers}
            label="All members"
            icon={"/assets/icons/appointments.svg"}
            onClick={() => handleStatCardClick("allMembers")}
            isActive={activeStat === "allMembers"}
          />
          <StatCard
            type="pending"
            count={subscribedMembers}
            label="Subscribed members"
            icon={"/assets/icons/pending.svg"}
            onClick={() => handleStatCardClick("subscribedMembers")}
            isActive={activeStat === "subscribedMembers"}
          />
          <StatCard
            type="cancelled"
            count={birthdaysCount}
            label="Birthdays"
            icon={"/assets/icons/cancelled.svg"}
            onClick={() => handleStatCardClick("birthdays")}
            isActive={activeStat === "birthdays"}
          />
          <StatCard
            type="appointments"
            count={pausedMembersCount}
            label="Paused Members"
            icon={"/assets/icons/appointments.svg"}
            onClick={() => handleStatCardClick("pausedMembers")}
            isActive={activeStat === "pausedMembers"}
          />
          <StatCard
            type="pending"
            count={plansCount}
            label="Gym plans"
            icon={"/assets/icons/pending.svg"}
            onClick={() => handleStatCardClick("gymPlans")}
            isActive={activeStat === "gymPlans"}
          />
        </section>

        {activeStat === "allMembers" && (
          <>
            <Input
              type="text"
              placeholder="Search member"
              className="shad-input border-0 mb-4"
              value={allMembersSearchQuery}
              onChange={handleAllMembersSearchChange}
            />
            <AllMemberData
              columns={allMemberColumns}
              data={filteredAllMembersData}
            />
          </>
        )}
        {activeStat === "subscribedMembers" && (
          <>
            <Input
              type="text"
              placeholder="Search member"
              className="shad-input border-0 mb-4"
              value={subscribedMembersSearchQuery}
              onChange={handleSubscribedMembersSearchChange}
            />
            <MemberDataTable
              columns={memberColumns}
              data={filteredSubscribedMembersData}
            />
          </>
        )}
        {activeStat === "pausedMembers" && (
          <PauseSubscriptionDataTable
            columns={pausedSubscriptionColumns}
            data={pausedMembersArray}
          />
        )}
        {activeStat === "gymPlans" && (
          <SubscriptionPlanDataTable
            columns={PlanColumns}
            data={plans ? plans : []}
          />
        )}
        {activeStat === "birthdays" && (
          <BirthDayDataTable
            columns={birthdayColumns}
            data={member
              .filter((mem) => {
                const birthDate = new Date(mem.birthDate);
                const today = new Date();
                return birthDate.getMonth() === today.getMonth();
              })
              .sort((a, b) => {
                const today = new Date();
                const aBirthDate = new Date(a.birthDate);
                const bBirthDate = new Date(b.birthDate);

                aBirthDate.setFullYear(today.getFullYear());
                bBirthDate.setFullYear(today.getFullYear());

                if (aBirthDate < today)
                  aBirthDate.setFullYear(today.getFullYear() + 1);
                if (bBirthDate < today)
                  bBirthDate.setFullYear(today.getFullYear() + 1);

                return aBirthDate.getTime() - bBirthDate.getTime();
              })}
          />
        )}
      </main>
    </div>
  );
};

export default withAdminAuth(AdminPage);
