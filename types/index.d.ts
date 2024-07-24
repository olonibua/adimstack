/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "Male" | "Female" | "Other";
declare type Status = "pending" | "scheduled" | "cancelled";



declare interface CreateMemberParams {
  name: string;
  email: string;
  phone?: string; // Optional
  password: string;
  gymId: string;
  birthDate: Date; // Changed to string to match schema
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  identificationDocument?: FormData | undefined;
  identificationType: string | undefined; // Optional
  identificationNumber: string | undefined; // Optional
  privacyConsent: boolean;
}

declare interface CreateAdminParams {
  name: string;
  email: string;
  password: string;
  gymId: string;
}

interface SubscriptionPlan {
  planId?: string; // Optional plan ID
  name: string;
  duration: number; // Duration in days
  price: number; // Price of the plan
}

interface CreateGymParams {
  name: string;
  email: string;
  location: string;
  description: string;
  subscriptionPlans?: SubscriptionPlan[]; // Optional array of subscription plans
}

interface GymData extends CreateGymParams {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  gymId: string;
  subscriptionPlans: SubscriptionPlan[]; // Not optional in the stored data
}

declare interface Member extends CreateMemberParams {
  $id: string;
}

declare interface User extends CreateUserParams {
  $id: string;
}

declare interface RegisterUserParams extends CreateUserParams {
  userId: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string | undefined;
  currentMedication: string | undefined;
  familyMedicalHistory: string | undefined;
  pastMedicalHistory: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: FormData | undefined;
  privacyConsent: boolean;
}

declare type CreateAppointmentParams = {
  userId: string;
  patient: string;
  primaryPhysician: string;
  reason: string;
  schedule: Date;
  status: Status;
  note: string | undefined;
};

declare type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  appointment: Appointment;
  type: string;
};

declare interface Gym {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: string[];
  $tenant: string;
  $updatedAt: string;
  description: string;
  email: string;
  location: string;
  name: string;
  subscriptionPlans: {
    planId: string;
    name: string;
    duration: number;
    price: number;
  }[];
}

declare interface Member {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: string[];
  $tenant: string;
  $updatedAt: string;
  address: string;
  birthDate: string;
  email: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  gender: string;
  gymId: string;
  identificationDocument: string | null;
  identificationDocumentId: string | null;
  identificationDocumentUrl: string | null;
  identificationNumber: string;
  identificationType: string;
  name: string;
  occupation: string;
  password: string;
  privacyConsent: boolean;
}

declare interface PlanDetailsProps {
  planId: string;
  name: string;
  duration: number;
  price: number;
};

declare interface GymData {
  $id: string;
  name: string;
  description: string;
  location: string;
  email: string;
  subscriptionPlans: PlanDetailsProps[];
};

declare interface Subscription {
  subscriptionId: string;
  memberId: string;
  gymId: string;
  planId: string;
  startDate: string;
  endDate: string;
  status: string;
};