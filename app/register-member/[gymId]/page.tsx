"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MemberForm } from "@/components/forms/member/MemberForm";

const Register = ({ params: { gymId } }: { params: { gymId: string } }) => {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-12 h-10 w-fit"
          />

          <MemberForm gymId={gymId} />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 CarePluse
            </p>
            {/* <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link> */}
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="onboarding"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
