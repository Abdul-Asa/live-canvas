import { useOthersMapped } from "@/liveblocks.config";
import Cursor from "./cursor";
import { selectRemotePeers, useHMSStore } from "@100mslive/react-sdk";

const OtherCursors = () => {
  const cursors = useOthersMapped((other) => other.presence);
  const remotePeers = useHMSStore(selectRemotePeers);

  return cursors.map(([id, { cursor, nickName, color, isMobile }]) => {
    if (cursor == null) {
      return null;
    }

    const peer = remotePeers.find((p) => p.name === nickName);
    if (!peer) return null;
    return (
      <Cursor
        key={id}
        nickName={nickName}
        color={color}
        cursor={cursor}
        isMobile={isMobile}
        peer={peer}
      />
    );
  });
};

export default OtherCursors;
