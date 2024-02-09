import { atom } from "jotai";
import { CanvasLayer, Editor, Position } from "./type";
import { RefObject } from "react";

const canvasRefAtom = atom<RefObject<HTMLDivElement> | null>(null);

const cameraAtom = atom<Position>({ x: 0, y: 0 });

const cursorAtom = atom<Position>({ x: 0, y: 0 });

const canvasAtom = atom<Map<string, CanvasLayer>>(new Map());

const selectedLayerAtom = atom<string | null>(null);

const dragModeAtom = atom<boolean>(false);

const editorAtom = atom<Editor>((get) => {
  const camera = get(cameraAtom);
  const cursor = get(cursorAtom);
  const canvas = get(canvasAtom);
  const selectedLayer = get(selectedLayerAtom);
  const dragMode = get(dragModeAtom);

  return {
    camera,
    cursor,
    canvas,
    selectedLayer,
    dragMode,
  };
});

export {
  cameraAtom,
  cursorAtom,
  canvasAtom,
  selectedLayerAtom,
  editorAtom,
  dragModeAtom,
  canvasRefAtom,
};
