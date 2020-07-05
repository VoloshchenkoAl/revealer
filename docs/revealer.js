var revealer = (function () {
  'use strict';

  function revealer(actionBtn, revealBlock) {
    var actionBtnEl = actionBtn;
    var revealBlockEl = revealBlock;
    var initialRadius = 0;
    var isMenuOpen = false;
    var reqId = null;
    var targetRadius = initialRadius;
    var elementRadius = targetRadius;
    var getMinimumRadius = function () {
      var innerHeight = window.innerHeight,
        innerWidth = window.innerWidth;
      return Math.sqrt(Math.pow(innerHeight, 2) + Math.pow(innerWidth, 2));
    };
    var animationStop = function () {
      cancelAnimationFrame(reqId);
      reqId = null;
    };
    var getCirclePosition = function () {
      var _a = actionBtnEl.getBoundingClientRect(),
        top = _a.top,
        left = _a.left,
        height = _a.height,
        width = _a.width;
      var leftPosition = left + width / 2 + 'px';
      var topPosition = top + height / 2 + 'px';
      return { left: leftPosition, top: topPosition };
    };
    var setCirclePosition = function () {
      var _a = getCirclePosition(),
        left = _a.left,
        top = _a.top;
      var circlePosition = left + ' ' + top;
      // eslint-disable-next-line no-param-reassign
      revealBlock.style.clipPath = 'circle(var(--radius) at ' + circlePosition + ')';
    };
    var initRevealBlock = function () {
      revealBlockEl.style.setProperty('--radius', initialRadius + 'px');
      setCirclePosition();
      revealBlockEl.setAttribute('data-active', 'true');
    };
    var animationStart = function () {
      elementRadius += (targetRadius - elementRadius) * 0.08;
      revealBlockEl.style.setProperty('--radius', elementRadius + 'px');
      reqId = requestAnimationFrame(animationStart);
      // some bug with small black point
      var isStopAnimation = isMenuOpen
        ? elementRadius > targetRadius
        : Math.round(elementRadius) === Math.round(targetRadius);
      if (isStopAnimation) {
        animationStop();
      }
    };
    var onReveal = function () {
      isMenuOpen = !isMenuOpen;
      actionBtnEl.setAttribute('data-open', '' + isMenuOpen);
      targetRadius = isMenuOpen ? getMinimumRadius() : initialRadius;
      animationStart();
    };
    initRevealBlock();
    actionBtnEl.addEventListener('click', onReveal);
  }

  return revealer;
})();
//# sourceMappingURL=revealer.js.map
