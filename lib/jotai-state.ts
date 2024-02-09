import { atom } from "jotai";
import { CanvasLayer, Editor, Position } from "./type";

const cameraAtom = atom<Position>({ x: 0, y: 0 });

const cursorAtom = atom<Position>({ x: 0, y: 0 });

const canvasAtom = atom<Map<string, CanvasLayer>>(new Map());

const selectedLayerAtom = atom<string | null>(null);

const isDraggingAtom = atom<boolean>(false);

const editorAtom = atom<Editor>((get) => {
  const camera = get(cameraAtom);
  const cursor = get(cursorAtom);
  const canvas = get(canvasAtom);
  const selectedLayer = get(selectedLayerAtom);
  const isDragging = get(isDraggingAtom);

  return {
    camera,
    cursor,
    canvas,
    selectedLayer,
    isDragging,
  };
});

export {
  cameraAtom,
  cursorAtom,
  canvasAtom,
  selectedLayerAtom,
  editorAtom,
  isDraggingAtom,
};
