function revealer(actionBtn: HTMLElement, revealBlock: HTMLElement): void {
    const actionBtnEl: HTMLElement = actionBtn;
    const revealBlockEl: HTMLElement = revealBlock;
    const initialRedius: number = 0;

    let isMenuOpen: boolean = false;
    let reqId: number = null;
    let targetRadius: number = initialRedius;
    let elementRadius: number = targetRadius;

    const initRevealBlock = (): void => {
        revealBlock.style.clipPath = `circle(var(--radius) at 20% 20%)`;
        revealBlockEl.style.setProperty('--radius', `${initialRedius}px`);
        revealBlockEl.setAttribute('data-active', 'true');
    };

    const getTargetRadius = (inMenuOpen: boolean): number => {
        return inMenuOpen ? getMinimumRadius() : initialRedius;
    };

    const getMinimumRadius = (): number => {
        const { innerHeight, innerWidth } = window;

        return Math.sqrt(innerHeight ** 2 + innerWidth ** 2);
    };

    const animationStart = (): void => {
        elementRadius += (targetRadius - elementRadius) * 0.08;
        revealBlockEl.style.setProperty('--radius', `${elementRadius}px`);

        reqId = requestAnimationFrame(animationStart);

        // some bug with smal black point
        const isStopAnimation: boolean =
            isMenuOpen ? elementRadius > targetRadius : Math.round(elementRadius) === Math.round(targetRadius);

        if (isStopAnimation) {
            animationStop();
        }
    };

    const animationStop = (): void => {
        cancelAnimationFrame(reqId);
        reqId = null;
    };

    const onReveal = (): void => {
        isMenuOpen = !isMenuOpen;
        actionBtnEl.setAttribute('data-open', 'isMenuOpen');
        targetRadius = getTargetRadius(isMenuOpen);
        animationStart();
    };

    initRevealBlock();
    actionBtnEl.addEventListener('click', onReveal);
}

export default revealer;
