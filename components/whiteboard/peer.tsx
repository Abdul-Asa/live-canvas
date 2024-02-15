import { useVideo } from "@100mslive/react-sdk";
import { motion } from "framer-motion";

function Peer({ peer, cursor }: { peer: any; cursor: any }) {
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });
  return (
    <motion.div
      className="absolute top-10 border p-4 bg-black w-40 h-40 rounded-full text-white"
      animate={cursor}
    >
      <video
        ref={videoRef}
        className={`peer-video ${peer.isLocal ? "local" : ""}`}
        autoPlay
        muted
        playsInline
      />
      <div className="peer-name">
        {peer.name} {peer.isLocal ? "(You)" : ""}
      </div>
    </motion.div>
  );
}

export default Peer;
