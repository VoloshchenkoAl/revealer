/* @Types */
import { Position } from './types';

const calculateCenter = (a0: number): number => a0 / 2;

const getElementAnchorPosition = (elementSelector: string, anchorSelector: string) => {
  const element = document.querySelector(elementSelector);
  const anchor = document.querySelector(anchorSelector);

  if (!element) {
    throw new Error(`Element with selector ${elementSelector} have not been founded`);
  }

  if (!anchor) {
    throw new Error(`Element with selector ${anchorSelector} have not been founded`);
  }

  const { left: elementLeft, top: elementTop } = element.getBoundingClientRect();
  const {
    left: anchorLeft,
    top: anchorTop,
    width: anchorWidth,
    height: anchorHeight,
  } = anchor.getBoundingClientRect();

  return {
    x: `${anchorLeft - elementLeft + calculateCenter(anchorWidth)}px`,
    y: `${anchorTop - elementTop + calculateCenter(anchorHeight)}px`,
  };
};

const getElementCenterPosition = (elementSelector: string): Position => {
  const element = document.querySelector(elementSelector);

  if (!element) {
    throw new Error(`Element with selector ${elementSelector} have not been founded`);
  }

  const { left, top, width, height } = element.getBoundingClientRect();

  return {
    x: `${left + calculateCenter(width)}px`,
    y: `${top + calculateCenter(height)}px`,
  };
};

export const getCircleCenterPosition = (
  revealerSelector: string,
  anchorSelector?: string,
  position?: Position,
): Position => {
  if (typeof anchorSelector === 'string') {
    return getElementAnchorPosition(revealerSelector, anchorSelector);
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
