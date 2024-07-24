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
import { getMember, loginMember } from "@/lib/actions/member.actions";
import LoadingSpinner from "@/components/LoadingSpinner";

const MemberLoginValidation = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const MemberLoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(MemberLoginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await loginMember(values.email, values.password);
      if (response) {
        // Fetch the admin document to get gymId
        
        const memberId = response.userId;
        const memberData = await getMember(memberId); 

        if (memberId) {
        //   const gymId = memberData.gymId;
          localStorage.setItem("memberToken", memberId);
          router.push(`/members-view/${memberId}`);
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

   

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h1>Member Login</h1>
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

export default MemberLoginForm;
