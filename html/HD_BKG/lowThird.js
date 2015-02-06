var lowThird = (function() {
    var visible = false;
    var timer;

    function getLowerThird() {
        return document.getElementById('lowThird');
    }
    function persist() {
        getLowerThird().className = '';
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    }
    function showLowerThird() {
        persist();
        timer = setTimeout(hideLowerThird,5000);
    }
    function hideLowerThird() {
        getLowerThird().className = 'hidden';
    }
    function setText(txt1,txt2) {
        if (txt1 || txt2) {
            getLowerThird().innerHTML = '<b>'+(txt1||'')+'</b><br>'+(txt2||'');
        }
    }
    function doCommand(cmd) {
        switch(cmd) {
            case 'show': showLowerThird(); break;
            case 'persist': persist(); break;
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
        persist: persist,
        toggle: toggle
    };
}());