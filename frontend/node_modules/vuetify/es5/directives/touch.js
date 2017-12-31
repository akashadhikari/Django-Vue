function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _touchstart = function _touchstart(event, wrapper) {
  var touch = event.changedTouches[0];
  wrapper.touchstartX = touch.clientX;
  wrapper.touchstartY = touch.clientY;

  wrapper.start && wrapper.start(Object.assign(event, wrapper));
};

var _touchend = function _touchend(event, wrapper) {
  var touch = event.changedTouches[0];
  wrapper.touchendX = touch.clientX;
  wrapper.touchendY = touch.clientY;

  wrapper.end && wrapper.end(Object.assign(event, wrapper));

  handleGesture(wrapper);
};

var _touchmove = function _touchmove(event, wrapper) {
  var touch = event.changedTouches[0];
  wrapper.touchmoveX = touch.clientX;
  wrapper.touchmoveY = touch.clientY;

  wrapper.move && wrapper.move(Object.assign(event, wrapper));
};

var handleGesture = function handleGesture(wrapper) {
  var touchstartX = wrapper.touchstartX,
      touchendX = wrapper.touchendX,
      touchstartY = wrapper.touchstartY,
      touchendY = wrapper.touchendY;

  var dirRatio = 0.5;
  var minDistance = 16;
  wrapper.offsetX = touchendX - touchstartX;
  wrapper.offsetY = touchendY - touchstartY;

  if (Math.abs(wrapper.offsetY) < dirRatio * Math.abs(wrapper.offsetX)) {
    wrapper.left && touchendX < touchstartX - minDistance && wrapper.left(wrapper);
    wrapper.right && touchendX > touchstartX + minDistance && wrapper.right(wrapper);
  }

  if (Math.abs(wrapper.offsetX) < dirRatio * Math.abs(wrapper.offsetY)) {
    wrapper.up && touchendY < touchstartY - minDistance && wrapper.up(wrapper);
    wrapper.down && touchendY > touchstartY + minDistance && wrapper.down(wrapper);
  }
};

function inserted(el, _ref, _ref2) {
  var value = _ref.value;
  var context = _ref2.context;

  var wrapper = {
    touchstartX: 0,
    touchstartY: 0,
    touchendX: 0,
    touchendY: 0,
    touchmoveX: 0,
    touchmoveY: 0,
    offsetX: 0,
    offsetY: 0,
    left: value.left,
    right: value.right,
    up: value.up,
    down: value.down,
    start: value.start,
    move: value.move,
    end: value.end
  };

  var target = value.parent ? el.parentNode : el;
  var options = value.options || { passive: true

    // Needed to pass unit tests
  };if (!target) return;

  target._touchHandlers = Object.assign(Object(target._touchHandlers), _defineProperty({}, context._uid, {
    touchstart: function touchstart(e) {
      return _touchstart(e, wrapper);
    },
    touchend: function touchend(e) {
      return _touchend(e, wrapper);
    },
    touchmove: function touchmove(e) {
      return _touchmove(e, wrapper);
    }
  }));
  Object.keys(target._touchHandlers[context._uid]).forEach(function (eventName) {
    target.addEventListener(eventName, target._touchHandlers[context._uid][eventName], options);
  });
}

function unbind(el, _ref3, _ref4) {
  var value = _ref3.value;
  var context = _ref4.context;

  var target = value.parent ? el.parentNode : el;

  if (!target) return;

  var handlers = target._touchHandlers[context._uid];
  Object.keys(handlers).forEach(function (eventName) {
    return target.removeEventListener(eventName, handlers[eventName]);
  });
  delete target._touchHandlers[context._uid];
}

export default {
  name: 'touch',
  inserted: inserted,
  unbind: unbind
};