import AdminForm from "@/components/forms/admin/AdminForm";
import AdminLoginForm from "@/components/forms/admin/AdminLoginForm";
import GymForm from "@/components/forms/GymForm";
import MemberLoginForm from "@/components/forms/member/MemberLoginForm";
import { NavigationMenuDemo } from "@/components/MainMenu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <section className="flex-1 overflow-y-auto antialiased">
        <div className="absolute inset-0 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)]"></div>
        <div className="container h-full flex flex-col">
          <div className="flex justify-between items-center p-5">
            <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="patient"
              className="h-6 md:h-12 w-auto"
            />
            <NavigationMenuDemo />
          </div>

          <main className="flex-1 flex flex-col justify-center items-center px-4">
            <div className="max-w-[496px] w-full text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Streamline Your Gym Management
              </h1>
              <p className="text-sm sm:text-base mb-6">
                Track memberships, schedule classes, and optimize operations
                with our comprehensive gym management solution.
              </p>
              <Link
                href="/register-gym"
                className="inline-block bg-blue-500 text-white px-6 py-3 rounded-md text-sm sm:text-base"
              >
                Get Started →
              </Link>
            </div>
          </main>

          <div className="text-sm flex justify-between p-5">
            <p className="text-dark-600">© 2024 CarePluse</p>
            <Link href="/login-admin" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <div className="hidden lg:block w-full lg:w-[30%] h-screen relative">
        <Image
          src="/assets/images/onboard3.jpg"
          layout="fill"
          objectFit="cover"
          alt="patient"
        />
      </div>
    </div>
  );
}
