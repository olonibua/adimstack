import { useForm } from "react-hook-form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { z } from "zod";
import { Form } from "../ui/form";

// import { addSubscriptionPlan, editSubscriptionPlan, deleteSubscriptionPlan } from "@/lib/actions/subscription.actions";
import {
  addSubscriptionPlan,
  deleteSubscriptionPlan,
  editSubscriptionPlan,
} from "@/lib/actions/gym.action";
import { getPlanSchema } from "@/lib/validation";
import LoadingSpinner from "../LoadingSpinner";

export const PlanForm = ({
  gymId,
  planId,
  type,
  setOpen,
  onPlanUpdate,
}: {
  gymId: string;
  planId?: string;
  type: "add" | "edit" | "delete";
  setOpen: Dispatch<SetStateAction<boolean>>;
  onPlanUpdate: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const PlanFormValidation = getPlanSchema(type);

  
  const form = useForm<z.infer<typeof PlanFormValidation>>({
    resolver: zodResolver(PlanFormValidation),
    defaultValues: {
      name: "",
      price: "",
      duration: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof PlanFormValidation>
  ) => {
    setIsLoading(true);

    try {
      if (type === "add") {
        //@ts-ignore
        await addSubscriptionPlan(gymId, values);
      } else if (type === "edit") {
        //@ts-ignore
        await editSubscriptionPlan(gymId, planId!, values);
      } else {
        await deleteSubscriptionPlan(gymId, planId!);
      }
      setOpen(false);
      form.reset();
      onPlanUpdate();
    } catch (error) {
      console.error("Error handling plan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  let buttonLabel;
  switch (type) {
    case "add":
      buttonLabel = "Add Plan";
      break;
    case "edit":
      buttonLabel = "Edit Plan";
      break;
    case "delete":
      buttonLabel = "Delete Plan";
      break;
    default:
      buttonLabel = "Submit";
  }

  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        {(type === "add" || type === "edit") && (
          <>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="name"
              label="Plan Name"
              placeholder="Enter plan name"
            />
            <CustomFormField
              fieldType={FormFieldType.NUMBER}
              control={form.control}
              name="price"
              label="Price"
              placeholder="Enter plan price"
            />
            <CustomFormField
              fieldType={FormFieldType.NUMBER}
              control={form.control}
              name="duration"
              label="Duration (in days)"
              placeholder="Enter plan duration"
            />
          </>
        )}
        {type === "delete" && <p>Are you sure you want to delete this plan?</p>}
        <SubmitButton isLoading={isLoading} className="w-full">
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};
