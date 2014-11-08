var SVG = '<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.0"><defs><path d="M 297.29747,550.86823 C 283.52243,535.43191 249.1268,505.33855 220.86277,483.99412 C 137.11867,420.75228 125.72108,411.5999 91.719238,380.29088 C 29.03471,322.57071 2.413622,264.58086 2.5048478,185.95124 C 2.5493594,147.56739 5.1656152,132.77929 15.914734,110.15398 C 34.151433,71.768267 61.014996,43.244667 95.360052,25.799457 C 119.68545,13.443675 131.6827,7.9542046 172.30448,7.7296236 C 214.79777,7.4947896 223.74311,12.449347 248.73919,26.181459 C 279.1637,42.895777 310.47909,78.617167 316.95242,103.99205 L 320.95052,119.66445 L 330.81015,98.079942 C 386.52632,-23.892986 564.40851,-22.06811 626.31244,101.11153 C 645.95011,140.18758 648.10608,223.6247 630.69256,270.6244 C 607.97729,331.93377 565.31255,378.67493 466.68622,450.30098 C 402.0054,497.27462 328.80148,568.34684 323.70555,578.32901 C 317.79007,589.91654 323.42339,580.14491 297.29747,550.86823 z" id="layer1" transform="scale(0.08)" fill="#ff1209"/></defs></svg>';

var STYLE = '@keyframes fadeout{from{opacity:1;}to{opacity:0;}}';
STYLE += '.animate0, .animate1, .animate2{'+
'  animation: fadeout .8s , flyup0 .8s ;'+
'  position: absolute;'+
'}'+
'.animate1 {'+
'  animation-timing-function: ease-out;'+
'  animation: fadeout .8s , flyup1 .8s ;'+
'}'+
'.animate2 {'+
'  animation-timing-function: ease-out;'+
'  animation: fadeout .8s , flyup2 .8s ;'+
'}';
var positions = [
  [
    [0, 0],
    [10, -10],
    [5, -20],
    [20, -30],
    [15, -40],
  ],
  [
    [0, 0],
    [-10, -10],
    [-5, -20],
    [-20, -30],
    [-15, -40],
  ],
  [
    [0, 0],
    [-5, -10],
    [5, -20],
    [-10, -30],
    [15, -40],
  ]
];
function generateFlyUP(index) {
  var str = '@keyframes flyup' + index + '{';
  var pos = positions[index];
  for (var i =0; i < 4; i++) {
    var deg = 6 * (i%3 - 1);
    var p = pos[i];
    str += (i*25) + '%{'+
      'transform:translate('+ p[0]+ 'px,' + p[1]+'px) rotate('+ deg +'deg);}';
  }
  return str+'}';
}
for (var i = 0; i < 3; i++) {
  STYLE += generateFlyUP(i);
}

STYLE = '<style>'+STYLE+'</style>';
var div = document.createElement('div');
div.innerHTML = STYLE + SVG;
document.body.appendChild(div);

var eles = document.querySelectorAll('[data-lovelive]');
eles = [].slice.call(eles);
document.body.addEventListener('click', function (e) {
  if (eles.indexOf(e.target) < 0) return;
    var target = e.target;
    var img;
    var html = (img = target.getAttribute('data-lovelive')) ?
      '<img src="'+img+'">' :
      '<svg><use xlink:href="#layer1"></svg>';
    var x = e.pageX;
    var y = e.pageY;
    for (var i = 0; i < 3; i++ ) {
      (function () {
        var heart = document.createElement('div');
        heart.className = 'animate' + i;
        heart.innerHTML = html;
        heart.style.left = x-40 + i*50*(Math.random()-0.5);
        heart.style.top = y-80 + i*40*(Math.random()-0.5);
        document.body.appendChild(heart);
        setTimeout(function() {
          document.body.removeChild(heart);
          heart = null;
        }, 800);
      })();
    }
    inAnimation = 1;
});
