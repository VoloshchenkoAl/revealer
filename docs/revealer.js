var revealer = (function () {
  'use strict';

  var getElementCenterPosition = function (elementSelector) {
    var element = document.querySelector(elementSelector);
    if (!element) {
      throw new Error('Element with selector ' + elementSelector + ' have not been founded');
    }
    var calculateCenter = function (a0, a1) {
      return (a1 - a0) / 2;
    };
    var _a = element.getBoundingClientRect(),
      elementX = _a.x,
      elementY = _a.y,
      bottom = _a.bottom,
      right = _a.right,
      left = _a.left,
      top = _a.top;
    return {
      x: left + calculateCenter(elementX, right) + 'px',
      y: top + calculateCenter(elementY, bottom) + 'px',
    };
  };
  var getCircleCenterPosition = function (revealerSelector, anchorSelector, position) {
    if (typeof anchorSelector === 'string') {
      return getElementCenterPosition(anchorSelector);
    }
    if (
      typeof (position === null || position === void 0 ? void 0 : position.x) === 'string' &&
      typeof (position === null || position === void 0 ? void 0 : position.y) === 'string'
    ) {
      return position;
    }
    return getElementCenterPosition(revealerSelector);
  };
  var getRevealRadius = function (revealerSelector) {
    var innerHeight = window.innerHeight,
      innerWidth = window.innerWidth;
    if (typeof revealerSelector === 'string') {
      var revealerBlock = document.querySelector(revealerSelector);
      var _a = revealerBlock.getBoundingClientRect(),
        elementWidth = _a.width,
        elementHeight = _a.height;
      innerHeight = elementHeight;
      innerWidth = elementWidth;
    }
    return Math.sqrt(Math.pow(innerHeight, 2) + Math.pow(innerWidth, 2));
  };

  /* @Helpers */
  function revealer(revealerOptions) {
    var revealElementSelector = revealerOptions.revealElementSelector,
      options = revealerOptions.options;
    var revealBlock = document.querySelector(revealElementSelector);
    var initialRadius = 0;
    var isReveal = false;
    var reqId = null;
    var targetRadius = initialRadius;
    var elementRadius = targetRadius;
    var revealPosition = getCircleCenterPosition(
      revealElementSelector,
      options === null || options === void 0 ? void 0 : options.anchorSelector,
      options === null || options === void 0 ? void 0 : options.position,
    );
    var setCircleClipPath = function () {
      revealBlock.style.clipPath =
        'circle(' + elementRadius + 'px at ' + revealPosition.x + ' ' + revealPosition.y + ')';
    };
    var updateElementRadius = function () {
      elementRadius += (targetRadius - elementRadius) * 0.08;
    };
    var cancelAnimation = function () {
      cancelAnimationFrame(reqId);
      reqId = null;
    };
    var animationStop = function () {
      elementRadius = targetRadius;
      setCircleClipPath();
      cancelAnimation();
    };
    var initRevealBlock = function () {
      setCircleClipPath();
      revealBlock.setAttribute('data-active', 'true');
    };
    var revealAnimation = function () {
      updateElementRadius();
      var isStopAnimation = elementRadius - targetRadius > -2;
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
    var hideAnimation = function () {
      updateElementRadius();
      var isStopAnimation = Math.abs(elementRadius - targetRadius) < 2;
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
    var isRevealed = function () {
      return isReveal;
    };
    var reveal = function () {
      if (isReveal) {
        return;
      }
      revealPosition = getCircleCenterPosition(
        revealElementSelector,
        options === null || options === void 0 ? void 0 : options.anchorSelector,
        options === null || options === void 0 ? void 0 : options.position,
      );
      targetRadius = getRevealRadius(revealElementSelector);
      revealAnimation();
      isReveal = true;
    };
    var hide = function () {
      if (!isReveal) {
        return;
      }
      targetRadius = initialRadius;
      hideAnimation();
      isReveal = false;
    };
    initRevealBlock();
    return {
      isRevealed: isRevealed,
      reveal: reveal,
      hide: hide,
    };
  }

  return revealer;
})();
//# sourceMappingURL=revealer.js.map
