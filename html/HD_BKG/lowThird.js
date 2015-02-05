var lowThird = (function() {
	var visible = false;
    var timer;
    
    function getLowerThird() {
        return document.getElementById('lowThird');
    }
    function showLowerThird() {
        getLowerThird().className = 'visible';
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    }
    function showThenHideLowerThird() {
        showLowerThird();
        timer = setTimeout(hideLowerThird,5000);
    }
    function hideLowerThird() {
        getLowerThird().className = '';
    }
    function setText(txt1,txt2) {
        getLowerThird().innerHTML = '<b>'+(txt1||'')+'</b><br>'+(txt2||'');
    }
    function doCommand(cmd) {
        switch(cmd) {
            case 'show': showLowerThird(); break;
            case 'showThenHide': showThenHideLowerThird(); break;
            case 'hide': hideLowerThird(); break;
        }
    }
    function toggle() {
    	visible ? hideLowerThird() : showLowerThird();
    }
    

    return {
    	command: doCommand,
    	set: setText,
    	show: showLowerThird,
    	hide: hideLowerThird,
    	showThenHide: showThenHideLowerThird,
    	toggle: toggle
    };
}());