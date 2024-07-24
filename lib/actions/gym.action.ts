import { ID, Query } from "node-appwrite";
import { databases, SUBSCRIPTION_COLLECTION_ID, users } from "../appwrite.config";
import { parseStringify } from "../utils";
// import {
//   GYM_COLLECTION_ID,
//   DATABASE_ID,
//   // databases,
//   // messaging,
// } from "../appwrite.config";

const DATABASE_ID= '6696a212000f5bdb0e1b'
const GYM_COLLECTION_ID='6696a472003e09556dd7'

export const createGym = async (gym: CreateGymParams) => {
  try {
    const subscriptionPlans =
      gym.subscriptionPlans?.map((plan) =>
        JSON.stringify({
          planId: ID.unique(),
          name: plan.name,
          duration: plan.duration,
          price: plan.price,
        })
      ) || [];

    const newGym = await databases.createDocument(
      DATABASE_ID!,
      GYM_COLLECTION_ID!,
      ID.unique(),
      {
        name: gym.name,
        email: gym.email,
        location: gym.location,
        description: gym.description,
        subscriptionPlans: subscriptionPlans, // Array of stringified objects
      }
    );

    return newGym;
  } catch (error: any) {
    console.error("An error occurred while creating a new gym:", error);
    throw error;
  }
};


export const getGyms = async () => {

  try {
    const gyms = await databases.listDocuments(
      DATABASE_ID!,
      GYM_COLLECTION_ID!
    );
    return gyms.documents;
  } catch (error) {
    console.error("Failed to fetch gyms:", error);
    throw error;
  }
};

export const getGym = async (gymId: string) => {
  try {
    const gym = await databases.getDocument(
      DATABASE_ID!,
      GYM_COLLECTION_ID!,
      gymId
    );

    const gymData = parseStringify(gym) as GymData;

    // Parse the subscription plans
    gymData.subscriptionPlans = gymData.subscriptionPlans.map((plan) =>
      typeof plan === "string" ? JSON.parse(plan) : plan
    );


    return gymData;
  } catch (error) {
    console.error("An error occurred while retrieving the gym details:", error);
    return null;
  }
};


export const fetchAllSubscription = async (gymId: any) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      SUBSCRIPTION_COLLECTION_ID,
      [Query.equal("gymId", gymId)]
    );

    return response;
  } catch (error) {
    console.log(error);
    return null; // or throw error; depending on how you want to handle it
  }
};

export const getGymSubscriptionPlans = async (gymId: string) => {
  try {
    const gym = await databases.getDocument(
      DATABASE_ID!,
      GYM_COLLECTION_ID!,
      gymId
    );

    if (!gym) {
      throw new Error("Gym not found");
    }

    const subscriptionPlans = gym.subscriptionPlans || [];

    return subscriptionPlans;
  } catch (error: any) {
    console.error(
      "An error occurred while fetching subscription plans:",
      error
    );
    throw error;
  }
};

export const addSubscriptionPlan = async (
  gymId: string,
  plan: SubscriptionPlan
) => {
  try {
    const gym = await databases.getDocument(
      DATABASE_ID!,
      GYM_COLLECTION_ID!,
      gymId
    );

    let subscriptionPlans = gym.subscriptionPlans || [];

    // Ensure subscriptionPlans is an array
    if (!Array.isArray(subscriptionPlans)) {
      subscriptionPlans = [];
    }

    const newPlan = {
      planId: ID.unique(),
      name: plan.name,
      duration: plan.duration,
      price: plan.price,
    };

    // Stringify the new plan object
    const stringifiedPlan = JSON.stringify(newPlan);

    // Add the stringified plan to the array
    subscriptionPlans.push(stringifiedPlan);

    const updatedGym = await databases.updateDocument(
      DATABASE_ID!,
      GYM_COLLECTION_ID!,
      gymId,
      { subscriptionPlans: subscriptionPlans }
    );

    return updatedGym;
  } catch (error: any) {
    console.error("An error occurred while adding a subscription plan:", error);
    throw error;
  }
};

export const editSubscriptionPlan = async (
  gymId: string,
  planId: string,
  updatedPlan: SubscriptionPlan
) => {
  try {
    const gym = await databases.getDocument(
      DATABASE_ID!,
      GYM_COLLECTION_ID!,
      gymId
    );

    let subscriptionPlans = gym.subscriptionPlans || [];

    // Ensure subscriptionPlans is an array
    if (!Array.isArray(subscriptionPlans)) {
      subscriptionPlans = [];
    }

    // Find and update the plan
    const updatedPlans = subscriptionPlans.map((planString: string) => {
      const plan = JSON.parse(planString);
      if (plan.planId === planId) {
        return JSON.stringify({ ...plan, ...updatedPlan, planId });
      }
      return planString;
    });

    const updatedGym = await databases.updateDocument(
      DATABASE_ID!,
      GYM_COLLECTION_ID!,
      gymId,
      { subscriptionPlans: updatedPlans }
    );

    return updatedGym;
  } catch (error: any) {
    console.error(
      "An error occurred while editing a subscription plan:",
      error
    );
    throw error;
  }
};

export const deleteSubscriptionPlan = async (gymId: string, planId: string) => {
  try {
    const gym = await databases.getDocument(
      DATABASE_ID!,
      GYM_COLLECTION_ID!,
      gymId
    );

    let subscriptionPlans = gym.subscriptionPlans || [];

    // Ensure subscriptionPlans is an array
    if (!Array.isArray(subscriptionPlans)) {
      subscriptionPlans = [];
    }

    // Filter out the plan to be deleted
    const updatedPlans = subscriptionPlans.filter((planString: string) => {
      const plan = JSON.parse(planString);
      return plan.planId !== planId;
    });

    const updatedGym = await databases.updateDocument(
      DATABASE_ID!,
      GYM_COLLECTION_ID!,
      gymId,
      { subscriptionPlans: updatedPlans }
    );

    return updatedGym;
  } catch (error: any) {
    console.error(
      "An error occurred while deleting a subscription plan:",
      error
    );
    throw error;
  }
};