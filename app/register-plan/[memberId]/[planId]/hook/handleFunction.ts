import { createMemberSubscription } from "@/lib/actions/subscription.actions";

export const handleFunction = (memberId: string, planDetails: any, gymData: any) => {
  const createSubscription = async () => {
    if (!planDetails || !gymData) {
      return;
    }

    const startDate = new Date().toISOString();
    const endDate = new Date(
      Date.now() + planDetails.duration * 24 * 60 * 60 * 1000
    ).toISOString();

    const subscriptionDetails = {
      memberId: memberId,
      gymId: gymData.$id,
      planId: planDetails.planId,
      startDate: startDate,
      endDate: endDate,
    };

    try {
      const res = await createMemberSubscription(subscriptionDetails);
      console.log("Subscription created successfully:", res);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "User already has an active subscription"
      ) {
        console.log("You already have an active subscription.");
      } else {
        console.error("Error creating subscription:", error);
      }
    }
  };
  

  return {
    createSubscription,
  };
};