import { atom } from "jotai";

const userAtom = atom({
  color: "#000000",
  nickName: "Guest:" + crypto.randomUUID().slice(0, 5),
});

const deviceInfoAtom = atom({
  isMobile: false,
  height: 800,
  width: 1080,
  deviceType: "desktop",
});

const panModeAtom = atom(false);
const cameraAtom = atom<{
  x: number;
  y: number;
  lastX?: number;
  lastY?: number;
}>({ x: 0, y: 0, lastX: 0, lastY: 0 });

const cursorAtom = atom({
  x: 0,
  y: 0,
});

export {
  userAtom,
  deviceInfoAtom,
  cameraAtom,
  cursorAtom,
  // canvasAtom,
  // selectedLayerAtom,
  // editorAtom,
  panModeAtom,
  // canvasRefAtom,
};

// const canvasRefAtom = atom<RefObject<HTMLDivElement> | null>(null);

// const cameraAtom = atom<CameraPosition>({ x: 0, y: 0, lastX: 0, lastY: 0 });

// const cursorAtom = atom<CursorPosition>({ x: 0, y: 0 });

// const canvasAtom = atom<Map<string, CanvasLayer>>(new Map());

// const selectedLayerAtom = atom<string | null>(null);

// const editorAtom = atom<Editor>((get) => {
//   const camera = get(cameraAtom);
//   const cursor = get(cursorAtom);
//   const canvas = get(canvasAtom);
//   const selectedLayer = get(selectedLayerAtom);
//   const panMode = get(panModeAtom);

//   return {
//     camera,
//     cursor,
//     canvas,
//     selectedLayer,
//     panMode,
//   };
// });
