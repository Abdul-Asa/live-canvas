"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const OnlineChat = () => {
  const [trigger, setTrigger] = useState(false);

  return (
    <div
      className={cn(
        trigger ? "max-h-[300px] max-w-[300px]" : "max-h-[74px]",
        "hidden lg:block absolute top-[4%] items-center left-10 z-1 p-4 overflow-hidden transition-all duration-1000",
        "text-black bg-secondary-light  border-2 rounded border-gray-700  gap-4",
        "scale-75 lg:scale-100 2xl:scale-150"
      )}
    >
      Chat
      <Button onClick={() => setTrigger((prev) => !prev)}>Open</Button>
      <div className="w-40 h-40"></div>
    </div>
  );
};

export default OnlineChat;
