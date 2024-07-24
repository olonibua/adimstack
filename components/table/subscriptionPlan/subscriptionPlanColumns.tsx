"use client";

import { ColumnDef } from "@tanstack/react-table";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PlanModal } from "@/components/PlanModal";

export const subscriptionPlanColumns = (
  gymId: any,
  onSubscriptionUpdate: () => void,
): ColumnDef<any>[] => [
  {
    header: "#",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const plan = JSON.parse(row.original);
      return (
        <p className="text-14-medium">
          {plan.name ? capitalizeFirstLetter(plan.name) : "No name available"}
        </p>
      );
    },
  },
  {
    accessorKey: "duration",
    header: "Duration (days)",
    cell: ({ row }) => {
      const plan = JSON.parse(row.original);
      return <p className="text-14-medium">{plan.duration || "N/A"}</p>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const plan = JSON.parse(row.original);
      return (
        <p className="text-14-medium">
          ₦{plan.price.toLocaleString() || "N/A"}
        </p>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const plan = JSON.parse(row.original);

      return (
        <div className="flex gap-1">
          
          <PlanModal
            gymId={gymId}
            planId={plan.planId}
            type="edit"
            title="Edit Plan"
            description="Modify the details of the plan."
            onPlanUpdate={onSubscriptionUpdate}
          />
          <PlanModal
            gymId={gymId}
            planId={plan.planId}
            type="delete"
            title="Delete Plan"
            description="Are you sure you want to delete this plan?"
            onPlanUpdate={onSubscriptionUpdate}
          />
        </div>
      );
    },
  },
  {
    id: "Add Plan",
    header: () => (
      <PlanModal
        gymId={gymId}
        type="add"
        title="Add Plan"
        description="Fill out the details to add a new plan."
        onPlanUpdate={onSubscriptionUpdate}
      />
    ),
  },
];

