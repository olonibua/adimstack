"use client";

import { ColumnDef } from "@tanstack/react-table";
import { calculateDaysLeft, capitalizeFirstLetter, formatDateTime } from "@/lib/utils";
import { Button } from "../ui/button";
import { SubscriptionModal } from "../SubscriptionModal";

export const getColumns = (onSubscriptionUpdate: () => void): ColumnDef<any>[] => [
  {
    header: "#",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const member = row.original;
      return (
        <p className="text-14-medium">{capitalizeFirstLetter(member.name)}</p>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const member = row.original;
      let statusColor = "";

      switch (member.status) {
        case "active":
          statusColor = "text-green-500";
          break;
        case "paused":
          statusColor = "text-orange-500";
          break;
        case "inactive":
          statusColor = "text-red-500";
          break;
        default:
          statusColor = "text-gray-500";
      }

      return (
        <p className={`text-14-medium ${statusColor}`}>
          {member.status}
          {member.status === "paused" && member.pauseDate && (
            <span className="text-12-italic text-gray-600">
              {" "}
              on {formatDateTime(member.pauseDate).dateTime}
            </span>
          )}
        </p>
      );
    },
  },
  {
    accessorKey: "planName",
    header: "Plan Name",
    cell: ({ row }) => {
      const member = row.original;
      return (
        <p className="text-14-medium">{capitalizeFirstLetter(member.planName)}</p>
      );
    },
  },
  {
    accessorKey: "planDuration",
    header: "Plan Duration",
    cell: ({ row }) => {
      const member = row.original;
      const daysLeft = calculateDaysLeft(
        member.endDate,
        member.pauseDate,
        member.resumeDate
      );
      let daysLeftColor = "text-green-500";

      if (daysLeft <= 5) {
        daysLeftColor = "text-red-500";
      } else if (daysLeft <= 10) {
        daysLeftColor = "text-orange-500";
      }

      return (
        <p className="text-14-medium">
          {member.planDuration} days{" "}
          <span className={`${daysLeftColor} font-bold`}>
            ({daysLeft} days left)
          </span>
          {member.status === "paused" && (
            <span className="text-12-italic text-gray-600"> (Paused)</span>
          )}
        </p>
      );
    },
  },
  {
    accessorKey: "planPrice",
    header: "Plan Price",
    cell: ({ row }) => {
      const member = row.original;
      return (
        <p className="text-14-medium">₦{member.planPrice.toLocaleString()}</p>
      );
    },
  },
  {
    accessorKey: "subscriptionTime",
    header: "Subscription Start Time",
    cell: ({ row }) => {
      const member = row.original;
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(member.startDate).dateTime}
        </p>
      );
    },
  },
  {
    accessorKey: "subscriptionEndTime",
    header: "Subscription End Time",
    cell: ({ row }) => {
      const member = row.original;
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(member.endDate).dateTime}
        </p>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const member = row.original;

      const isPauseDisabled = member.status === "paused";
      const isResumeDisabled = member.status === "active";

      return (
        <div className="flex gap-1">
          <SubscriptionModal
            memberId={member.memberId}
            subscriptionId={member.subscriptionId}
            type="pause"
            title="Pause Subscription"
            description="Are you sure you want to pause your subscription?"
            isDisabled={isPauseDisabled}
            onSubscriptionUpdate={onSubscriptionUpdate}
          />
          <SubscriptionModal
            memberId={member.memberId}
            subscriptionId={member.subscriptionId}
            type="resume"
            title="Resume Subscription"
            description="Are you sure you want to resume your subscription?"
            isDisabled={isResumeDisabled}
            onSubscriptionUpdate={onSubscriptionUpdate}
          />
        </div>
      );
    },
  },
];

// Helper function to calculate days left



