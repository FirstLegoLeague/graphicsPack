var clock = (function() {
	
	var bgColor = 'black';
    var state = 'stopped';
    var time = 150000;
    var armTime = 150;
    var tenths = false;
    var size = 340;
    var pos = {
        x: 0,
        y: 0
    };

    function getClockDiv() {
    	return document.getElementById('clock');
    }

    function pad(str) {
        str = ''+str;
        if (str.length<2) {
            str = '0'+str;
        }
        return str;
    }
    
    function setTime(msec,hundreds) {
    	if (msec < 0) {
    		zero();
    		return;
    	}

        var secs = Math.floor(msec/1000);
        var hsec = Math.floor((msec/100)) % 10;
        var sec = secs % 60;
        var min = Math.floor((secs-sec)/60);
        var str = pad(min)+':'+pad(sec);
        if (hundreds) {
            // str += '.'+hsec;
            str = pad(sec)+'.'+hsec;
        }
        getClockDiv().innerHTML = str;
        getClockDiv().className = state;
    };

	var arm = function(countdown) {
        armTime = countdown||armTime;
        pauseTime = false;
        time = armTime*1000;
        state = 'armed';
        show();
        setTime(time,tenths);
    };

    var playPause = function(pauseStamp) {
        pauseStamp = pauseStamp||(+new Date());
        if (state === 'started') {
            var startTime = (pauseTime||armTime);
            var t = (startTime*1000) - (pauseStamp - (startStamp||pauseStamp));
            time = t;
            state = 'paused';
            pauseTime = t/1000;
        } else {
            start(pauseStamp);
        }
    };

    var start = function(startTime,countdown) {
        if (countdown) {
            arm(countdown);
        }
        startStamp = startTime||(+(new Date()));
        state = 'started';
        tick();
    };

    var stop = function() {
        state = 'stopped';
        pauseTime = false;
        getClockDiv().className = state;
        window.setTimeout(hide,3000);
    };

    var zero = function() {
        time = 0;
        stop();
        setTime(time,tenths);
    };

    var toggle = function() {
        if (state == 'started') {
            stop();
        } else {
            start();
        }
    };

    var mode = function() {
        tenths = !tenths;
    };

    var tick = function() {
        if (state === 'started') {
            var now = +(new Date());
            var startTime = (pauseTime||armTime);
            time = (startTime*1000) - (now - startStamp);
            if (time < 10000) {
            	tenths = true;
            }
            setTime(time,tenths);
            window.setTimeout(tick,1);
        }
    };

    function show() {
    	getClockDiv().className = state;
    }

    function hide() {
    	getClockDiv().className = 'hidden stopped';
    }

	return {
		start: start,
		stop: stop,
		arm: arm,
		show: show,
		hide: hide
	};
}());