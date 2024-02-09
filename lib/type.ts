export interface Editor {
  camera: Position;
  cursor: Position;
  canvas: Map<string, CanvasLayer>;
  selectedLayer: string | null;
  isDragging: boolean;
}

enum CanvasLayerType {
  STICKER = "sticker",
  POLAROID = "polaroid",
}

export type CanvasLayer = Sticker | Polaroid;

export interface Position {
  x: number;
  y: number;
}

interface Sticker {
  type: CanvasLayerType.STICKER;
  id: string;
  x: number;
  y: number;
  src: string;
  height: number;
  width: number;
}

interface Polaroid {
  type: CanvasLayerType.POLAROID;
  id: string;
  x: number;
  y: number;
  color: string;
}
