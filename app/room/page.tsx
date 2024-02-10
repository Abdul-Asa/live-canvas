import { Room } from "@/components/providers/liveblocks-room";
import Whiteboard from "@/components/whiteboard";

export default function LiveRoom() {
  return (
    <Room>
      <Whiteboard />
    </Room>
  );
}
