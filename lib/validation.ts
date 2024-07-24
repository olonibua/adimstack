import { z } from "zod";

export const GymFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  location: z
    .string()
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location must be at most 100 characters"),
  description: z
    .string()
    .min(2, "Description must be at least 2 characters")
    .max(200, "Description must be at most 200 characters"),
  subscriptionPlans: z
    .array(
      z.object({
        planId: z.string().optional(),
        name: z
          .string()
          .min(2, "Plan name must be at least 2 characters")
          .max(50, "Plan name must be at most 50 characters"),
        duration: z
          .union([
            z
              .string()
              .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
                message: "Duration must be a positive number",
              }),
            z
              .number()
              .min(1, "Duration must be at least 1 day")
              .max(365, "Duration must be at most 365 days"),
          ])
          .transform((val) => Number(val)),
        price: z
          .union([
            z
              .string()
              .refine(
                (val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0,
                {
                  message: "Price must be a positive number",
                }
              ),
            z.number().min(0, "Price must be at least 0"),
          ])
          .transform((val) => Number(val)),
      })
    )
    .optional(),
});

export const AdminFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be at most 50 characters"),
  gymId: z.string().min(1, "Gym ID is required"),
});


export const MemberFormValidation = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be at most 50 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone:  z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  birthDate: z.coerce.date(),
  gender: z.enum(["Male", "Female", "Other"]),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" })
    .max(500, { message: "Address must be at most 500 characters" }),
  occupation: z
    .string()
    .min(2, { message: "Occupation must be at least 2 characters" })
    .max(500, { message: "Occupation must be at most 500 characters" }),
  emergencyContactName: z
    .string()
    .min(2, { message: "Contact name must be at least 2 characters" })
    .max(50, { message: "Contact name must be at most 50 characters" }),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      { message: "Invalid phone number" }
    ),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to privacy in order to proceed",
    }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  gymId: z.string().optional(),
  
});



export const PauseSubscriptionSchema = z.object({
  reason: z.string().optional(),
  note: z.string().optional(),
});

// Schema for resuming a subscription
export const ResumeSubscriptionSchema = z.object({});

export function getSubscriptionSchema(type: string) {
  switch (type) {
    case "pause":
      return PauseSubscriptionSchema;
    case "resume":
      return ResumeSubscriptionSchema;
    default:
      return z.object({});
  }
}

export const AddPlanSchema = z.object({
  name: z.string().nonempty("Plan name is required"),
  price: z
    .string()
    .nonempty("Price is required")
    .transform(Number)
    .refine((n) => n > 0, "Price must be a positive number"),
  duration: z
    .string()
    .nonempty("Duration is required")
    .transform(Number)
    .refine((n) => n > 0, "Duration must be a positive number"),
});

export const EditPlanSchema = AddPlanSchema;

// Schema for deleting a plan
export const DeletePlanSchema = z.object({});

export function getPlanSchema(type: string) {
  switch (type) {
    case "add":
      return AddPlanSchema;
    case "edit":
      return EditPlanSchema;
    case "delete":
      return DeletePlanSchema;
    default:
      return z.object({});
  }
}
