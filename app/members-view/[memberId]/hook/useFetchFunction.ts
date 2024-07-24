// import { getGym } from "@/lib/actions/gym.action";
// import { fetchUserSubscription, getMember } from "@/lib/actions/member.actions";
// import { useEffect, useState } from "react";

// export const useFetchFunction = (memberId: string, setMember: any, member: any, setGym: any) => {

//   useEffect(() => {
//     const getSubscription = async () => {
//       try {
//         const sub: any = await fetchUserSubscription(memberId);
//         if (sub) {
//           setSubscription(sub);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getSubscription();
//   }, [memberId]);

//   useEffect(() => {
//     const fetchMember = async () => {
//       try {
//         const fetchedMember: any = await getMember(memberId);
//         if (fetchedMember) {
//           setMember(fetchedMember);
//         }
//       } catch (error) {
//         console.error("Error fetching member:", error);
//       }
//     };

//     fetchMember();
//   }, [memberId]);

//   useEffect(() => {
//     const fetchGym = async () => {
//       if (member?.gymId) {
//         try {
//           const gymData: any = await getGym(member.gymId);
//           if (gymData) {
//             setGym(gymData);
//           }
//         } catch (error) {
//           console.error("Error fetching gym:", error);
//         }
//       }
//     };

//     fetchGym();
//   }, [member?.gymId]);
// };