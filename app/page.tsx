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
    <div className="flex h-screen max-h-screen ">
      <section className="remove-scrollbar container  flex-1 overflow-y-auto">
        <div className="mx-auto flex justify-between items-center p-5">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className=" h-12 w-fit"
          />

          <NavigationMenuDemo />
        </div>
        <div className="sub-container max-w-[496px]">
          <main className="text-center mx-auto py-12">
            <div className=" items-center">
              <div className="">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Streamline Your Gym Management
                </h1>
                <p className="text-14-regular mb-6">
                  Track memberships, schedule classes, and optimize operations
                  with our comprehensive gym management solution.
                </p>
                {/* Elevate your fitness business to new heights. */}
                <Link
                  href="/register-gym"
                  className="bg-blue-500 text-white px-6 py-3 rounded-md text-14-regular"
                >
                  Get Started →
                </Link>
              </div>
            </div>
          </main>

          <div className="text-14-regular mt-40 sm:mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 CarePluse
            </p>
            <Link href="/login-admin" className="text-green-500">
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
        className="side-img max-w-[30%]"
      />
    </div>
  );
}

// import { NavigationMenuDemo } from "@/components/MainMenu";
// import Head from "next/head";
// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="h-screen max-h-screen bg-navy-900 text-white">
//       <Head>
//         <title>Business Banking Solutions</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <header className="headerr mx-auto flex justify-between items-center p-5">
//         <div className="flex items-center">
//           <Image
//             src="/assets/icons/logo-full.svg"
//             height={1000}
//             width={1000}
//             alt="patient"
//             className=" h-10 w-fit"
//           />
//           {/* <span className="ml-2 text-xl font-bold">Moniepoint</span> */}
//         </div>
//         <NavigationMenuDemo />
//       </header>

      // <main className="container mx-auto px-4 py-12">
      //   <div className="flex flex-col md:flex-row items-center">
      //     <div className="md:w-1/2">
      //       <h1 className="text-4xl md:text-6xl font-bold mb-4">
      //         Simple solutions to power your business
      //       </h1>
      //       <p className="text-xl mb-6">
      //         Collect payments, access loans and manage operations with a
      //         business banking solution that meets all your needs.
      //       </p>
      //       <button className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg">
      //         Open an Account →
      //       </button>
      //     </div>
      //     <div className="md:w-1/2 mt-8 md:mt-0">
      //       <div className="relative h-80 w-80">
      //         {/* <Image
      //           src="/business-image.jpg"
      //           alt="Business solutions"
      //           layout="fill"
      //           objectFit="cover"
      //           className="rounded-lg"
      //         /> */}
      //       </div>
      //     </div>
      //   </div>
      // </main>
//     </div>
//   );
// }