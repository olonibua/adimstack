import { ID } from "node-appwrite";
import { account, databases, users } from "../appwrite.config";
import { parseStringify } from "../utils";

const DATABASE_ID = "6696a212000f5bdb0e1b";
const ADMIN_COLLECTION_ID = "6696a4c00002b2fcfad6";


export const createAdmin = async (admin: CreateAdminParams) => {
  try {
    const newAdmin = await account.create(
      ID.unique(),
      admin.email,
      admin.password,
      admin.name
    );

    // Create a document in the database with all required fields
    const adminDoc = await databases.createDocument(
      DATABASE_ID,
      ADMIN_COLLECTION_ID,
      newAdmin.$id,
      {
        gymId: admin.gymId,
        email: admin.email,
        name: admin.name,
        password: admin.password, // Include the password field
      }
    );


    return newAdmin;
  } catch (error: any) {
    console.error("An error occurred while creating a new admin:", error);
    throw error;
  }
};





export const loginAdmin = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const getAdmin = async (adminId: string) => {

  try {
    const admin = await databases.getDocument(
      DATABASE_ID!,
      ADMIN_COLLECTION_ID!,
      adminId
    );
    return parseStringify(admin);
  } catch (error) {
    console.error("Error fetching admin data:", error);
    return null;
  }
};