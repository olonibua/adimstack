"use client"; // Ensuring this HOC is a Client Component

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../LoadingSpinner";

const withLoginAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("memberToken");
      if (token) {
        setIsAuthenticated(true);
      } else {
        router.push("/member/login");
      }
    }, []);

    if (!isAuthenticated) {
      return (
        <div>
          <LoadingSpinner />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withLoginAuth;
