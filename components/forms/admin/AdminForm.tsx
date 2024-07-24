"use client";

import React, { useEffect, useState } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { AdminFormValidation } from "@/lib/validation";
import CustomFormField, { FormFieldType } from "../../CustomFormField";
import SubmitButton from "../../SubmitButton";
import { getGyms } from "@/lib/actions/gym.action";
import { SelectItem } from "../../ui/select";
import { createAdmin } from "@/lib/actions/admin.actions";
import LoadingSpinner from "@/components/LoadingSpinner";

const AdminForm = ({ gymId }: { gymId?: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [gyms, setGyms] = useState([]);

  const form = useForm<z.infer<typeof AdminFormValidation>>({
    resolver: zodResolver(AdminFormValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      gymId: gymId || "",
    },
  });

  useEffect(() => {
    if (gymId) {
      form.setValue("gymId", gymId);
    }
  }, [gymId, form]);

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const gymsList: any = await getGyms();
        setGyms(gymsList);
      } catch (error) {
        console.error("Failed to fetch gyms:", error);
      }
    };
    fetchGyms();
  }, []);

  const onSubmit = async (values: z.infer<typeof AdminFormValidation>) => {
    setIsLoading(true);
    try {
      const admin = {
        name: values.name,
        email: values.email,
        password: values.password,
        gymId: values.gymId,
      };
      const newAdmin = await createAdmin(admin);
      if (newAdmin) {
        router.push(`/login-admin`);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

   if (isLoading) {
     return <LoadingSpinner />;
   }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Register Admin</h1>
          <p className="text-dark-700">Get started with management.</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="john.doe@example.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="password"
          label="Password"
          placeholder="********"
          iconSrc="/assets/icons/lock.svg"
          iconAlt="password"
        />

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="gymId"
          label="Gym"
          placeholder="Select a gym"
          disabled={!!gymId} // Disable the field if gymId is provided
        >
          {gyms.map((gym: any) => (
            <SelectItem key={gym.$id} value={gym.$id}>
              <div className="flex cursor-pointer items-center gap-2">
                <p>{gym && gym.name ? gym.name : "Gym"}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <SubmitButton isLoading={isLoading}>Register Admin</SubmitButton>
      </form>
    </Form>
  );
};

export default AdminForm;
