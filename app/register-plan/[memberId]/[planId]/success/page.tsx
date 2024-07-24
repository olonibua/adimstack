'use client'
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { getGym } from "@/lib/actions/gym.action";
import { useEffect } from "react";
import { getMember } from "@/lib/actions/member.actions";

const RequestSuccess = ({
  params: { memberId, planId },
}: {
  params: { memberId: any; planId: string };
}) => {

  return (
    <div className=" flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        {/* welcome {memberDetails.name} */}
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>
        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500"> plan</span> has been
            successfully registered!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
          <Link href={`/members-view/${memberId}`}
          >
            Proceed to dashboard
          </Link>
        </section>
        <section className="request-details">
          <p>Requested appointment details: </p>
          {/* <div className="flex items-center gap-3">
            <Image
              src={doctor?.image!}
              alt="doctor"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div> */}
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            {/* <p> {formatDateTime(appointment.schedule).dateTime}</p> */}
          </div>
        </section>
        <Button variant="outline" className="shad-primary-btn" asChild>
          {/* <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link> */}
        </Button>
        <p className="copyright">© 2024 CarePluse</p>
      </div>
    </div>
  );
};

export default RequestSuccess;
