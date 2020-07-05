function revealer(actionBtn: HTMLElement, revealBlock: HTMLElement): void {
  const actionBtnEl: HTMLElement = actionBtn;
  const revealBlockEl: HTMLElement = revealBlock;
  const initialRadius = 0;

  let isMenuOpen = false;
  let reqId: number = null;
  let targetRadius: number = initialRadius;
  let elementRadius: number = targetRadius;

  const getMinimumRadius = (): number => {
    const { innerHeight, innerWidth } = window;

    return Math.sqrt(innerHeight ** 2 + innerWidth ** 2);
  };

  const animationStop = (): void => {
    cancelAnimationFrame(reqId);
    reqId = null;
  };

  const getCirclePosition = () => {
    const { top, left, height, width } = actionBtnEl.getBoundingClientRect();
    const leftPosition = `${left + width / 2}px`;
    const topPosition = `${top + height / 2}px`;

    return { left: leftPosition, top: topPosition };
  };

  const setCirclePosition = () => {
    const { left, top } = getCirclePosition();
    const circlePosition = `${left} ${top}`;

    // eslint-disable-next-line no-param-reassign
    revealBlock.style.clipPath = `circle(var(--radius) at ${circlePosition})`;
  };

  const initRevealBlock = (): void => {
    revealBlockEl.style.setProperty('--radius', `${initialRadius}px`);
    setCirclePosition();
    revealBlockEl.setAttribute('data-active', 'true');
  };

  const animationStart = (): void => {
    elementRadius += (targetRadius - elementRadius) * 0.08;
    revealBlockEl.style.setProperty('--radius', `${elementRadius}px`);

    reqId = requestAnimationFrame(animationStart);

    // some bug with small black point
    const isStopAnimation: boolean = isMenuOpen
      ? elementRadius > targetRadius
      : Math.round(elementRadius) === Math.round(targetRadius);

    if (isStopAnimation) {
      animationStop();
    }
  };

  const onReveal = (): void => {
    isMenuOpen = !isMenuOpen;
    actionBtnEl.setAttribute('data-open', `${isMenuOpen}`);
    targetRadius = isMenuOpen ? getMinimumRadius() : initialRadius;
    animationStart();
  };

  initRevealBlock();
  actionBtnEl.addEventListener('click', onReveal);
}

export default revealer;
