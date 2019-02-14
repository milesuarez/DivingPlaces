const mapcenter = {
  	  lat: 44,
  	  lng: -3
    };
const map = new google.maps.Map(
      document.getElementById('map'),
    {
      zoom: 11,
      center: mapcenter
    }
    );
const myMarker = new google.maps.Marker({
    position: mapcenter,
    map: map,
    title: "Dive"
    
    })





