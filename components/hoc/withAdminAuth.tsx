"use client"; // Ensuring this HOC is a Client Component

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../LoadingSpinner";

const withAdminAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("adminToken");
      if (token) {
        setIsAuthenticated(true);
      } else {
        router.push("/admin/login");
      }
    }, []);

    if (!isAuthenticated) {
      return <LoadingSpinner />;
    }

    return <WrappedComponent {...props} />
  };
};

export default withAdminAuth;
