import * as sdk from "node-appwrite";


// export const {
//   PROJECT_ID,
//   API_KEY,
//   DATABASE_ID,
//   GYM_COLLECTION_ID,
//   ADMIN_COLLECTION_ID,
//   MEMBER_COLLECTION_ID,
//   NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
// } = process.env;

export const ENDPOINT = "https://cloud.appwrite.io/v1";
export const PROJECT_ID = "66969fef001d5178e366";
const API_KEY =
  "152dff30c326d222419938879de7f77c58d867e531ba641e46988cf979147230554aa2b10b630538910f6f3ce2db6a0c42193509e14d3fa82d265c308f7c1908e9d750b2f72d8628353e8c53774c3c8fa6ca5776f9e0f887ab66e65f5402c0ca979ae59239ec1e143a606b0079bbabe43f45722ab3b36fb06da4896552bce7b7";
export const DATABASE_ID = "6696a212000f5bdb0e1b";
export const GYM_COLLECTION_ID = "6696a472003e09556dd7";
const ADMIN_COLLECTION_ID = "6696a4c00002b2fcfad6";
const MEMBER_COLLECTION_ID = "6696a4f30005f23d9e82";
const BUCKET_ID = "6696a56a003cb76f1b48";
export const SUBSCRIPTION_COLLECTION_ID = "669b434d002ec95515c8";

const client = new sdk.Client();

client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);
export const account = new sdk.Account(client);