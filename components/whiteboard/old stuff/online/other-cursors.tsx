import { useOther, useOthersMapped } from "@/liveblocks.config";
import Cursor from "../../cursor";

const OtherCursors = () => {
  const cursors = useOthersMapped((other) => other.presence);

  return cursors.map(([id, { cursor, nickName, color, isMobile }]) => {
    if (cursor == null) {
      return null;
    }
    return (
      <Cursor
        key={id}
        cursor={cursor}
        color={color}
        nickName={nickName}
        isMobile={isMobile}
      />
    );
  });
};

export default OtherCursors;
