// "use client";
// import {
//   canvasAtom,
//   canvasRefAtom,
//   cursorAtom,
//   selectedLayerAtom,
//   userAtom,
// } from "@/lib/jotai-state";
// import { CanvasLayer, CanvasLayerType, Polaroid, Sticker } from "@/lib/type";
// import { cn } from "@/lib/utils";
// import { useMutation, useMyPresence } from "@/liveblocks.config";
// import {
//   PanInfo,
//   motion,
//   useDragControls,
//   useMotionValue,
// } from "framer-motion";
// import { useAtom, useAtomValue } from "jotai";
// import Image from "next/image";
// import React, { PointerEventHandler, useEffect, useRef } from "react";
// import { Button } from "../../ui/button";
// import { X } from "lucide-react";

// const CanvasItem: React.FC<{ canvasLayer: CanvasLayer }> = ({
//   canvasLayer,
// }) => {
//   if (canvasLayer.type === CanvasLayerType.STICKER) {
//     return <StickerComponent sticker={canvasLayer} />;
//   } else if (canvasLayer.type === CanvasLayerType.POLAROID) {
//     return <PolaroidComponent polaroid={canvasLayer} />;
//   } else {
//     return null; // or a default component
//   }
// };

// const StickerComponent: React.FC<{ sticker: Sticker }> = ({ sticker }) => {
//   const { src, x, y, id, width, height } = sticker;
//   const stickerRef = useRef<HTMLDivElement>(null);
//   const canvasRef = useAtomValue(canvasRefAtom);
//   const [selected, setSelected] = useAtom(selectedLayerAtom);
//   const [canvasList, updateCanvasList] = useAtom(canvasAtom);
//   const cursor = useAtomValue(cursorAtom);
//   const { color } = useAtomValue(userAtom);

//   const handleDrag = (e: PointerEvent, info: PanInfo) => {
//     e.stopPropagation();
//     const stickerRect = stickerRef.current?.getBoundingClientRect();
//     if (!stickerRect) return;
//     const offsetX = e.clientX - stickerRect.left;
//     const offsetY = e.clientY - stickerRect.top;

//     updateCanvasList((prev) => {
//       const oldMap = prev.get(id);
//       if (!oldMap) return prev;
//       const updatedSticker = {
//         ...oldMap,
//         x: cursor.x - offsetX,
//         y: cursor.y - offsetY,
//       };
//       prev.set(id, updatedSticker);
//       return new Map(prev);
//     });
//   };

//   const handleSelect = (e: React.PointerEvent<HTMLDivElement>) => {
//     e.stopPropagation();
//     setSelected(id);
//     // updateMyPresence({ selectedLayer: id });
//   };

//   return (
//     <motion.div
//       ref={stickerRef}
//       className={cn(selected === id && "border box-border border-red-500")}
//       drag
//       dragConstraints={canvasRef !== null ? canvasRef : false}
//       dragMomentum={false}
//       onDrag={handleDrag}
//       onPointerDown={handleSelect}
//       style={{
//         x,
//         y,
//         position: "absolute",
//         cursor: "grab",
//         zIndex: selected === id ? 5 : 4,
//       }}
//       onTouchStart={(e) => e.stopPropagation()}
//       // onDoubleClick={handleDoubleClick}
//       // onContextMenu={handleRightClick}
//     >
//       {selected === id && (
//         <div
//           className="absolute top-0 right-0 -translate-y-full flex w-full justify-between select-none"
//           style={{
//             background: color,
//           }}
//         >
//           <p className="text-white truncate w-40">{id}</p>
//           <Button
//             tooltip="close"
//             variant={"ghost"}
//             onClick={() => {
//               updateCanvasList((prev) => {
//                 prev.delete(id);
//                 return new Map(prev);
//               });
//             }}
//           >
//             <X />
//           </Button>
//         </div>
//       )}
//       {src.endsWith(".json") ? (
//         <lottie-player
//           autoplay
//           loop
//           mode="normal"
//           src={src}
//           style={{ width, height }}
//         ></lottie-player>
//       ) : (
//         <Image
//           src={src}
//           width={width}
//           height={height}
//           alt="sticker"
//           className=" select-none pointer-events-none h-auto w-auto"
//         />
//       )}
//     </motion.div>
//   );
// };

// const PolaroidComponent: React.FC<{ polaroid: Polaroid }> = ({ polaroid }) => {
//   const { color, x, y, id } = polaroid;
//   const canvasRef = useAtomValue(canvasRefAtom);
//   const [selected, setSelected] = useAtom(selectedLayerAtom);
//   const [canvasList, updateCanvasList] = useAtom(canvasAtom);
//   const cursor = useAtomValue(cursorAtom);
//   const polaroidRed = useRef<HTMLDivElement>(null);

//   const dragControls = useDragControls();

//   const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
//     dragControls.start(event);
//   };

//   const handleDrag = (e: PointerEvent, info: PanInfo) => {
//     e.stopPropagation();
//     const polaroidRect = polaroidRed.current?.getBoundingClientRect();
//     if (!polaroidRect) return;
//     const offsetX = e.clientX - polaroidRect.left;
//     const offsetY = e.clientY - polaroidRect.top;

//     updateCanvasList((prev) => {
//       const oldMap = prev.get(id);
//       if (!oldMap) return prev;
//       const updatedPolaroid = {
//         ...oldMap,
//         x: cursor.x - offsetX,
//         y: cursor.y - offsetY,
//       };
//       prev.set(id, updatedPolaroid);
//       return new Map(prev);
//     });
//   };

//   const handleSelect = (e: React.PointerEvent<HTMLDivElement>) => {
//     e.stopPropagation();
//     setSelected(id);
//     // updateMyPresence({ selectedLayer: id });
//   };

//   return (
//     <motion.div
//       ref={polaroidRed}
//       className="flex flex-col box-border absolute "
//       onPointerDown={handleSelect}
//       onTouchStart={(e) => e.stopPropagation()}
//       drag
//       onDrag={handleDrag}
//       dragControls={dragControls}
//       dragListener={false}
//       dragMomentum={false}
//       dragConstraints={canvasRef !== null ? canvasRef : false}
//       style={{
//         x,
//         y,
//         width: "300px", // Set a fixed size or make it resizable
//         height: "400px",
//         boxShadow: "-0.6rem 0.6rem 0 rgba(29, 30, 28, 0.26)",
//         zIndex: selected === id ? 5 : 4,
//       }}
//     >
//       <motion.div
//         onPointerDown={startDrag}
//         style={{ touchAction: "none", userSelect: "none" }}
//         className="flex justify-end cursor-move w-full bg-gray-500"
//       >
//         <Button
//           tooltip="close"
//           variant={"ghost"}
//           onClick={() => {
//             updateCanvasList((prev) => {
//               prev.delete(id);
//               return new Map(prev);
//             });
//           }}
//         >
//           <X size={20} />
//         </Button>
//       </motion.div>
//       {selected === id && (
//         <div
//           className="absolute top-0 right-0 -translate-y-full select-none"
//           style={{ background: color }}
//         >
//           <p className="text-white truncate w-40">{id}</p>
//         </div>
//       )}
//       <motion.div className="h-full w-full bg-white">
//         Content
//         <br />
//         {x.toFixed(0)}:{y.toFixed(0)}
//       </motion.div>
//     </motion.div>
//   );
// };

// // const StickerComponent: React.FC<{ sticker: Sticker }> = ({ sticker }) => {
// //   const { src, width, height, x, y, id } = sticker;
// //   const [canvasList, updateCanvasList] = useAtom(canvasAtom);
// //   const cursor = useAtomValue(cursorAtom);
// //   const canvasRef = useAtomValue(canvasRefAtom);
// //   const [selected, setSelected] = useAtom(selectedLayerAtom);
// //   const stickerRef = useRef<HTMLDivElement>(null);
// //   const [{ selectedLayer }, updateMyPresence] = useMyPresence();

// //   const handleDoubleClick = () => {
// //     if (!canvasList.get(id)) return;
// //     updateCanvasList((prev) => {
// //       prev.set(id, { ...sticker, width: width + 50, height: height + 50 });
// //       return new Map(prev);
// //     });
// //   };

// //   const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
// //     e.preventDefault();
// //     if (!canvasList.get(id)) return;
// //     updateCanvasList((prev) => {
// //       if (width <= 50 || height <= 50) {
// //         return prev;
// //       }
// //       prev.set(id, { ...sticker, width: width - 50, height: height - 50 });
// //       return new Map(prev);
// //     });
// //   };

// //   const handleDrag = (
// //     event: MouseEvent | TouchEvent | PointerEvent,
// //     info: PanInfo
// //   ) => {
// //     event.stopPropagation();
// //     if (!canvasList.get(id)) return;
// //     const stickerRect = stickerRef.current?.getBoundingClientRect();
// //     if (!stickerRect) return;

// //     if (event instanceof MouseEvent || event instanceof PointerEvent) {
// //       const offsetX = event.clientX - stickerRect.left;
// //       const offsetY = event.clientY - stickerRect.top;

// //       updateCanvasList((prev) => {
// //         prev.set(id, {
// //           ...sticker,
// //           x: cursor.x - offsetX,
// //           y: cursor.y - offsetY,
// //         });
// //         return new Map(prev);
// //       });
// //     }
// //   };

// //   return (
// //     <motion.div
// //       ref={stickerRef}
// //       className={cn(selected === id && "border border-blue-500")}
// //       drag
// //       dragConstraints={canvasRef !== null ? canvasRef : false}
// //       dragMomentum={false}
// //       onDrag={handleDrag}
// //       style={{
// //         x,
// //         y,
// //         position: "absolute",
// //         cursor: "grab",
// //         zIndex: selected === id ? 5 : 4,
// //       }}
// //       onDoubleClick={handleDoubleClick}
// //       onContextMenu={handleRightClick}
// //       onPointerDown={(e) => {
// //         e.stopPropagation();
// //         setSelected(id);
// //         updateMyPresence({ selectedLayer: id });
// //       }}
// //     >
// //       {src.endsWith(".json") ? (
// //         <lottie-player
// //           autoplay
// //           loop
// //           mode="normal"
// //           src={src}
// //           style={{ width, height }}
// //         ></lottie-player>
// //       ) : (
// //         <Image
// //           src={src}
// //           width={width}
// //           height={height}
// //           alt="sticker"
// //           className=" select-none pointer-events-none h-auto w-auto"
// //         />
// //       )}
// //     </motion.div>
// //   );
// // };

// export default CanvasItem;
