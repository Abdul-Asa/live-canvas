import { atom } from "jotai";
import { CanvasLayer, Editor, CameraPosition, CursorPosition } from "./type";
import { RefObject } from "react";

const userAtom = atom({
  color: "#000000",
  nickName: "Anonymous",
  isMobile: false,
});

const canvasRefAtom = atom<RefObject<HTMLDivElement> | null>(null);

const cameraAtom = atom<CameraPosition>({ x: 0, y: 0, lastX: 0, lastY: 0 });

const cursorAtom = atom<CursorPosition>({ x: 0, y: 0 });

const canvasAtom = atom<Map<string, CanvasLayer>>(new Map());

const selectedLayerAtom = atom<string | null>(null);

const panModeAtom = atom<boolean>(false);

const editorAtom = atom<Editor>((get) => {
  const camera = get(cameraAtom);
  const cursor = get(cursorAtom);
  const canvas = get(canvasAtom);
  const selectedLayer = get(selectedLayerAtom);
  const panMode = get(panModeAtom);

  return {
    camera,
    cursor,
    canvas,
    selectedLayer,
    panMode,
  };
});

export {
  cameraAtom,
  cursorAtom,
  canvasAtom,
  selectedLayerAtom,
  editorAtom,
  panModeAtom,
  canvasRefAtom,
  userAtom,
};
