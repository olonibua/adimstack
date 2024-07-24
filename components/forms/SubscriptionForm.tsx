import { useForm } from "react-hook-form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { z } from "zod";
import { Form } from "../ui/form";

import { pauseSubscription, resumeSubscription } from "@/lib/actions/subscription.actions";
import { getSubscriptionSchema } from "@/lib/validation";
import LoadingSpinner from "../LoadingSpinner";

export const SubscriptionForm = ({
  memberId,
  subscriptionId,
  type,
  setOpen,
  onSubscriptionUpdate,
}: {
  memberId: string;
  subscriptionId: string;
  type: "pause" | "resume";
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubscriptionUpdate: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const SubscriptionFormValidation = getSubscriptionSchema(type);

  const form = useForm<z.infer<typeof SubscriptionFormValidation>>({
    resolver: zodResolver(SubscriptionFormValidation),
    defaultValues: {
      reason: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof SubscriptionFormValidation>
  ) => {
    setIsLoading(true);

    try {
      if (type === "pause") {
        //@ts-ignore
        await pauseSubscription(subscriptionId, values.reason);
      } else {
        await resumeSubscription(subscriptionId);
      }
      setOpen(false);
      form.reset();
      onSubscriptionUpdate();
    } catch (error) {
      console.error("Error handling subscription:", error);
    } finally {
      setIsLoading(false);
    }
  };

  let buttonLabel;
  switch (type) {
    case "pause":
      buttonLabel = "Pause Subscription";
      break;
    case "resume":
      buttonLabel = "Resume Subscription";
      break;
    default:
      buttonLabel = "Submit";
  }

  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        {type === "pause" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="reason"
            label="Reason for pausing"
            placeholder="Please provide a reason"
          />
        )}
        <SubmitButton isLoading={isLoading} className="w-full">
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};
