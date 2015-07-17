// JavaScript Document

function $(v) {
	if (typeof v === 'function') {
		window.onload = v;
	} else if (typeof v === 'string') {
		return document.getElementById(v);
	} else if (typeof v === 'object') {
		return v;
	}
}

function getStyle(obj, attr) {
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}

function doMove(obj, attr, dir, target, endFn) {
    dir = parseInt(getStyle(obj, attr)) < target ? dir : - dir;
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var speed = parseInt(getStyle(obj, attr)) + dir;
        if (speed > target && dir > 0 || speed < target && dir < 0) {
            speed = target;
        }
        obj.style[attr] = speed + 'px';
        if (speed == target) {
            clearInterval(obj.timer);
            endFn && endFn();
        }
    }, 30);
}
function fadeIn(obj){

    var iCur = getStyle(obj,'opacity');
    if(iCur==1){ return false; }
    var value = 0;
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var iSpeed = 5;
        if (value == 100) {
            clearInterval(obj.timer);
        }else{
            value += iSpeed;
            obj.style.opacity = value/100;
            obj.style.filter = 'alpha(opacity ='+value+')';
        }
    },30);
};

function fadeOut(obj){

    var iCur = getStyle(obj,'opacity');
    if(iCur==0){ return false; }

    var value = 100;
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var iSpeed = -5;
        if (value == 0) {
            clearInterval(obj.timer);
        }else{
            value += iSpeed;
            obj.style.opacity = value/100;
            obj.style.filter = 'alpha(opacity ='+value+')';
        }
    },30);
};
function oPacity(obj, step, target, frequency, endFn) {

    var currentOpacity = getStyle(obj, 'opacity') * 100;
    step = currentOpacity < target ? step : -step;

    clearInterval(obj.alpha);

    obj.alpha = setInterval(function() {
        currentOpacity = getStyle(obj, 'opacity') * 100;
        var nextOpacity = currentOpacity + step;
        if (step > 0 && nextOpacity > target || step < 0 && nextOpacity < target) {
            nextOpacity = target;
        }
        obj.style.opacity = nextOpacity / 100;
        obj.style.filter = 'alpha(opacity:' + nextOpacity + ')';
        if (nextOpacity == target) {
            clearInterval(obj.alpha);
            endFn && endFn();
        }
    }, frequency);

}

function shake(obj, attr, endFn) {

    // if( !obj.shaked ) { return; }
    var pos = parseInt(getStyle(obj, attr)); // 有隐患的

    var arr = []; // 20, -20, 18, -18 ..... 0
    var num = 0;
    var timer = null;

    for (var i = 10; i > 0; i -= 2) {
        arr.push(i, -i);
    }
    arr.push(0);

    // obj.shaked = false;      
    clearInterval(obj.shake);
    obj.shake = setInterval(function() {
        obj.style[attr] = pos + arr[num] + 'px';
        num++;
        if (num === arr.length) {
            clearInterval(obj.shake);
            // obj.shaked = true;
            endFn && endFn();

        }
    }, 50);
}