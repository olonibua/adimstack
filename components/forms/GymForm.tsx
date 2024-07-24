"use client";

import React, { useState } from "react";
import { Form } from "@/components/ui/form";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { GymFormValidation } from "@/lib/validation";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { Button } from "@/components/ui/button";
import SubmitButton from "../SubmitButton";
import { createGym } from "@/lib/actions/gym.action";
import LoadingSpinner from "../LoadingSpinner";

const GymForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof GymFormValidation>>({
    resolver: zodResolver(GymFormValidation),
    defaultValues: {
      name: "",
      email: "",
      location: "",
      description: "",
      subscriptionPlans: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "subscriptionPlans",
  });

  const onSubmit = async (values: z.infer<typeof GymFormValidation>) => {
    if (isLoading) return; // Prevent multiple submissions
    setIsLoading(true);
    try {
      const gym = {
        name: values.name,
        email: values.email,
        location: values.location,
        description: values.description,
        subscriptionPlans: values.subscriptionPlans,
      };
      const newGym = await createGym(gym);
      if (newGym && newGym.$id) {
        router.push(`/gym/${newGym.$id}`);
      } else {
        console.error("Gym creation failed: No valid ID returned");
        // Handle the error, maybe set an error state and display it to the user
      }
    } catch (error) {
      console.error("Error creating gym:", error);
      // Handle the error, maybe set an error state and display it to the user
    } finally {
      setIsLoading(false);
    }
  };

   

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">Get started with management.</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Gym Name"
          placeholder="Jextoban"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          iconSrc="/assets/icons/email.svg"
          placeholder="admin@example.com"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="location"
          label="Location"
          placeholder="Location"
          iconSrc="/assets/icons/location.svg"
          iconAlt="location"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="description"
          label="Description"
          placeholder="Description"
          iconSrc="/assets/icons/info.svg"
          iconAlt="description"
        />

        {fields.map((field, index) => (
          <div key={field.id} className="space-y-4">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name={`subscriptionPlans.${index}.name`}
              label={`Plan ${index + 1} Name`}
              placeholder="Plan Name"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name={`subscriptionPlans.${index}.duration`}
              label={`Plan ${index + 1} Duration (days)`}
              placeholder="Duration (days)"
              type="number"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name={`subscriptionPlans.${index}.price`}
              label={`Plan ${index + 1} Price`}
              placeholder="Price"
              type="number"
            />
            <button type="button" onClick={() => remove(index)}>
              Remove Plan
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ name: "", duration: 0, price: 0 })}
        >
          Add Plan
        </button>

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default GymForm;
