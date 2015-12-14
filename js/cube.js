/* jshint sub: true */
(function($, window, document, undefined) {
  'use strict';
  var data = {};
  var allTurns = ['base', 'left', 'right'];
  var allAx = ['x', 'y', 'z'];
  for (var a = 0; a < allAx.length; a++) {
    data[allAx[a]] = {};
    for (var l = 0; l < allTurns.length; l++) {
      data[allAx[a]][allTurns[l]] = {};
    }
  }
  var makeData1 = function(m, n, o, i, dir) {
    var v = $.extend(true, [], data[m].base[i]);
    var w = $.extend(true, [], data[m].base[i]);
    data[m][dir][i] = v.sort(function(a, b) {
      if (a[o] > b[o]) {
        return 1;
      } else if (a[o] < b[o]) {
        return -1;
      } else {
        if (a[n] > b[n]) {
          return -1;
        } else {
          return 1;
        }
      }
    });

  };

  var makeData2 = function(m, n, o, i, dir) {
    var v = $.extend(true, [], data[m].base[i]);
    var w = $.extend(true, [], data[m].base[i]);
    data[m][dir][i] = w.sort(function(a, b) {
      if (a[o] > b[o]) {
        return -1;
      } else if (a[o] < b[o]) {
        return 1;
      } else {
        if (a[n] > b[n]) {
          return 1;
        } else {
          return -1;
        }
      }
    });
  };

  var makeData3 = function(m, n, o, i, dir) {
    var v = $.extend(true, [], data[m].base[i]);
    var w = $.extend(true, [], data[m].base[i]);
    data[m][dir][i] = v.sort(function(a, b) {
      if (a[o] > b[o]) {
        return 1;
      } else if (a[o] < b[o]) {
        return -1;
      } else {
        if (a[n] > b[n]) {
          return 1;
        } else {
          return -1;
        }
      }
    });
  };

  var makeData4 = function(m, n, o, i, dir) {
    var v = $.extend(true, [], data[m].base[i]);
    var w = $.extend(true, [], data[m].base[i]);
    data[m][dir][i] = w.sort(function(a, b) {
      if (a[o] > b[o]) {
        return -1;
      } else if (a[o] < b[o]) {
        return 1;
      } else {
        if (a[n] > b[n]) {
          return -1;
        } else {
          return 1;
        }
      }
    });
  };

  for (var i = 0; i < 3; i++) {
    data['x']['base'][i] = [{
      'x': i,
      'y': 0,
      'z': 0
    }, {
      'x': i,
      'y': 0,
      'z': 1
    }, {
      'x': i,
      'y': 0,
      'z': 2
    }, {
      'x': i,
      'y': 1,
      'z': 0
    }, {
      'x': i,
      'y': 1,
      'z': 1
    }, {
      'x': i,
      'y': 1,
      'z': 2
    }, {
      'x': i,
      'y': 2,
      'z': 0
    }, {
      'x': i,
      'y': 2,
      'z': 1
    }, {
      'x': i,
      'y': 2,
      'z': 2
    }];
    data['y']['base'][i] = [{
      'x': 0,
      'y': i,
      'z': 0
    }, {
      'x': 0,
      'y': i,
      'z': 1
    }, {
      'x': 0,
      'y': i,
      'z': 2
    }, {
      'x': 1,
      'y': i,
      'z': 0
    }, {
      'x': 1,
      'y': i,
      'z': 1
    }, {
      'x': 1,
      'y': i,
      'z': 2
    }, {
      'x': 2,
      'y': i,
      'z': 0
    }, {
      'x': 2,
      'y': i,
      'z': 1
    }, {
      'x': 2,
      'y': i,
      'z': 2
    }];
    data['z']['base'][i] = [{
      'x': 0,
      'y': 2,
      'z': i
    }, {
      'x': 1,
      'y': 2,
      'z': i
    }, {
      'x': 2,
      'y': 2,
      'z': i
    }, {
      'x': 0,
      'y': 1,
      'z': i
    }, {
      'x': 1,
      'y': 1,
      'z': i
    }, {
      'x': 2,
      'y': 1,
      'z': i
    }, {
      'x': 0,
      'y': 0,
      'z': i
    }, {
      'x': 1,
      'y': 0,
      'z': i
    }, {
      'x': 2,
      'y': 0,
      'z': i
    }];
    makeData1('x', 'y', 'z', i, 'left');
    makeData2('x', 'y', 'z', i, 'right');
    makeData2('y', 'x', 'z', i, 'left');
    makeData1('y', 'x', 'z', i, 'right');
    makeData3('z', 'y', 'x', i, 'left');
    makeData4('z', 'y', 'x', i, 'right');

  }
  var rotate3d = {
    'x': '1,0,0,',
    'y': '0,1,0,',
    'z': '0,0,1,'
  };
  var $gripAxis;
  var cubeRotationSpeed = 1.5;
  var cache = {};
  var canvas = {
    'threshold': 10,
    'block': false,
    'down': false,
    'axis': null,
    'css': '',
    'mouse': {
      'distance': 0,
      'time': 0
    }
  };
  var randomNumber = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  var classWithPrefix = function(regex) {
    return function(index, classes) {
      return classes.split(/\s+/).filter(function(el) {
        return regex.test(el);
      }).join(' ');
    };
  };
  /**
   * @jsdoc function
   * @name rubics.clearHelpers
   * @description
   *   clear the grip after the rotation
   */
  var clearHelpers = function() {
    var $gripAxis = $('.grip .axis');
    $gripAxis.css({
      transition: 'none',
      transform: ''
    });
    setTimeout(function() {
      $gripAxis.css({
        transition: ''
      });
    }, 0);
  };
  /**
   * @jsdoc function
   * @name rubics.positionParts
   * @description
   *   puts the cubes in the new position
   */
  var positionParts = function(turnAxis, level, direction) {
    if (!turnAxis) {
      return false;
    }
    var axis = ['x', 'y', 'z'];
    var elements = [];
    var oppositeDirection = direction === 'right' ? 'left' : 'right';
    $.each(data[turnAxis]['base'][level], function(i, obj) {
      var selector3d = '[data-x="';
      selector3d += obj['x'];
      selector3d += '"][data-y="';
      selector3d += obj['y'];
      selector3d += '"][data-z="';
      selector3d += obj['z'] + '"]';
      elements.push($(selector3d));
    });
    $.each(elements, function(i, el) {
      $.each(axis, function(j, ax) {
        $(el).attr('data-' +
          ax, data[turnAxis][oppositeDirection][level][i][ax]);
      });
    });
  };
  /**
   * @jsdoc function
   * @name rubics.performTurn
   * @description
   *   performes the turn.
   *   allows a callback when the turn is done
   */
  var performTurn = function(rotate3d, turnAxis, direction, callback) {
    var degree = direction === 'right' ? 90 : -90;
    $('.grip').find('.axis-grip:first').css({
      transform: 'rotate3d(' +
        rotate3d[turnAxis] +
        degree +
        'deg)'
    }).one('transitionend', callback);
  };
  /**
   * @jsdoc function
   * @name rubics.rotateParts
   * @description
   *   rotates the parts
   */
  var rotateParts = function(rotate3d, turnAxis, direction) {
    $('.grip .cube-part-wrapper').each(function(i, el) {
      var degree = direction === 'right' ? 90 : -90;
      var css = $(el).find('.axis-part')[0].style.transform;
      css = css === 'none' ? '' : css;
      css = 'rotate3d(' +
        rotate3d[turnAxis] +
        degree +
        'deg) ' +
        css;
      $(el).find('.axis-part').css({
        transform: css
      });
    });
  };
  /**
   * @jsdoc function
   * @name rubics.attachParts
   * @description
   *   puts the parts back into the cube
   */
  var attachParts = function(turnAxis, level) {
    $('[data-' + turnAxis + '=' + level + ']')
      .appendTo('.cube');
  };
  /**
   * @jsdoc function
   * @name rubics.detachParts
   * @description
   *   puts the parts into the grip
   */
  var detachParts = function(turnAxis, level) {
    $('[data-' + turnAxis + '=' + level + ']')
      .appendTo('.grip .axis-grip');
  };

  /**
   * @jsdoc function
   * @name rubics.autoTurn
   * @description
   *   automatically turn
   */
  var autoTurn = function(turnAxis, level, direction) {
    if (!canvas.block) {
      canvas.block = true;
      turnAxis = turnAxis || 'x';
      level = level || 0;
      detachParts(turnAxis, level);
      performTurn(rotate3d, turnAxis, direction, function() {
        rotateParts(rotate3d, turnAxis, direction);
        attachParts(turnAxis, level);
        clearHelpers();
        positionParts(turnAxis, level, direction);
        window.setTimeout(function() {
          canvas.block = false;
        }, 2);
      });
    } else {
      return;
    }
  };

  /**
   * @jsdoc function
   * @name rubics.scrambleCube
   * @description
   *   scramble the cube
   */
  var scrambleCube = function(n) {
    var axis = ['x', 'y', 'z'];
    var direction = ['left', 'right'];

    $gripAxis.addClass('fast');
    var duration = $gripAxis.css('transition-duration');
    duration = (parseFloat(duration) + 0.1) * 1000;
    var play = setInterval(function() {
      var dir = direction[randomNumber(0, 1)];
      var axi = axis[randomNumber(0, 2)];
      var level = randomNumber(0, 2);

      dir = cache.dir === dir ? (dir === 'left' ? 'right' : 'left') : dir;
      axi = cache.axi === axi ? (axi === 'x' ? 'y' : 'z') : axi;
      axi = cache.axi === axi ? (axi === 'z' ? 'x' : 'y') : axi;
      axi = cache.axi === axi ? (axi === 'y' ? 'z' : 'x') : axi;
      level = level === 1 ? randomNumber(0, 2) : level;
      level = level === 1 ? 2 : level;
      level = cache.level === level ? (level === 0 ? 2 : 0) : level;
      level = cache.level === level ? (level === 2 ? 0 : 2) : level;

      cache = {
        dir: dir,
        axi: axi,
        level: level
      };
      autoTurn(axi, level, dir);
    }, duration);
    setTimeout(function() {
      $gripAxis.removeClass('fast');
      if (play) {
        clearTimeout(play);
      }
    }, duration * n);
  };

  /**
   * @jsdoc function
   * @name rubics.releaseSwiper
   * @description
   *   release the Swiper
   */
  var releaseSwiper = function(e) {
    if (canvas.swiper && canvas.swiper.play) {
      canvas.swiper.play = false;
      if (!canvas.swiper.move) {
        return false;
      }
      canvas.swiper.move = false;
      if (canvas.swiper.degree >= -30 && canvas.swiper.degree <= 30) {
        $gripAxis.removeClass('manual').css({
          transform: 'rotate3d(0,0,0,0deg)'
        }).one('transitionend', function() {
          attachParts(canvas.swiper.axis, canvas.swiper.level);
          clearHelpers();
        });
      } else {
        var direction = canvas.swiper.degree > 0 ? 'right' : 'left';
        $gripAxis.removeClass('manual').css({
          transform: 'rotate3d(' +
            rotate3d[canvas.swiper.axis] +
            (canvas.swiper.degree > 0 ? '90' : '-90') + 'deg)'
        }).one('transitionend', function() {
          rotateParts(rotate3d, canvas.swiper.axis, direction);
          attachParts(canvas.swiper.axis, canvas.swiper.level);
          clearHelpers();
          positionParts(canvas.swiper.axis, canvas.swiper.level, direction);
          canvas.swiper = false;
        });
      }
    }
  };
  /**
   * @jsdoc function
   * @name rubics.moveSwiper
   * @description
   *   movement on the the Swiper
   */
  var moveSwiper = function(e) {
    if (canvas.swiper && canvas.swiper.play) {
      e.preventDefault();
      canvas.swiper.move = {
        'x': e.offsetX || e.originalEvent.layerX,
        'y': e.offsetY || e.originalEvent.layerY
      };
      canvas.swiper.distance = {};
      canvas.swiper.distance.x = (canvas.swiper.start.x -
          canvas.swiper.move.x) /
        canvas.swiper.size.x * 90;
      canvas.swiper.distance.y = (canvas.swiper.start.y -
          canvas.swiper.move.y) /
        canvas.swiper.size.x * 90;

      if (!canvas.swiper.active &&
        (canvas.swiper.distance.x > canvas.threshold ||
          canvas.swiper.distance.x < -1 * canvas.threshold)) {
        canvas.swiper.axis = canvas.swiper.sides.x;
        canvas.swiper.degree = (canvas.swiper.start.x -
            canvas.swiper.move.x) /
          canvas.swiper.size.x * 90;
        canvas.swiper.side = 'y';
        canvas.swiper.turn = 'x';
        canvas.swiper.active = true;
      } else if (!canvas.swiper.active &&
        (canvas.swiper.distance.y > canvas.threshold ||
          canvas.swiper.distance.y < -1 * canvas.threshold)) {
        canvas.swiper.axis = canvas.swiper.sides.y;
        canvas.swiper.side = 'x';
        canvas.swiper.turn = 'y';
        canvas.swiper.active = true;
      }
      if (canvas.swiper.axis) {

        if (!canvas.swiper.init) {
          canvas.swiper.init = true;
          if (canvas.swiper.delta[canvas.swiper.side] < 1.5) {
            canvas.swiper.level = canvas.swiper.side === 'x' ? 0 : 2;
            canvas.swiper.level = canvas.swiper.side === 'y' &&
              canvas.swiper.control === 'right' ? 0 : canvas.swiper.level;
            canvas.swiper.level = canvas.swiper.side === 'x' &&
              canvas.swiper.control === 'front' ? 2 : canvas.swiper.level;
            canvas.swiper.level = canvas.swiper.side === 'x' &&
              canvas.swiper.control === 'bottom' ? 2 : canvas.swiper.level;

            canvas.swiper.level = canvas.swiper.controls === 'front' &&
              canvas.swiper.side === 'x' ? 0 : canvas.swiper.level;
          } else if (canvas.swiper.delta[canvas.swiper.side] < 3) {
            return false; // can't turn ceter slice
            canvas.swiper.level = 1;
          } else {
            canvas.swiper.level = canvas.swiper.side === 'x' ? 2 : 0;
            canvas.swiper.level = canvas.swiper.side === 'y' &&
              canvas.swiper.control === 'right' ? 2 : canvas.swiper.level;
            canvas.swiper.level = canvas.swiper.side === 'x' &&
              canvas.swiper.control === 'front' ? 0 : canvas.swiper.level;
            canvas.swiper.level = canvas.swiper.side === 'x' &&
              canvas.swiper.control === 'bottom' ? 0 : canvas.swiper.level;

          }
          detachParts(canvas.swiper.axis, canvas.swiper.level);
          $gripAxis
            .addClass('manual');
        }

        var factor = 1;
        factor = canvas.swiper.side === 'x' &&
          canvas.swiper.control === 'front' ? -1 : factor;
        factor = canvas.swiper.side === 'y' &&
          canvas.swiper.control === 'right' ? -1 : factor;
        factor = canvas.swiper.side === 'x' &&
          canvas.swiper.control === 'bottom' ? -1 : factor;
        canvas.swiper.degree = (canvas.swiper.start[canvas.swiper.turn] -
            canvas.swiper.move[canvas.swiper.turn]) /
          canvas.swiper.size[canvas.swiper.side] * 90 * factor;
        $gripAxis.css({
          transform: 'rotate3d(' +
            rotate3d[canvas.swiper.axis] +
            canvas.swiper.degree + 'deg)'
        });
      }
    }
  };

  /**
   * @jsdoc function
   * @name rubics.initSwiper
   * @description
   *   init the Swiper
   */
  var initSwiper = function(e) {

    canvas.swiper = {};
    canvas.swiper.control = $(this).data('control');
    canvas.swiper.play = true;
    canvas.swiper.sides = {
      'x': $(this).data('x'),
      'y': $(this).data('y')
    };
    canvas.swiper.size = {
      'x': e.target.clientWidth,
      'y': e.target.clientHeight
    };
    canvas.swiper.start = {
      'x': e.offsetX || e.originalEvent.layerX,
      'y': e.offsetY || e.originalEvent.layerY
    };
    canvas.swiper.delta = {
      'x': canvas.swiper.size.x / canvas.swiper.start.x,
      'y': canvas.swiper.size.y / canvas.swiper.start.y
    };

  };

  /**
   * @jsdoc function
   * @name rubics.moveCube
   * @description
   *   rotates the cube itself
   */
  var moveCube = function(e) {
    if (!canvas.down) {
      return false;
    }
    e.preventDefault();
    var x = (e.pageX - canvas['mouse']['x']) / 4;
    var y = (e.pageY - canvas['mouse']['y']) / -4;
    var transformation = '';
    if ((x > canvas.threshold ||
        x < -1 * canvas.threshold) &&
      canvas['axis'] !== 'x') {
      canvas['axis'] = 'y';
      transformation += 'rotate3d(0, 1, 0, ';
      transformation += x * cubeRotationSpeed;
      transformation += 'deg) ';
      transformation += canvas['css'];
      canvas['mouse']['distance'] = x;
      canvas.moved = true;
    } else if ((y > canvas.threshold ||
        y < -1 * canvas.threshold) &&
      canvas['axis'] !== 'y') {
      canvas['axis'] = 'x';
      transformation += 'rotate3d(1, 0, 0, ';
      transformation += y * cubeRotationSpeed;
      transformation += 'deg) ';
      transformation += canvas['css'];
      canvas['mouse']['distance'] = y;
      canvas.moved = true;

    } else {
      canvas.moved = false;
      return false;
    }
    if (canvas.moved) {
      $('.cube-wrapper').css({
        transform: transformation
      });
    }
  };

  /**
   * @jsdoc function
   * @name rubics.releaseCuber
   * @description
   *   release the Cube
   */
  var releaseCube = function(e) {
    if (canvas.down) {
      canvas.down = false;
      if (!canvas.moved) {
        return false;
      }
      canvas.moved = false;
      canvas['mouse']['end'] = +new Date();
      canvas['mouse']['time'] = canvas['mouse']['end'] -
        canvas['mouse']['start'];
      canvas['mouse']['bouce'] = (canvas['mouse']['distance'] /
          canvas['mouse']['time']) *
        100;
      canvas['css'] = $('.cube-wrapper')[0].style.transform;
      canvas['mouse']['bouce'] = Math.abs(canvas['mouse']['bouce']) <=
        5 ? 0 : canvas['mouse']['bouce'];
      $('.cube-wrapper').css({
        transitionDuration: Math.min(Math.abs(canvas['mouse']['bouce'] *
            20), 300) +
          'ms',
        transform: 'rotate3d(' +
          rotate3d[canvas['axis']] +
          canvas['mouse']['bouce'] *
          cubeRotationSpeed +
          'deg) ' +
          canvas['css']
      }).one('transitionend', function() {
        $('.cube-wrapper').css({
          transitionDuration: ''
        });
      });
    }
  };

  /**
   * @jsdoc function
   * @name rubics.onMouseDown
   * @description
   *   check where we are then perform cubeRotation
   *   if not on buttons or cube
   */
  var onMouseDown = function(e) {
    e.preventDefault();
    if ($(e.target).is('.swiper') ||
      $(e.target).closest('.controls').length) {
      return false;
    }
    canvas.down = true;
    canvas['axis'] = false;
    canvas['mouse']['x'] = e.pageX;
    canvas['mouse']['y'] = e.pageY;
    canvas['css'] = $('.cube-wrapper')[0].style.transform;
    canvas['mouse']['start'] = +new Date();
  };

  $(function() {
    var $themer = $('.themer');
    var $canvas = $('.canvas');
    $gripAxis = $('.grip').find('.axis-grip:first');

    $(document)
      .on('mousedown', onMouseDown)
      .on('mouseup', releaseCube)
      .on('mousemove', moveCube);

    $('.swiper')
      .on('mousedown', initSwiper)
      .on('mouseleave mouseup', releaseSwiper)
      .on('mousemove', moveSwiper);

    $('.themer')
      .on('click', function() {
        var theme = $(this).data('theme');
        $canvas.removeClass(classWithPrefix(/^theme-/));
        $themer.removeClass('selected');
        $canvas.addClass('theme-' + theme);
        $(this).addClass('selected');
      });

    // $('.scrambler')
    //   .on('click', function() {
        
    //   });

    $(document).ready(function(){
      setTimeout(function(){
        scrambleCube(15);
      }, 1000);
    });

  });
})(window.jQuery, window, document);