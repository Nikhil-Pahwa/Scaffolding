// //Main application file.
// var app = function(obj) {
//     if (obj instanceof app)
//         return obj;
//     if (!(this instanceof app))
//         return new app(obj);
// };

// app.prototype.motionChartObj = null;
// app.prototype.discoverMotionChartObj = null;
// app.prototype.bubblesData = [];
// app.prototype.chapterData = [];
// app.prototype.circleMasterJSON = [];
// app.prototype.discoverJson = [];
// app.prototype.discoverAxisJson = [];
// app.prototype.filterJson = [];
// app.prototype.definitionsJson = [];
// app.prototype.xaxis = [];
// app.prototype.yaxis = [];
// app.prototype.size = [];
// app.prototype.segment = null;
// app.prototype.border = null;
// app.prototype.revenuetype = null;
// app.prototype.bubbleLabelSizes = {bold:{}};

// app.prototype.init = function() {
    
//     //To handle IE Specific CSS. Because conditional IE checks are not more supported.
//     if(util.isIE()){
//         $('html').addClass('ie');
//     }
    
//     util.animateButton(".nav-next-highlight", true);
//     app.loadJSON();
// };

// app.prototype.splitLabel = function(name) {
//   return "Rest of world" === name ? ["Rest of", "world"] : "Middle East and North Africa" === name ? ["Middle East and", "North Africa"] : "Rest of" === name 
//                 || ("Middle East and" === name || "North Africa" === name) ? [name] : name.split(" ");
// };

// //Load all JSON at once.
// app.prototype.loadJSON = function(){
    
//     //Text json containing chapter wise data.
//     d3.json("json/text.json", function(error, jsonData) {
//         app.chapterData = jsonData;
//         app.plotNavigationData(app.chapterData);        
//         app.isAllJSONLoaded();
//         $('#introWrapper #paymentText').text(jsonData.chapter0.sub0.caption);
//         $('#introWrapper #interactiveText').text(jsonData.chapter0.sub0.captionNext);
//         $('#introWrapper #getStarted').text('Get Started').show();      
//     });
    
//     //Circle json having bubble data.    
//     d3.json("json/circles.json", function(error, jsonData) {
//         app.bubblesData = jsonData;
//         app.motionChartObj = $('#svgContainer').motionChart({
//             width: 934,
//             height: 534
//         });
//         util.getPreloadedData();
//         app.isAllJSONLoaded();
//     });
    
//     //Text json containing chapter wise data.
//     d3.json("json/discoverDefinitions.json", function(error, jsonData) {
//         app.definitionsJson = jsonData;        
//         app.isAllJSONLoaded();
//     });
    
//     //Containing information about the bubble title, id and color code.
//     d3.json("json/bubbleTitle.json", function(error, jsonData) {
//         app.circleMasterJSON = jsonData;
//         getAllBubbleDimesnsions();
//         app.isAllJSONLoaded();
//     });
    
//     //Discover tab bubble data
//     d3.json("json/discover.json", function(error, jsonData) {
//         app.discoverJson = jsonData.discoverData;
//         app.isAllJSONLoaded();
//     });
    
//     //Discover tab axis information
//     d3.json("json/discoverAxis.json", function(error, jsonData) {
//         app.discoverAxisJson = jsonData;
//         app.updateXYAxis(app.discoverAxisJson);
//         app.updateSizeAxis(app.discoverAxisJson);
//         app.xaxis=app.getSelectValue($('#xaxis').val());
//         app.yaxis=app.getSelectValue($('#yaxis').val());
//         app.size=app.getSelectValue($('#size').val());
//         $('#cagrHeading').text(app.xaxis[0].nameUnits);
//         $('#valueHeading').text(app.yaxis[0].nameUnits);
//         $('#revenueHeading').text(app.size[0].nameUnits);
//         app.isAllJSONLoaded();
//     });
    
//     //Filters information applied on select box in discover tab 
//     d3.json("json/filters.json", function(error, jsonData) {
//         app.filterJson = jsonData;
//         app.populateSelectBox(app.filterJson);
//         app.isAllJSONLoaded(); 
//     });
// }

// //Make sure that all JSON is loaded and ready to use. Also handles loading text in into screen.
// app.prototype.isAllJSONLoaded = function() {
//     var isLoaded = !jQuery.isEmptyObject(app.circleMasterJSON) &&
//                    !jQuery.isEmptyObject(app.definitionsJson)   &&
//                    !jQuery.isEmptyObject(app.discoverJson)   &&
//                    !jQuery.isEmptyObject(app.discoverAxisJson) &&
//                    !jQuery.isEmptyObject(app.bubblesData) &&
//                    !jQuery.isEmptyObject(app.chapterData) &&
//                    !jQuery.isEmptyObject(app.filterJson);
    
//     if(isLoaded){
//         $('#loadingBottomPanel').css("opacity", 0);
//         $('#bottomPanel').css("opacity", 1);
//     }               
                       
// }

// // Get Select Value
// app.prototype.getSelectValue = function(id) {
//     var getObject = Enumerable.from(app.discoverAxisJson)
//         .where(function(item) {
//             return (item.code == id);
//         }).toArray();
        
//     return getObject;
// };

// // Update Chapter 5 Size Select Box
// app.prototype.updateSizeAxis = function(data) {
//     var axisSize = $('#size');
//     var getSize = Enumerable.from(data)
//         .where(function(item) {
//             return (item.size.toUpperCase() === "TRUE");
//         }).toArray();
//     app.plotSelectData(getSize, axisSize);
// };

// // Update Chapter 5 XY Axis Select Box
// app.prototype.updateXYAxis = function(data) {
//     var getXYAxis = Enumerable.from(data)
//         .where(function(item) {
//             return (item.xyAxis.toUpperCase() === "TRUE");
//         }).toArray();

//     var axis = $('#xaxis,#yaxis');
//     app.plotSelectData(getXYAxis, axis);
// };

// // Plot Data on Select Box
// app.prototype.plotSelectData = function(data, id) {
//     $.each(data, function(key, dataOptions) {
//         var option = "<option value='" + dataOptions.code + "'>" + dataOptions.name + "</option>";
//         if (dataOptions.hasOwnProperty("optGroup")) {
//             var group = dataOptions.optGroup;
//             if (id.find("optgroup[label='" + group + "']").length === 0) {
//                 id.append("<optgroup label='" + dataOptions.optGroup + "' />");
//             }
//             id.find("optgroup[label='" + group + "']").append(option);
//         } else {
//             id.append(option);
//         }
//     })
    
//     $('#yaxis option:eq(1)').attr('selected', 'selected');
//     $('#size option:eq(2)').attr('selected', 'selected');
// };

// // Plot Data in Filters
// app.prototype.populateSelectBox = function(filterData){
//     $.each(filterData.filters, function(optionIndex, object){
//         var values = object.values;
//         var selectElem = $($(".filter-container li")[optionIndex]).find('select');
        
//         $($(".filter-container li")[optionIndex]).find('.select-label span').html(object.title);
        
        
//         $.each(values, function( index, value ) {
//             $(selectElem).append(
//                 $("<option></option>").text(value).val(value)
//             );           
//         });
        
//         selectElem.val(object.defaultSelected);
//     });
    
//     app.segment = $('#segment').val();
//     app.border = $('#border').val();
//     app.revenuetype = $('#revenuetype').val();
// };

// var getAllBubbleDimesnsions = function(){
//     var labelArray,
//         heigtBuffer = 14.54,
//         svg = d3.select("body").append("svg").attr("class","tempSvg");
        
//     $.each(app.circleMasterJSON,function(index,item){
//             labelArray = app.splitLabel(item.name);

//             var maxWidth = 0,
//             height = 0;

//             for (var j=0;j < labelArray.length;j++) {
//             var targetNode = svg.append("text").attr("class", "tempText").attr("x", 100).attr("y", 300).style("fill", util.bubbleLabels.color).style("font-family", util.bubbleLabels.fontFamily).style("font-size", util.bubbleLabels.fontSize + "px").text(labelArray[j]).attr("id", "rene" + index + "z" + j);
//             var labelBox = targetNode[0][0].getBBox();

//             maxWidth = Math.max(maxWidth, labelBox.width);
//             height += labelBox.height;

//             app.bubbleLabelSizes[labelArray[j]] = {
//               width : labelBox.width,
//               height : labelBox.height
//             };

//             $(".tempText").remove();
//         }        
//         app.bubbleLabelSizes[item.name] = {
//           width : maxWidth,
//           height : height
//         };
//     });
    
//     $.each(app.circleMasterJSON,function(index,item){
//         labelArray = app.splitLabel(item.name);

//         var maxWidth = 0,
//         height = 0;
//         for (var j=0;j < labelArray.length;j++) {
//             var targetNode = svg.append("text").attr("class", "tempText").attr("x", 100).attr("y", 100).style("fill", util.bubbleLabels.boldColor).style("font-family", util.bubbleLabels.fontFamily).style("font-size", util.bubbleLabels.fontSize + "px").text(labelArray[j]).style("font-weight", "bold").attr("id", "rene" + index + "z" + j);
//             var labelBox = targetNode[0][0].getBBox();

//             maxWidth = Math.max(maxWidth, labelBox.width);
//             height += labelBox.height;

//             app.bubbleLabelSizes.bold[labelArray[j]] = {
//                 width : labelBox.width,
//                 height : labelBox.height
//             };

//             $(".tempText").remove();
//         }        
//         app.bubbleLabelSizes.bold[item.name] = {
//             width : maxWidth,
//             height : height
//         };
        
//     });
    
//     $(".tempSvg").remove();   
// }

// // Title Data plotting using json data.
// app.prototype.plotNavigationData = function (chapterData) {
//     for(var i=1;i<Object.keys(chapterData).length;i++){
//         if(chapterData["chapter" + i].sub1){
//           $('.chapter-segment .chapter-title').eq(i-1).html(chapterData["chapter" + i].sub1.rubric);
//         }
//     } 
// }

// // Calling Init Method
// var app = new app();

// (function() {
//     app.init();
// })();
