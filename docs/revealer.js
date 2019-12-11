var revealer = (function () {
    'use strict';

    function revealer(actionBtn, revealBlock) {
        var actionBtnEl = actionBtn;
        var revealBlockEl = revealBlock;
        var initialRedius = 0;
        var isMenuOpen = false;
        var reqId = null;
        var targetRadius = initialRedius;
        var elementRadius = targetRadius;
        var initRevealBlock = function () {
            revealBlock.style.clipPath = "circle(var(--radius) at 20% 20%)";
            revealBlockEl.style.setProperty('--radius', initialRedius + "px");
            revealBlockEl.setAttribute('data-active', 'true');
        };
        var getTargetRadius = function (inMenuOpen) {
            return inMenuOpen ? getMinimumRadius() : initialRedius;
        };
        var getMinimumRadius = function () {
            var innerHeight = window.innerHeight, innerWidth = window.innerWidth;
            return Math.sqrt(Math.pow(innerHeight, 2) + Math.pow(innerWidth, 2));
        };
        var animationStart = function () {
            elementRadius += (targetRadius - elementRadius) * 0.08;
            revealBlockEl.style.setProperty('--radius', elementRadius + "px");
            reqId = requestAnimationFrame(animationStart);
            // some bug with smal black point
            var isStopAnimation = isMenuOpen ? elementRadius > targetRadius : Math.round(elementRadius) === Math.round(targetRadius);
            if (isStopAnimation) {
                animationStop();
            }
        };
        var animationStop = function () {
            cancelAnimationFrame(reqId);
            reqId = null;
        };
        var onReveal = function () {
            isMenuOpen = !isMenuOpen;
            actionBtnEl.setAttribute('data-open', 'isMenuOpen');
            targetRadius = getTargetRadius(isMenuOpen);
            animationStart();
        };
        initRevealBlock();
        actionBtnEl.addEventListener('click', onReveal);
    }

    return revealer;

}());
//# sourceMappingURL=revealer.js.map
