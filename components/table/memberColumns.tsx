"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { Doctors } from "@/constants";
import { calculateDaysLeft, capitalizeFirstLetter, formatDateTime } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";
import { StatusBadge } from "../StatusBadge";
import { AppointmentModal } from "../AppointmentModal";

// import { AppointmentModal } from "../AppointmentModal";
// import { StatusBadge } from "../StatusBadge";



export const memberColumns: ColumnDef<any>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return <p className="text-14-medium ">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const member = row.original;
      return <p className="text-14-medium ">{member.name}</p>;
    },
  },
  {
    accessorKey: "planName",
    header: "Plan Name",
    cell: ({ row }) => {
      const member = row.original;
      return (
        <p className="text-14-medium">
          {capitalizeFirstLetter(member.planName)}
        </p>
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
  // {
  //   accessorKey: "active",
  //   header: "Active",
  //   cell: ({ row }) => {
  //     const member = row.original;
  //     return <p className="text-14-medium ">{member.active ? "Yes" : "No"}</p>;
  //   },
  // },
];
