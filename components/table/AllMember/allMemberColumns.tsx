"use client";

import {
  formatDateTime,
  formatDateTimeForDayAndMonth,
  formatBirthday,
  capitalizeFirstLetter,
} from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake } from "@fortawesome/free-solid-svg-icons";

export const allMemberColumns: ColumnDef<any>[] = [
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
      return (
        <p className="text-14-medium ">{capitalizeFirstLetter(member.name)}</p>
      );
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      const member = row.original;
      return <p className="text-14-medium ">{member.gender}</p>;
    },
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
      const member = row.original;
      return <p className="text-14-medium ">{member.address}</p>;
    },
  },
  {
    accessorKey: "contact address",
    header: "Contact address",
    cell: ({ row }) => {
      const member = row.original;
      return <p className="text-14-medium ">{member.email}</p>;
    },
  },
  {
  accessorKey: "birthday",
  header: "Birthday",
  cell: ({ row }) => {
    const member = row.original;
    return (
      <div className="flex items-center bg-blue-100 p-2 rounded-md shadow-md">
        <FontAwesomeIcon
          icon={faBirthdayCake}
          className="text-purple-500 text-xl mr-3"
        />
        <p className="text-base font-semibold text-gray-800">
          {formatBirthday(member.birthDate)}
        </p>
      </div>
    );
  },
},
  {
    accessorKey: "member since",
    header: "Member since",
    cell: ({ row }) => {
      const member = row.original;
      return (
        <p className="text-14-medium ">
          {formatDateTime(member.$createdAt).dateTime}
        </p>
      );
    },
  },

  //   {
  //     accessorKey: "status",
  //     header: "Status",
  //     cell: ({ row }) => {
  //       const member = row.original;
  //       let statusColor = "";

  //       switch (member.status) {
  //         case "active":
  //           statusColor = "text-green-500";
  //           break;
  //         case "paused":
  //           statusColor = "text-orange-500";
  //           break;
  //         case "inactive":
  //           statusColor = "text-red-500";
  //           break;
  //         default:
  //           statusColor = "text-gray-500";
  //       }

  //       return <p className={`text-14-medium ${statusColor}`}>{member.status}</p>;
  //     },
  //   },

  //   {
  //     accessorKey: "active",
  //     header: "Active",
  //     cell: ({ row }) => {
  //       const member = row.original;
  //       return <p className="text-14-medium ">{member.active ? "Yes" : "No"}</p>;
  //     },
  //   },
];
