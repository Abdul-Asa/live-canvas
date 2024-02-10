"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const UserList = () => {
  const [trigger, setTrigger] = useState(true);

  return (
    <div
      className={cn(
        trigger ? "max-h-[300px] max-w-[300px]" : "max-h-14 max-w-52",
        "hidden md:block absolute bottom-6 items-center left-10 z-1 px-4 pb-4 overflow-hidden transition-all duration-1000",
        "text-black bg-secondary-light  border-2 rounded border-gray-700  gap-4"
      )}
    >
      Hello
      <Button onClick={() => setTrigger((prev) => !prev)}>Open</Button>
    </div>
  );
};

export default UserList;
