import * as sdk from "node-appwrite";

export const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID;
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
export const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID;
export const GYM_COLLECTION_ID = process.env.NEXT_PUBLIC_GYM_COLLECTION_ID;
export const ADMIN_COLLECTION_ID = process.env.NEXT_PUBLIC_ADMIN_COLLECTION_ID;
export const MEMBER_COLLECTION_ID =
  process.env.NEXT_PUBLIC_MEMBER_COLLECTION_ID;
export const BUCKET_ID = process.env.NEXT_PUBLIC_BUCKET_ID;
export const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;
export const SUBSCRIPTION_COLLECTION_ID =
  process.env.NEXT_PUBLIC_SUBSCRIPTION_COLLECTION_ID;


if (!ENDPOINT || !PROJECT_ID || !API_KEY) {
  throw new Error("Missing required environment variables");
}

const client = new sdk.Client();

try {
  client.setEndpoint(ENDPOINT).setProject(PROJECT_ID).setKey(API_KEY);
} catch (error) {
  console.error("Error setting up Appwrite client:", error);
  throw error;
}

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);
export const account = new sdk.Account(client);
