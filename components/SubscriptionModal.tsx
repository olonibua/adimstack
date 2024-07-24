import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SubscriptionForm } from "./forms/SubscriptionForm";

export const SubscriptionModal = ({
  memberId,
  subscriptionId,
  type,
  title,
  description,
  isDisabled,
  onSubscriptionUpdate,
}: {
  memberId: string;
  subscriptionId: string;
  type: "pause" | "resume";
  title: string;
  description: string;
  isDisabled: boolean;
  onSubscriptionUpdate: () => void
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`capitalize border mx-1 border-gray-800 ${
            type === "pause" ? "text-orange-500" : "text-green-500"
          }`}
          disabled={isDisabled}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <SubscriptionForm
          memberId={memberId}
          subscriptionId={subscriptionId}
          type={type}
          setOpen={setOpen}
          onSubscriptionUpdate={onSubscriptionUpdate}
        />
      </DialogContent>
    </Dialog>
  );
};