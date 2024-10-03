"use client"; // Mark this component as client-side

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const SessionProviderWrapper = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviderWrapper;
