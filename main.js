function initMap () {
    //your loc
    var loc = { lat: 33.6405, lng: -117.8443};
    //centered map on location
    var map = new google.maps.Map(document.querySelector('.map'),
    {
        zoom: 14,
        center: loc
    });

    //the marker, positioned at location    
    var marker = new google.maps.Marker({ position: loc, map: map});
}

async function geoCode(gLoc, yLoc) {

    try {
        var googeLoc = gLoc;
        var yelpLoc = yLoc;
        
        const resGmaps = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: googeLoc,
                key: 'AIzaSyDoW4v0uN_WxxY_A7loojVlWHBjpq048Cw'
            }
        });

        const resYelp = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=bubble%20tea&location=${yelpLoc}`, {
            headers: {
                Authorization: `Bearer 7BnZn_6SeOXxlAE8wuqRWykTeflmckkpnRlMazfuWmuG28AO-zdmTkkv09UtlZelIIMiinXy02RFHz5SCczCJzk-jIfo7TVtn3g6wrRUI0f6tfzODCz5c5UnlG6ZXXYx`
            }
        });
        
        //console.log(response);
        //console.log(resYelp.data.businesses);
        var lat = resGmaps.data.results[0].geometry.location.lat;
        var lng = resGmaps.data.results[0].geometry.location.lng;
        var yelpData = resYelp.data.businesses;
        console.log(yelpData);
        await getMap(lat, lng, resGmaps);
        await placeBobaMarkers(yelpData);
    } catch (error) {
        console.log(error);
    }
}

function getMap (x,y,r) {
    var location = new Object();
    location.lat = x;
    location.long = y;
    var initAddress = r.data.results[0].formatted_address;
    map = new google.maps.Map(document.querySelector('.map'),{
        center: {lat: location.lat, lng: location.long},
        zoom: 15
    }); 
    var marker = new google.maps.Marker({
        position: {lat: location.lat, lng: location.long }, 
        map: map,
        address: initAddress
    });
}

function placeBobaMarkers (boba) {
    //debugger;
    for (var i = 0; i < boba.length; i++) 
    {
        var place = boba[i];
        var latlng = {lat: boba[i].coordinates.latitude, lng: boba[i].coordinates.longitude};
        let content = `<h3>${place.name}</h3>`
        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

        var marker = new google.maps.Marker ({
            position: latlng,
            map: map,
            title: place.name,
            icon: iconBase + 'poi.png'
        });

        var infowindow =  new google.maps.InfoWindow({
            content: content
        });

        bindInfoWindow(marker, map, infowindow, content);
        marker.setMap(map);

    }


//     var bobaCoord = new google.maps.LatLng(boba.lat, boba.long);
    
//     var request = {
//         location: bobaCoord,
//         radius: '2000',
//         type: ['cafe']
//     };

//     var service = new google.maps.places.PlacesService(map);
//     service.nearbySearch(request, callback);
// }

// function callback(results, status) {
//     if (status == google.maps.places.PlacesServiceStatus.OK) {
//         console.log(results);
//         for (var i = 0; i < results.length; i++) {
//             console.log(results[i].name);
//         }

    //    for (var i = 0; i < results.length; i++)
    //    {
    //        var place = results[i];
    //        let content = `<h3>${place.name}</h3>`;

    //        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

    //        var marker = new google.maps.Marker ({
    //             position: place.geometry.location,
    //             map: map,
    //             title: place.name,
    //             icon: iconBase + 'parks.png'
    //        });

    //        var infowindow = new google.maps.InfoWindow({
    //            content: content
    //        });

    //        bindInfoWindow(marker, map, infowindow,content);
    //        marker.setMap(map);
    //    }  
    }

    function bindInfoWindow(marker, map, infowindow, html) {
        marker.addListener('click', function() {
            infowindow.setContent(html);
            infowindow.open(map, this);
        });
    }

  
document.querySelector(".search-btn").addEventListener('click', () => {
    var userLoc = document.querySelector("input").value;
    var yelpInput = userLoc.replace(/ /g, "%20")
    geoCode(userLoc, yelpInput);
    
}
);




