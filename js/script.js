
//initialize leaflet map, and move zoom control to top right
var map = L.map('map', {zoomControl: false})
  .addControl( L.control.zoom({position: 'topright'}) )
  .setView([38.6, -93.99], 5);


//sadd basemap tiles from mapbox
L.tileLayer('http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png', {
   attribution: 'Map Tiles: Stamen Design &mdash; Map Data: OpenStreetMap &mdash; Source: US Census Bureau',
    maxZoom: 13,
    minZoom: 4
}).addTo(map);

//add scale bar
L.control.scale({
  imperial: true,
  metric: false
}).addTo(map);


//About box click listeners
$('#about').on('click',function(){
  $('#mask').fadeIn(250);
  $('.popup').fadeIn(250);
});

$('.close').on('click',function(){
  $(this).parent().fadeOut(250);
  $('#mask').fadeOut(250);
});

 function stateName(t) {
  return t == 'AL'  ? 'Alabama' :
        t ==  'AK'  ? 'Alaska'  :
        t ==  'AZ'  ? 'Arizona' :
        t ==  'AR'  ? 'Arkansas'  :
        t ==  'CA'  ? 'California'  :
        t ==  'CO'  ? 'Colorado'  :
        t ==  'CT'  ? 'Connecticut' :
        t ==  'DE'  ? 'Delaware'  :
        t ==  'FL'  ? 'Florida' :
        t ==  'GA'  ? 'Georgia' :
        t ==  'HI'  ? 'Hawaii' :
        t ==  'ID'  ? 'Idaho' :
        t ==  'IL'  ? 'Illinois' :
        t ==  'IN'  ? 'Indiana' :
        t ==  'IA'  ? 'Iowa'  :
        t ==  'KS'  ? 'Kansas'  :
        t ==  'KY'  ? 'Kentucky'  :
        t ==  'LA'  ? 'Louisiana' :
        t ==  'ME'  ? 'Maine' :
        t ==  'MD'  ? 'Maryland'  :
        t ==  'MA'  ? 'Massachusetts' :
        t ==  'MI'  ? 'Michigan'  :
        t ==  'MN'  ? 'Minnesota' :
        t ==  'MS'  ? 'Mississippi' :
        t ==  'MO'  ? 'Missouri'  :
        t ==  'MT'  ? 'Montana' :
        t ==  'NE'  ? 'Nebraska'  :
        t ==  'NV'  ? 'Nevada'  :
        t ==  'NH'  ? 'New Hampshire' :
        t ==  'NJ'  ? 'New Jersey'  :
        t ==  'NM'  ? 'New Mexico'  :
        t ==  'NY'  ? 'New York'  :
        t ==  'NC'  ? 'North Carolina'  :
        t ==  'ND'  ? 'North Dakota'  :
        t ==  'OH'  ? 'Ohio'  :
        t ==  'OK'  ? 'Oklahoma'  :
        t ==  'OR'  ? 'Oregon'  :
        t ==  'PA'  ? 'Pennsylvania'  :
        t ==  'RI'  ? 'Rhode Island'  :
        t ==  'SC'  ? 'South Carolina'  :
        t ==  'SD'  ? 'South Dakota'  :
        t ==  'TN'  ? 'Tennessee' :
        t ==  'TX'  ? 'Texas' :
        t ==  'UT'  ? 'Utah'  :
        t ==  'VT'  ? 'Vermont' :
        t ==  'VA'  ? 'Virginia'  :
        t ==  'WA'  ? 'Washington'  :
        t ==  'WV'  ? 'West Virginia' :
        t ==  'WI'  ? 'Wisconsin' :
        t ==  'WY'  ? 'Wyoming' :
                      'DC' ;
}


//Start_Date color
// function yearColor(d) {
//     return d == '2010'   ? '#eff3ff' :
//            d == '2011+'  ? '#c6dbef' :
//            d == '2011'   ? '#9ecae1' :
//            d == '2012+'  ? '#6baed6' :
//            d == '2012'   ? '#3182bd' :
//            d == '2013'   ? '#08519c' :
//                            '#FF00FF' ; 

// }

//Rekha said make year gray
// function yearColor(d) {
//     return d == '2010'   ? '#f7f7f7' :
//            d == '2011+'  ? '#d9d9d9' :
//            d == '2011'   ? '#D1D1D1' :
//            d == '2012+'  ? '#969696' :
//            d == '2012'   ? '#636363' :
//            d == '2013'   ? '#252525' :
//                            '#FF00FF' ; 

// }

//this is what gray legend looks like
function yearColor(d) {
    return d == '2010'   ? '#F9F9F9' :
           d == '2011+'  ? '#E4E4E4' :
           d == '2011'   ? '#D1D1D1' :
           d == '2012+'  ? '#B5B5B5' :
           d == '2012'   ? '#929292' :
           d == '2013'   ? '#666666' :
                           '#FF00FF' ; 
}

//3/22/15: adding a new version of yearColor that ignores the +. Rekha requested this. 
//         but she wants to be able to switch back to the other version too. So I'll keep that code
function yearColorShort(d) {
    return d == '2010'   ? '#f7f7f7' :
           d == '2011+'  ? '#cccccc' :
           d == '2011'   ? '#cccccc' :
           d == '2012+'  ? '#969696' :
           d == '2012'   ? '#969696' :
           d == '2013'   ? '#525252' :
                           '#FF00FF' ; 
}


//cluster recruitment color
function binaryColor(d) {
    return d == '0' ? "#FFFFFF" :
           d == '1' ? "#000000" :
                      "#FF00FF" ;
}

//cluster recruitment weight
function getWeight(d) {
    return d == '0' ? 2 :
           d == '1' ? 4 :
                      5 ;
}


function yesNo(v) {
  return v == '0' ? "No"  :
         v == '1' ? "Yes" :
                    "BAD VALUE";
}


// function countLottery(a, b) {
//     return a * b;
// }

//count number of schools in a district, and number of cluster recruited schools in a district
//Dad and I worked on this in Oregon, but we couldn't get it to work. 
// function countSchool(feature, state, district) {
//   var s = 0;
//   //for (state == feature.properties.state in feature) {
//     var len = feature.length;
//     for (i=0; i != len; i++){
//       if (feature[i].properties.state == state)
//         s++;
//     }
//   }
//   return s;
// }

    //load geojson and style by data
    $.getJSON('CT/schoolswithgrant.geojson',function(data){
        var geojsonLayer = L.geoJson(data.features, {
            pointToLayer: function (feature, latlng) {

                //circle
                var marker = L.circleMarker(latlng, {
                    radius: 12,
                    fillColor: yearColorShort(feature.properties.Start_Date),
                    color: "#000",
                    weight: getWeight(feature.properties.dir_schGrant),
                    opacity: 1,
                    fillOpacity: 1
                });
                       
                marker.bindPopup( '<font size = "2">' + "District: " + feature.properties.district + '</font>' + 
                                  '<br>' + stateName(feature.properties.State) + 
                                  '<br />' + 
                                  '<b><br />' + "Start Date: " + feature.properties.Start_Date + '</b>' + 
                                  '<b><br />' + "Grant Awarded: " + yesNo(feature.properties.dir_schGrant) + '</b>' + 
                                  '<br />' + "Cluster Recruited: " + yesNo(feature.properties.cluster_recruitment) + 
                                  '<br />' + "Full Implementer: " + yesNo(feature.properties.full_implementer));
                marker.on('mouseover', function (e) {
            this.openPopup();
        });
        marker.on('mouseout', function (e) {
            this.closePopup();
        });
                return marker; 
            }   

}).addTo(map);
    });

//year Legend
var yearLegend = L.control({position: 'bottomright'});

yearLegend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info yearLegend'),
        grades = ["2010","2011","2012","2013"],  // to include 2011+ and 2013+ in the legend ADD THEM HERE
        labels = [];

    // loop through our intervals and generate a label with a colored circle for each interval
    div.innerHTML +='<b>' + 'Start Year' + '</b><br>';
    for (var i = 0; i < grades.length -1; i++) {
        div.innerHTML +=
            '<i style="background:' + yearColorShort(grades[i]) + '"></i> ' +
            grades[i] + '<br>';
    }

    //add bold outline to last year to represent 'Received grant'
    for (var c = grades.length -1; c < grades.length; c++) {
        div.innerHTML +=
            '<c style="background:' + yearColorShort(grades[i])  + '"></c> ' +
            grades[i] + '<br>';
    }

    div.innerHTML +=  '&nbsp' + '&nbsp' + '&uarr;' + 
                     '<br><small>' + 'Received grant' + '</small>';

    return div;
};


yearLegend.addTo(map);





////CHOROPLETH Part

function choroColor(d) {
    console.log(d);
    return d <=  '1'   ? '#252525' :
           d <=  '2'   ? '#636363' :
           d <=  '3'   ? '#969696' :
           d <=  '4'   ? '#cccccc' :
                        '#f7f7f7' ;
}



function styleChoro(feature) {
    return {
        fillColor: choroColor(feature.properties.pov_rate),
        weight: .5,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.6
    };
}

L.geoJson(tractData, {style: styleChoro}).addTo(map);


//choroLegend
var choroLegend = L.control({position: 'bottomright'});

choroLegend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info choroLegend'),
        grades = [0,1,2,3,4],
        labels = [];

    // loop through our intervals and generate a label with a colored square for each interval
    div.innerHTML +='<b>' + 'Poverty Scale' + '</b><br>';
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            // '<i style="background:' + choroColor(grades[i] + .5) + '"></i> ' +
            // grades[i]+'01' + (grades[i + 1] ? ' &ndash; ' + grades[i + 1] + '00%' + '<br>' : '~~~');
               '<i style="background:' + choroColor(grades[i] + .5) + '"></i> ' +
            (grades[i+1] ? grades[i]+'01' + ' &ndash; ' + grades[i + 1] + '00%' + '<br>' : '>' + grades[i] + '00%');
    }

    return div;
};

choroLegend.addTo(map);



//Choropleth Outline
function styleOutline(feature) {
    return {
        weight: 3,
        opacity: 1,
        color: 'black',
        dashArray: '3',
        fillOpacity: 0
    };
}

L.geoJson(tractOutline, {style: styleOutline}).addTo(map);






