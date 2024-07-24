import { capitalizeFirstLetter } from "@/lib/utils";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

// type PlanProps = {
//   type: "weekly" | "monthly" | "quarterly" | "yearly";
//   count: number;
//   label: string;
//   icon: string;
// };



// export const Plan = ({ count = 0, label, icon, type }: PlanProps) => {
//   return (
//     <div
//       className={clsx("plan-card", {
//         "bg-weekly": type === "weekly",
//         "bg-monthly": type === "monthly",
//         "bg-quarterly": type === "quarterly",
//         "bg-yearly": type === "yearly",
//       })}
//     >
//       <div className="flex items-center gap-4">
//         <Image
//           src={icon}
//           height={32}
//           width={32}
//           alt="appointments"
//           className="size-8 w-fit"
//         />
//         <h2 className="text-32-bold text-white">{count}</h2>
//       </div>

//       <p className="text-14-regular">{label}</p>
//     </div>
//   );
// };

type PlanProps = {
  type: "weekly" | "monthly" | "quarterly" | "yearly";
  name: string;
  memberId: any;
  duration: number;
  price: number;
  planId: string; // Add planId to props
};

export const Plan = ({ name,memberId, duration, price, type, planId }: PlanProps) => {
  return (
    <Link href={`/register-plan/${memberId}/${planId}`}>
      <div
        className={clsx("plan-card cursor-pointer", {
          "bg-weekly": type === "weekly",
          "bg-monthly": type === "monthly",
          "bg-quarterly": type === "quarterly",
          "bg-yearly": type === "yearly",
        })}
      >
        <div className="flex items-center gap-4">
          <Image
            src={"/assets/icons/appointments.svg"}
            height={32}
            width={32}
            alt="appointments"
            className="size-8 w-fit"
          />
          <h2 className="text-32-bold">{capitalizeFirstLetter(name)}</h2>
        </div>
        <p className="text-14-regular text-gray-300">
          Duration:{" "}
          <span className="text-14-regular text-white font-semibold">
            {duration} days
          </span>
        </p>
        <p className="text-14-regular text-gray-300">
          Price:{" "}
          <span className="text-14-regular font-semibold text-white">
            ₦{(price).toLocaleString()}
          </span>
        </p>
      </div>
    </Link>
  );
};