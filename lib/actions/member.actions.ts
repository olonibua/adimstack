"use server";

import { AppwriteException, ID, Query } from "node-appwrite";

import {
  account,
  // BUCKET_ID,
  // DATABASE_ID,
  // ENDPOINT,
  // PROJECT_ID,
  databases,
  ENDPOINT,
  PROJECT_ID,
  storage,
  SUBSCRIPTION_COLLECTION_ID,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";


const DATABASE_ID = "6696a212000f5bdb0e1b";
const GYM_COLLECTION_ID = "6696a472003e09556dd7";
const MEMBER_COLLECTION_ID = "6696a4f30005f23d9e82";
const BUCKET_ID = "6696a56a003cb76f1b48";





export const registerMember = async ({ ...member }: CreateMemberParams) => {
  try {
    // Create a user in Appwrite's authentication system
    const newMember = await account.create(
      ID.unique(),
      member.email,
      member.password,
      member.name
    );

    // Create a document in the database without the document upload part
    const memberDoc = await databases.createDocument(
      DATABASE_ID!,
      MEMBER_COLLECTION_ID!,
      newMember.$id,
      {
        ...member,
      }
    );

    return newMember;
  } catch (error) {
    console.error("Error in registerMember:", error);
    throw error;
  }
};


export const getMembers = async (gymId: string) => {
  try {
    const members = await databases.listDocuments(
      DATABASE_ID!,
      MEMBER_COLLECTION_ID!,
      [Query.equal("gymId", gymId), Query.orderDesc("$createdAt")]
    );

    return parseStringify(members);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};

export const loginMember = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    if (error instanceof AppwriteException) {
      // You can add more specific error handling here
      if (error.code === 401) {
        throw new Error("Invalid email or password. Please try again.");
      }
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const getMember = async (memberId: string) => {

  try {
    const member = await databases.listDocuments(
      DATABASE_ID!,
      MEMBER_COLLECTION_ID!,
      [Query.equal("$id", memberId)]
    );

    if (member.documents.length > 0) {
      return member.documents[0];
    } else {
      throw new Error("Member not found");
    }
  } catch (error) {
    console.error("Error retrieving member details:", error);
    throw error;
  }
};

export const getGymDataByPlanId = async (planId: string) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      GYM_COLLECTION_ID
    );

    // Log the structure of the first document to check the data format
    if (response.documents.length > 0) {
      console.log(
        "Sample document structure:",
        JSON.stringify(response.documents[0], null, 2)
      );
    }

    const gymDocument = response.documents.find((document) =>
      document.subscriptionPlans.some((plan: any) => plan.planId === planId)
    );

    if (!gymDocument) {
      throw new Error("No gym found with the specified plan");
    }

    return gymDocument;
  } catch (err) {
    console.error("Error fetching gym data:", err);
    throw err;
  }
};



export const fetchUserSubscription = async (memberId: any) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      SUBSCRIPTION_COLLECTION_ID,
      [Query.equal("memberId", memberId)]
    );
    return response;
  } catch (error) {
    console.log(error);
    return null; // or throw error; depending on how you want to handle it
  }
};


