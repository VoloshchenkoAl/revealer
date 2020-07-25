/* @Types */
import { Position } from './types';

const getElementCenterPosition = (elementSelector: string): Position => {
  const element = document.querySelector(elementSelector);

  if (!element) {
    throw new Error(`Element with selector ${elementSelector} have not been founded`);
  }

  const calculateCenter = (a0: number, a1: number): number => (a1 - a0) / 2;

  const { x: elementX, y: elementY, bottom, right, left, top } = element.getBoundingClientRect();

  return {
    x: `${left + calculateCenter(elementX, right)}px`,
    y: `${top + calculateCenter(elementY, bottom)}px`,
  };
};

export const getCircleCenterPosition = (
  revealerSelector: string,
  anchorSelector?: string,
  position?: Position,
): Position => {
  if (typeof anchorSelector === 'string') {
    return getElementCenterPosition(anchorSelector);
  }

  if (typeof position?.x === 'string' && typeof position?.y === 'string') {
    return position;
  }

  return getElementCenterPosition(revealerSelector);
};

export const getRevealRadius = (revealerSelector: string): number => {
  let { innerHeight, innerWidth } = window;

  if (typeof revealerSelector === 'string') {
    const revealerBlock = document.querySelector(revealerSelector);
    const { width: elementWidth, height: elementHeight } = revealerBlock.getBoundingClientRect();

    innerHeight = elementHeight;
    innerWidth = elementWidth;
  }

  return Math.sqrt(innerHeight ** 2 + innerWidth ** 2);
};
