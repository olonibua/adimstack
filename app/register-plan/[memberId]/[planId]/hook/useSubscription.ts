import {
  fetchUserSubscription,
} from "@/lib/actions/member.actions";
import { getGyms } from "@/lib/actions/gym.action";
import { createMemberSubscription } from "@/lib/actions/subscription.actions";

export const useSubscription = (
  memberId: string,
  planId: any,
  planDetails: any,
  setIsLoading: any,
  gymData: any,
  setError: any,
  setIsProcessing: any,
  setGymData: any,
  router: any,
  setPlanDetails: any,
  member : any
) => {
  const createSubscription = async () => {
    if (!planDetails || !gymData) {
      return;
    }

    const startDate = new Date().toISOString();
    const endDate = new Date(
      Date.now() + planDetails.duration * 24 * 60 * 60 * 1000
    ).toISOString();

    const subscriptionDetails = {
      name: member.name,
      planName: planDetails.name,
      planPrice: planDetails.price,
      planDuration: planDetails.duration,
      memberId: memberId,
      gymId: gymData.$id,
      planId: planDetails.planId,
      startDate: startDate,
      endDate: endDate,
    };

    try {
      const res = await createMemberSubscription(subscriptionDetails);
      console.log("Subscription created successfully:", res);
      return res;
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "User already has an active subscription"
      ) {
        console.log("You already have an active subscription.");
      } else {
        console.error("Error creating subscription:", error);
      }
      throw error;
    }
  };

  const handlePayment = async () => {
    if (!planDetails || !gymData) {
      console.log("Plan details or gym data is missing");
      return;
    }

    setIsProcessing(true);

    try {
      // Await the subscription creation
      await createSubscription();

      // Redirect to success page
      router.push(`/register-plan/${memberId}/${planId}/success`);
    } catch (error) {
      // Handle any errors from createSubscription
      console.error("Error creating subscription:", error);
    } finally {
      // Stop processing state even if there's an error
      setIsProcessing(false);
    }
  };

  

  return {
    handlePayment,
  };
};
