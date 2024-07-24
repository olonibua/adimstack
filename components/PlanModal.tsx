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
import { PlanForm } from "./forms/PlanForm";
// import { PlanForm } from "./forms/PlanForm";

export const PlanModal = ({
  gymId,
  planId,
  type,
  title,
  description,
  isDisabled,
  onPlanUpdate,
}: {
  gymId: string;
  planId?: string;
  type: "add" | "edit" | "delete";
  title: string;
  description: string;
  isDisabled?: boolean;
  onPlanUpdate: () => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`capitalize border mx-1 border-gray-800 ${
            type === "delete" ? "text-red-500" : "text-blue-500"
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
        

        <PlanForm
          gymId={gymId}
          planId={planId}
          type={type}
          setOpen={setOpen}
          onPlanUpdate={onPlanUpdate}
        />
      </DialogContent>
    </Dialog>
  );
};
