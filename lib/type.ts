export interface Editor {
  camera: CameraPosition;
  cursor: CursorPosition;
  canvas: Map<string, CanvasLayer>;
  selectedLayer: string | null;
  panMode: boolean;
}

export enum CanvasLayerType {
  STICKER = "sticker",
  POLAROID = "polaroid",
}

export type CanvasLayer = Sticker | Polaroid;

export interface CameraPosition {
  x: number;
  y: number;
  lastX?: number;
  lastY?: number;
}

export interface CursorPosition {
  x: number;
  y: number;
}

export interface Sticker {
  type: CanvasLayerType.STICKER;
  id: string;
  x: number;
  y: number;
  src: string;
  height: number;
  width: number;
}

export interface Polaroid {
  type: CanvasLayerType.POLAROID;
  id: string;
  x: number;
  y: number;
  color: string;
}
