"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAdmin, loginAdmin } from "@/lib/actions/admin.actions";
import { useRouter } from "next/navigation";
import SubmitButton from "../../SubmitButton";
import CustomFormField, { FormFieldType } from "../../CustomFormField";
import { Form } from "../../ui/form";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const AdminLoginValidation = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const AdminLoginForm = () => {
     const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
 
  const form = useForm({
    resolver: zodResolver(AdminLoginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await loginAdmin(values.email, values.password);
      if (response) {
        // Fetch the admin document to get gymId
        const adminId = response.userId;
        const adminData = await getAdmin(adminId); // Fetch the admin document

        if (adminData) {
          const gymId = adminData.gymId;
          localStorage.setItem("adminToken", adminId);
          router.push(`/admin/${gymId}`);
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h1>Admin Login</h1>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="admin@example.com"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="password"
          label="Password"
          placeholder="********"
        />
        <SubmitButton isLoading={isLoading}>Login</SubmitButton>
      </form>
    </Form>
  );
};

export default AdminLoginForm;
