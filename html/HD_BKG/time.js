//time specific
var time = (function() {

    var offset = 0;

    function pad(nr) {
        return ((nr<10)?'0':'')+nr;
    }

    function getTimeDiv() {
        return document.getElementById('time');
    }

    function setMsgTime(timestamp) {
        var time = new Date(timestamp).getTime(); //parse?
        offset = time - (new Date());
    }

    function time() {
        var now = new Date((offset||0) + (new Date()).getTime());
        var hh = pad(now.getHours());
        var mm = pad(now.getMinutes());
        getTimeDiv().innerHTML = hh+':'+mm;
        window.setTimeout(time,500);
    }

    function showTime() {
        getTimeDiv().className = '';
    }

    function hideTime() {
        getTimeDiv().className = 'hidden';
    }
    
    time();

    return {
        tick: time,
        show: showTime,
        hide: hideTime,
        set: setMsgTime
    };
}());
