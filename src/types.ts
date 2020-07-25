export interface Position {
  x: string;
  y: string;
}

export interface RevealerParam {
  revealElementSelector: string;
  options?: {
    position: Position;
    anchorSelector: string;
  };
}

export interface Revealer {
  isRevealed: () => boolean;
  hide: () => void;
  reveal: () => void;
}
