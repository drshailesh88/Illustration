declare module 'glfx' {
  export interface GLFXCanvas {
    canvas: HTMLCanvasElement;
    texture: (source: HTMLCanvasElement | HTMLImageElement) => void;
    update: (filter: string, ...args: unknown[]) => GLFXCanvas;
    toDataURL: (type?: string, quality?: number) => string;
    destroy: () => void;
  }

  export function canvas(): GLFXCanvas;
}
