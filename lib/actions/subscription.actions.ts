import { ID, Query } from "node-appwrite";
import { DATABASE_ID, databases, SUBSCRIPTION_COLLECTION_ID } from "../appwrite.config";
import { calculateDaysLeft } from "../utils";


enum SubscriptionStatus {
  Active = "active",
  Inactive = "inactive",
  Pending = "pending",
  Paused = "paused",
  Expired = "expired",
}

export const createMemberSubscription = async (subscriptionDetails: any) => {
  // Check for existing active subscriptions
  const existingSubscriptions = await databases.listDocuments(
    DATABASE_ID,
    SUBSCRIPTION_COLLECTION_ID, // your collection name
    [
      Query.equal("memberId", subscriptionDetails.memberId),
      Query.greaterThan("endDate", new Date().toISOString()),
    ]
  );

  if (existingSubscriptions.documents.length > 0) {
    // User already has an active subscription
    throw new Error("User already has an active subscription");
    // Alternatively, you could cancel the existing subscription here
    // await cancelExistingSubscription(existingSubscriptions.documents[0].$id);
  }
  const requiredFields = [
    "name",
    "planName",
    "planPrice",
    "planDuration",
    "memberId",
    "gymId",
    "planId",
    "startDate",
    "endDate",
  ];
  for (const field of requiredFields) {
    if (!subscriptionDetails[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  const subscriptionId = ID.unique();

  const subscriptionDocument = {
    subscriptionId,
    name: subscriptionDetails.name,
    planName: subscriptionDetails.planName,
    planPrice: subscriptionDetails.planPrice,
    planDuration: subscriptionDetails.planDuration,
    memberId: subscriptionDetails.memberId,
    gymId: subscriptionDetails.gymId,
    planId: subscriptionDetails.planId,
    startDate: subscriptionDetails.startDate,
    endDate: subscriptionDetails.endDate,
    status: SubscriptionStatus.Active,
  };

  console.log(
    "Subscription document to be created:",
    JSON.stringify(subscriptionDocument, null, 2)
  );

  try {
    const result = await databases.createDocument(
      DATABASE_ID,
      SUBSCRIPTION_COLLECTION_ID,
      subscriptionId,
      subscriptionDocument
    );
    return result;
  } catch (error) {
    console.error("Error creating document:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
    }
    throw error;
  }
};
// Function to pause a subscription
export const pauseSubscription = async (
  subscriptionId: string,
  reason: string
) => {
  try {
    const subscription = await databases.getDocument(
      DATABASE_ID,
      SUBSCRIPTION_COLLECTION_ID,
      subscriptionId
    );

    const pauseDate = new Date().toISOString();
    const daysLeft = calculateDaysLeft(subscription.endDate, null, null);
    const newEndDate = new Date(
      new Date(subscription.endDate).getTime() + daysLeft * 24 * 60 * 60 * 1000
    ).toISOString();

    await databases.updateDocument(
      DATABASE_ID,
      SUBSCRIPTION_COLLECTION_ID,
      subscriptionId,
      {
        status: "paused",
        reason: reason,
        pauseDate: pauseDate,
        endDate: newEndDate,
      }
    );
  } catch (error) {
    console.error("Error pausing subscription:", error);
    throw error;
  }
};

// Function to resume a subscription
export const resumeSubscription = async (subscriptionId: string) => {
  try {
    await databases.updateDocument(
      DATABASE_ID,
      SUBSCRIPTION_COLLECTION_ID,
      subscriptionId,
      {
        status: "active",
        resumeDate: new Date().toISOString(),
      }
    );
  } catch (error) {
    console.error("Error resuming subscription:", error);
    throw error;
  }
};
