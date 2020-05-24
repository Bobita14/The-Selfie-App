//iniatial function called when the progrm starts(for p5.js)
function setup(){
    //create camera video
    noCanvas(); //p5.js automatically creates a canvas that we dont need
    const video = createCapture(VIDEO);
    video.size(300, 300);
    video.parent('video');

    // Create the map
    const mymap = L.map('map').setView([0, 0], 13);

    // load tiles from street map
    const tile_url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    const tiles = L.tileLayer(tile_url);

    tiles.addTo(mymap);

    //add the location marker to the map
    marker = L.marker([0,0]).addTo(mymap);
    mymap.setView([49.2,-0.37], 5);

    //if geolocate button push
    document.getElementById('geolocate').addEventListener('click', event => {
        if (document.getElementById('fname').value != ''){
            if ('geolocation' in navigator) {
            /* geolocation is available */
            navigator.geolocation.getCurrentPosition(async position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            //Set the market lat and lon
            marker.setLatLng([lat, lon]);
            //center the map on the iss
            mymap.setView([lat, lon], mymap.getZoom());
            document.getElementById('lat').textContent = lat;
            document.getElementById('lon').textContent = lon;
            const name = document.getElementById('fname').value;

            //encoded in base64
            video.loadPixels(); //take the video element, load the pixels on a canvas, which allows me then to convert it to base64
            const image64 = video.canvas.toDataURL();

            //send data back to the server
            const data = {lat, lon, name, image64};
            const options = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            }
            const response = await fetch('/api', options);
            const json = await response.json();
            console.log(json);
            alert('Success, your location was saved!')
            });
            }
            else {
                /* geolocation IS NOT available */
                alert('Geolocation not available.')
            }
        }
        else{
            alert('You have not entered a name!')
        }
        
    })
}       