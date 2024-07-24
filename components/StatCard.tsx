import clsx from "clsx";
import Image from "next/image";

type StatCardProps = {
  type: "appointments" | "pending" | "cancelled";
  count: number;
  label: string;
  icon: string;
  onClick: () => void; // Handle click
  isActive: boolean; // Highlight active card
};

export const StatCard = ({
  count = 0,
  label,
  icon,
  type,
  onClick,
  isActive,
}: StatCardProps) => {
  return (
    <div
      className={clsx("stat-card cursor-pointer", {
        "bg-appointments": type === "appointments",
        "bg-pending": type === "pending",
        "bg-cancelled": type === "cancelled",
        "active-card": isActive,
      })}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          height={32}
          width={32}
          alt="appointments"
          className="size-8 w-fit"
        />
        <h2 className="text-32-bold text-white">{count}</h2>
      </div>

      <p className="text-14-regular">{label}</p>
    </div>
  );
};
