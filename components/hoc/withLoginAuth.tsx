"use client";

import React, { useEffect, useState, ComponentType } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../LoadingSpinner";

function getDisplayName(WrappedComponent: ComponentType<any>) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

const withLoginAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
) => {
  const WithLoginAuth: React.FC<P> = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("memberToken");
      if (token) {
        setIsAuthenticated(true);
      } else {
        router.push("/member/login");
      }
    }, [router]); // Added router to the dependency array

    if (!isAuthenticated) {
      return (
        <div>
          <LoadingSpinner />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  WithLoginAuth.displayName = `WithLoginAuth(${getDisplayName(
    WrappedComponent
  )})`;
  return WithLoginAuth;
};

export default withLoginAuth;
