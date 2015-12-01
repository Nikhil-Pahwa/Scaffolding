var util = function(obj) {
    if (obj instanceof util)
        return obj;
    if (!(this instanceof util))
        return new util(obj);
};

util.prototype.yearSeparator = '-';
util.prototype.yearHyphen = '–';
util.prototype.sliderYear;

util.prototype.init = function() {
    //Preloading tooltip images
    $.preloadImages = function() {
        for (var i = 0; i < arguments.length; i++) {
            $("<img />").attr("src", arguments[i]);
        }
    }
};

//Bubble label object
util.prototype.bubbleLabels = {
    fontSize: 13,
    fontFamily: 'arial,sans-serif',
    boldColor: '#fff',
    color: '#555'
};

//Animate button used in next button on top nav and get started button.
util.prototype.animateButton = function(element, isProminant) {
    var initOpacity = 0.5,
        timeInterval = 1000;

    if (isProminant) { //Used for top nav.
        initOpacity = 0;
        timeInterval = 1500;
    }
    setInterval(function() {
        $(element).animate({
            opacity: initOpacity
        }, timeInterval);
        $(element).animate({
            opacity: 1
        }, timeInterval);
    }, 200);
};

//Check if IE Browser
util.prototype.isIE = function() {
    return (!!navigator.userAgent.match(/Trident\/7\./)) ? true : false;
}

//Check if it is Firefox
util.prototype.isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox");

//Check if Apple device 
util.prototype.isAppleDevice = function() {
    return (
        //Detect iPhone
        (navigator.platform.indexOf("iPhone") != -1) ||
        //Detect iPod
        (navigator.platform.indexOf("iPod") != -1) ||
        //Detect iPad
        (navigator.userAgent.match(/iPad/i) != null) 
    );
}

//To convert upto two decimal point
util.prototype.toDecimalPoint = function(num) {
    return parseInt(num).toFixed(2);
};

//Replace negative sign with loadash sign
util.prototype.replaceNegativeSignIfExist = function(str){
    return str.toString().replace(/-/g,'–');        
}

//Used to get image array
util.prototype.getPreloadedData = function() {
    $.each(app.bubblesData, function(chapterIndex, chapterItem) {
        $.each(chapterItem, function(subIndex, subItem) {
            $.each(subItem, function(frameIndex, frameItem) {
                $.each(frameItem, function(bubbleIndex, bubbleItem) {
                    // console.log('Bubble - ',bubbleIndex, ' -- ',bubbleItem,' -- ',bubbleItem.popUp);
                    if (bubbleItem.popUp.imagedata.graphicFileName != "")
                        $.preloadImages(bubbleItem.popUp.imagedata.graphicFileName);
                });
            });
        });
    });
};

//Split the time period range used in slider 
util.prototype.splitHyphen = function(timePeriod) {

    if (timePeriod.indexOf(util.yearSeparator) > 0) {
        util.sliderYear = timePeriod.split(util.yearSeparator)
    } else if (timePeriod.indexOf(util.yearHyphen) > 0) {
        util.sliderYear = timePeriod.split(util.yearHyphen)
    } else {
        console.log('data issue in timePeriod')
    }
    return util.sliderYear;
};


// Calling Init Method
var util = new util();

(function() {
    util.init();
})();
