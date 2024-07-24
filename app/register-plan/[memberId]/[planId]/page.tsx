"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSubscription } from "./hook/useSubscription";
import { getGyms } from "@/lib/actions/gym.action";
import { getMember } from "@/lib/actions/member.actions";
import LoadingSpinner from "@/components/LoadingSpinner";

const PlanDetailsPage = ({
  params: { memberId, planId },
}: {
  params: { memberId: string; planId: string };
}) => {
  const router = useRouter();
  const [planDetails, setPlanDetails] = useState<PlanDetailsProps | null>(null);
  const [gymData, setGymData] = useState<GymData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [member, setMember] = useState<any>(null)

  const { handlePayment } = useSubscription(
    memberId,
    planId,
    planDetails,
    setIsLoading,
    gymData,
    setError,
    setIsProcessing,
    setGymData,
    router,
    setPlanDetails,
    member
  );

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const fetchedMember: any = await getMember(memberId);
        if (fetchedMember) {
          setMember(fetchedMember);
        }
      } catch (error) {
        console.error("Error fetching member:", error);
      }
    };

    fetchMember();
  }, [memberId]);


  useEffect(() => {
    const fetchPlanDetails = async () => {
      if (typeof planId !== "string") return;

      try {
        const gyms: any = await getGyms();

        const gymWithPlan: any = gyms.find((gym: any) =>
          gym.subscriptionPlans.some((planString: any) => {
            const plan = JSON.parse(planString);
            return plan.planId === planId;
          })
        );

        if (gymWithPlan) {
          setGymData(gymWithPlan);

          const planString: any = gymWithPlan.subscriptionPlans.find(
            (planString: any) => {
              const plan = JSON.parse(planString);
              return plan.planId === planId;
            }
          );

          if (planString) {
            setPlanDetails(JSON.parse(planString));
            setIsLoading(false);
          } else {
            setError("Plan not found");
          }
        } else {
          setError("Gym with plan not found");
        }
      } catch (error) {
        setError("Error fetching plan details");
        console.error("Error fetching plan details:", error);
      }
    };

    if (planId) {
      fetchPlanDetails();
    }
  }, [planId]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!planDetails || !gymData) {
    return <p>{error || "Plan not found"}</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-32-bold">{planDetails.name}</h1>
      <p className="mt-4">Duration: {planDetails.duration} days</p>
      <p className="mt-2">Price: ${planDetails.price}</p>
      <p className="mt-4">Gym: {gymData.name}</p>
      <p className="mt-2">Location: {gymData.location}</p>
      <p className="mt-2">Description: {gymData.description}</p>
      <button
        onClick={handlePayment}
        className="mt-8 bg-blue-500 text-white py-2 px-4 rounded"
        disabled={isLoading || isProcessing}
      >
        {isLoading
          ? "Loading..."
          : isProcessing
          ? "Processing..."
          : "Proceed to Payment"}
      </button>
    </div>
  );
};

export default PlanDetailsPage;
