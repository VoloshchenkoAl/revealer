/* @Types */
import { Revealer, RevealerParam, Position } from './types';

/* @Helpers */
import { getCircleCenterPosition, getRevealRadius } from './helpers';

function revealer(revealerOptions: RevealerParam): Revealer {
  const { revealElementSelector, options } = revealerOptions;
  const revealBlock = document.querySelector(revealElementSelector) as HTMLElement;
  const initialRadius = 0;

  let isReveal = false;
  let reqId: number = null;
  let targetRadius: number = initialRadius;
  let elementRadius: number = targetRadius;
  let revealPosition: Position = getCircleCenterPosition(
    revealElementSelector,
    options?.anchorSelector,
    options?.position,
  );

  const setCircleClipPath = (): void => {
    revealBlock.style.clipPath = `circle(${elementRadius}px at ${revealPosition.x} ${revealPosition.y})`;
  };

  const updateElementRadius = (): void => {
    elementRadius += (targetRadius - elementRadius) * 0.08;
  };

  const cancelAnimation = (): void => {
    cancelAnimationFrame(reqId);
    reqId = null;
  };

  const animationStop = (): void => {
    elementRadius = targetRadius;
    setCircleClipPath();
    cancelAnimation();
  };

  const initRevealBlock = (): void => {
    setCircleClipPath();
    revealBlock.setAttribute('data-active', 'true');
  };

  const revealAnimation = () => {
    updateElementRadius();
    const isStopAnimation: boolean = elementRadius - targetRadius > -2;

    if (!isReveal) {
      cancelAnimation();
    }

    if (isStopAnimation) {
      animationStop();
      return;
    }

    setCircleClipPath();
    reqId = requestAnimationFrame(revealAnimation);
  };

  const hideAnimation = () => {
    updateElementRadius();
    const isStopAnimation: boolean = Math.abs(elementRadius - targetRadius) < 2;

    if (isReveal) {
      cancelAnimation();
    }

    if (isStopAnimation) {
      animationStop();
      return;
    }

    setCircleClipPath();
    reqId = requestAnimationFrame(hideAnimation);
  };

  const isRevealed = () => isReveal;

  const reveal = () => {
    if (isReveal) {
      return;
    }

    revealPosition = getCircleCenterPosition(
      revealElementSelector,
      options?.anchorSelector,
      options?.position,
    );
    targetRadius = getRevealRadius(revealElementSelector);
    revealAnimation();
    isReveal = true;
  };

  const hide = () => {
    if (!isReveal) {
      return;
    }

    targetRadius = initialRadius;
    hideAnimation();
    isReveal = false;
  };

  initRevealBlock();

  return {
    isRevealed,
    reveal,
    hide,
  };
}

export default revealer;
