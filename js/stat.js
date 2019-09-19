'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var SHADOW_X = 110;
var SHADOW_Y = 20;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var BORDER_GAP = 55;
var GAP = 50;
var BAR_WIDTH = 40;
var GAP_TOP = 100;
var GAP_BOTTOM = 20;
var barHeight = CLOUD_HEIGHT - GAP_TOP - GAP_BOTTOM;
var STAT_GAP = 10;
var TEXT_Y = 270;


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (elements) {
  var maxElement = elements[0];
  for (var i = 1; i < elements.length; i++) {
    if (maxElement < elements[i]) {
      maxElement = elements[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, SHADOW_X, SHADOW_Y, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 125, 42);
  ctx.fillText('Список результатов:', 125, 66);

  var maxStatistics = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + BORDER_GAP + (BAR_WIDTH + GAP) * i, GAP_TOP + (barHeight - (barHeight * times[i] / maxStatistics)) - STAT_GAP);
    ctx.fillText(names[i], CLOUD_X + BORDER_GAP + (BAR_WIDTH + GAP) * i, TEXT_Y);
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.fillRect(CLOUD_X + BORDER_GAP + (BAR_WIDTH + GAP) * i, GAP_TOP + (barHeight - (barHeight * times[i] / maxStatistics)), BAR_WIDTH, barHeight * times[i] / maxStatistics);
    } else {
      ctx.fillStyle = 'hsl(' + 240 + ',' + Math.round(Math.random() * 100) + '%,' + Math.round(Math.random() * 100) + '%)';
      ctx.fillRect(CLOUD_X + BORDER_GAP + (BAR_WIDTH + GAP) * i, GAP_TOP + (barHeight - (barHeight * times[i] / maxStatistics)), BAR_WIDTH, barHeight * times[i] / maxStatistics);
    }
  }

};
