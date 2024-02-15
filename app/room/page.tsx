import { HMSRoomProvider } from "@/components/providers/100ms-provider";
import { Room } from "@/components/providers/liveblocks-room";
import Whiteboard from "@/components/whiteboard";

export default function LiveRoom() {
  return (
    <Room>
      <HMSRoomProvider>
        <Whiteboard />
      </HMSRoomProvider>
    </Room>
  );
}
