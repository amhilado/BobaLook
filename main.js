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

async function geoCode(loc) {

    try {
        var location = loc;
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: location,
                key: 'AIzaSyDoW4v0uN_WxxY_A7loojVlWHBjpq048Cw'
            }
        });
        //console.log(response);
        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;
        await getMap(lat, lng, response);
    
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

    getBoba(location);

}

function getBoba (boba) {
    var bobaCoord = new google.maps.LatLng(boba.lat, boba.long);
    
    var request = {
        location: bobaCoord,
        radius: '2000',
        type: ['cafe']
    };

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].name);
        }

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
  }


  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=bubble%20tea&location=9321%20Sabre%20Lane",
    "method": "GET",
    "headers": {
      "Authorization": "Bearer 7BnZn_6SeOXxlAE8wuqRWykTeflmckkpnRlMazfuWmuG28AO-zdmTkkv09UtlZelIIMiinXy02RFHz5SCczCJzk-jIfo7TVtn3g6wrRUI0f6tfzODCz5c5UnlG6ZXXYx",
      "User-Agent": "PostmanRuntime/7.17.1",
      "Accept": "*/*",
      "Cache-Control": "no-cache",
      "Postman-Token": "3c3535af-c875-4644-81cd-af65e26e0fe2,57d58b15-7756-49d4-9181-c4e00f578af8",
      "Host": "api.yelp.com",
      "Accept-Encoding": "gzip, deflate",
      "Connection": "keep-alive",
      "cache-control": "no-cache"
    }
  }

  function yelpReq() {
    $.ajax(settings).done(function (response) {
        console.log(response);
      });
  }
  
document.querySelector(".search-btn").addEventListener('click', () => {
    var userLoc = document.querySelector("input").value;
    geoCode(userLoc);
    yelpReq();
}
);
