"use client";
import { Provider as JotaiProvider } from "jotai";
import { useAtomsDebugValue } from "jotai-devtools";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const DebugAtoms = () => {
    useAtomsDebugValue();
    return null;
  };
  return (
    <JotaiProvider>
      <DebugAtoms />
      {children}
    </JotaiProvider>
  );
};
