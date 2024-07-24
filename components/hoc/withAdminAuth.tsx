"use client";

import React, { useEffect, useState, ComponentType } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../LoadingSpinner";

function getDisplayName(WrappedComponent: ComponentType<any>) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

const withAdminAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
) => {
  const WithAdminAuth: React.FC<P> = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("adminToken");
      if (token) {
        setIsAuthenticated(true);
      } else {
        router.push("/admin/login");
      }
    }, [router]);

    if (!isAuthenticated) {
      return <LoadingSpinner />;
    }

    return <WrappedComponent {...props} />;
  };

  WithAdminAuth.displayName = `WithAdminAuth(${getDisplayName(
    WrappedComponent
  )})`;
  return WithAdminAuth;
};

export default withAdminAuth;
