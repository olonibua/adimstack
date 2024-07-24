import { MemberForm } from "@/components/forms/member/MemberForm";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

// import { getPatient, getUser } from "@/lib/actions/patient.actions";
// import MemberForm from "@/components/forms/MemberForm";

const Register = ({ params: { memberId } }: SearchParamProps) => {
  const member: any = 0;

//   const patient = await getPatient(memberId);

//   if (patient) redirect(`/patients/${memberId}/new-appointment`);

  return (
    <div className="flex h-screen max-h-screen">

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <MemberForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 CarePluse
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
};

export default Register;
