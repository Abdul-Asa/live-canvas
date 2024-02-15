import { cn } from "@/lib/utils";
import {
  HMSPeer,
  selectIsPeerVideoEnabled,
  useHMSStore,
  useVideo,
} from "@100mslive/react-sdk";
import { motion } from "framer-motion";

//refactor redundant props
const Cursor = ({
  nickName,
  color,
  isClient,
  cursor,
  isMobile,
  peer,
}: {
  nickName: string;
  color: string;
  isClient?: boolean;
  cursor: { x: number; y: number };
  isMobile: boolean;
  peer?: HMSPeer;
}) => {
  const { x, y } = cursor;
  const videoEnabled = useHMSStore(selectIsPeerVideoEnabled(peer?.id));
  const { videoRef } = useVideo({
    trackId: peer?.videoTrack,
  });

  if (isClient) {
    return isMobile ? (
      <motion.div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          translateX: x,
          translateY: y,
        }}
      >
        <svg width="18" height="24" viewBox="0 0 18 24">
          <circle
            cx="9"
            cy="12"
            r="8"
            stroke="black"
            strokeWidth="1"
            fill={color}
          />
          <circle
            cx="9"
            cy="12"
            r="4"
            stroke="black"
            strokeWidth="1"
            fill="white"
          />
        </svg>
        {videoEnabled && (
          <div className="absolute top-10 -left-5 border w-40 h-40 flex items-center justify-center bg-gray-300 rounded-full">
            <video
              className="object-cover w-full h-full rounded-full"
              ref={videoRef}
              autoPlay
              muted
              playsInline
            ></video>
          </div>
        )}
      </motion.div>
    ) : (
      <motion.div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          translateX: x,
          translateY: y,
        }}
      >
        <span
          className="absolute border-2 p-1 border-white select-none text-white pointer-events-none"
          style={{
            backgroundColor: color,
          }}
        >
          <p className="max-w-40 truncate p-1">
            {nickName ? nickName : "Anonymous"}
          </p>
        </span>
        {videoEnabled && (
          <div className="absolute top-10 -left-5 border w-40 h-40 flex items-center justify-center bg-gray-300 rounded-full">
            <video
              className="object-cover w-full h-full rounded-full"
              ref={videoRef}
              autoPlay
              muted
              playsInline
            ></video>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      style={{
        position: "absolute",
        top: "0",
        left: "0",
      }}
      initial={cursor}
      animate={cursor}
      transition={{
        type: "spring",
        damping: 30,
        mass: 0.8,
        stiffness: 350,
      }}
    >
      {isMobile ? (
        <svg width="18" height="24" viewBox="0 0 18 24">
          <circle
            cx="9"
            cy="12"
            r="8"
            stroke="black"
            strokeWidth="1"
            fill={color}
          />
          <circle
            cx="9"
            cy="12"
            r="4"
            stroke="black"
            strokeWidth="1"
            fill="white"
          />
        </svg>
      ) : (
        <svg
          width="18"
          height="24"
          viewBox="0 0 18 24"
          fill="none"
          style={{
            color: color,
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.717 2.22918L15.9831 15.8743C16.5994 16.5083 16.1503 17.5714 15.2661 17.5714H9.35976C8.59988 17.5714 7.86831 17.8598 7.3128 18.3783L2.68232 22.7C2.0431 23.2966 1 22.8434 1 21.969V2.92626C1 2.02855 2.09122 1.58553 2.717 2.22918Z"
            fill={color}
            stroke={"white"}
            strokeWidth="1"
          />
        </svg>
      )}
      <div
        style={{
          backgroundColor: color,
        }}
        className={cn(
          "absolute border-2 p-1 border-white text-white select-none pointer-events-none ",
          isMobile ? "-translate-x-1/2" : "translate-x-4"
        )}
      >
        <p className="max-w-40 truncate p-1">{nickName ? nickName : "Guest"}</p>
      </div>
      {videoEnabled && (
        <div className="absolute top-10 -left-5 border w-40 h-40 flex items-center justify-center bg-gray-300 rounded-full">
          <video
            className="object-cover w-full h-full rounded-full"
            ref={videoRef}
            autoPlay
            muted
            playsInline
          ></video>
        </div>
      )}
    </motion.div>
  );
};

export default Cursor;
