//Top Navigation handling of next , previous , home and help button.
var topNav = function(obj) {
    if (obj instanceof topNav)
        return obj;
    if (!(this instanceof topNav))
        return new topNav(obj);
};

topNav.prototype.init = function() {
    topNav.initializeEvents();
};

//Binding events
topNav.prototype.initializeEvents = function() {
   
    var helpButton = $('.nav-help'),
        homeButton = $('.nav-home'),
        prevButton = $('.nav-previous'),
        nextButton = $('.nav-next-highlight'),
        chapterButton = $('.chapter-button'),
        subChapterButton = $('.subchapter-button'),
        chapterTitle = $('.chapter-segment .chapter-title');
   
    helpButton.bind('click',function(){
        $('#discoverModalWindow').modal('show');
    });    
    
    homeButton.bind('click',function(){
        $('#introWrapper').removeClass('hide');
        $('#stories').addClass('hide');
        $('.discoverTab').addClass('hide');
        chapterButton.removeClass('button-active');
        subChapterButton.removeClass('button-active');
        chapterTitle.removeClass('title-active');
        bottomNavigation.lastScreenData = '15,2';
        slider.resetSlider();        
    }); 
       
    prevButton.bind('click',function(){
        var lastScreen = (bottomNavigation.lastScreenData == null)? '1,1'  : bottomNavigation.lastScreenData;
        
        if(bottomNavigation.lastScreenData == '1,1'){
            homeButton.trigger('click');
        }
        
        var dontContinueToNextScreen = topNav.handleSlider(true);
        if(dontContinueToNextScreen) return;
        
        if($('.subchapter-button[data-screen="'+lastScreen+'"]').prev('.subchapter-button').length){
            $('.subchapter-button[data-screen="'+lastScreen+'"]').prev('.subchapter-button').trigger('click');
        }else{
            var lastChapterSub = $('.subchapter-button[data-screen="'+lastScreen+'"]').closest('span[class^="chapter"]').prev('span[class^="chapter"]').find('.subchapter-button');
            lastChapterSub.eq(lastChapterSub.length - 1).trigger('click');
        }
    }); 
    
    nextButton.bind('click',function(){
        var lastScreen = (bottomNavigation.lastScreenData == null)? '1,1'  : bottomNavigation.lastScreenData;                        
        
        var dontContinueToNextScreen = topNav.handleSlider(false);        
        if(dontContinueToNextScreen) return;
        
        if($('.subchapter-button[data-screen="'+lastScreen+'"]').next('.subchapter-button').length){
            $('.subchapter-button[data-screen="'+lastScreen+'"]').next('.subchapter-button').trigger('click');
        }else{
            $('.subchapter-button[data-screen="'+lastScreen+'"]').closest('span[class^="chapter"]').next('span[class^="chapter"]').find('.subchapter-button').eq(0).trigger('click');
        }
    });    

};

// Handle slider from top navigation.
topNav.prototype.handleSlider = function(isPrevClicked) {
    
    var screenData = app.chapterData["chapter" + bottomNavigation.chapter]["sub" + bottomNavigation.subChapter];
    
    if(screenData.showSlider.toLowerCase() == "true"){
        if(screenData.isAutoSlider.toLowerCase() == 'yes'){
            slider.motionTrigger = 'click';
            
            //Make the slider reverse if previous is clicked.
            slider.isReverseSlider = isPrevClicked;                        
            
            //IF slider is not moving then play the slider.
            if(!slider.isSliderMoving){                
                clearInterval(slider.interval);
                slider.addSetInterval();
                
                if(slider.currentValue == slider.lowerBound){
                    return (isPrevClicked)?false:true;
                }else if(slider.currentValue == slider.upperBound){
                    return (isPrevClicked)?true:false;
                }                                         
                
            }else{
                //If slider is moving then returned
                return true;
            }
            
            //If slider move to the end points then dont return.
            if(!slider.isEndReached){
                return true;         
            }
        }else{
            if(isPrevClicked){
                slider.isReverseSlider = isPrevClicked;
                
                //If slider is at the s
                if(slider.currentValue == slider.lowerBound){
                    return false;         
                }
                
                //IF slider is not moving then play the slider.
                if(!slider.isSliderMoving){                    
                    clearInterval(slider.interval);
                    slider.addSetInterval();                                                         
                }
                return true;  
            }
        } 
    }
    
    return false;
};

// Calling Init Method
var topNav = new topNav();

(function() {
    topNav.init();
})();