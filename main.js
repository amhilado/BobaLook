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

async function geocode2(loc) {

    try {
        var location = loc;
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: location,
                key: 'AIzaSyCW98AO9A0h3LdKRi4kli0oZA6o2pmmviw'
            }
        });
        console.log(response);
        
        //await getMap(lat, lng, response);
        
        //insert googleMaps function here!!!!!!!!!!!!
        //await setMap (lat, lng); 
        //await getMap (lat,lng);


    } catch (error) {
        console.log(error);
    }
}