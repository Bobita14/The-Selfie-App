// Create the map
const mymap = L.map('map').setView([0, 0], 13);

// load tiles from street map
const tile_url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const tiles = L.tileLayer(tile_url);

tiles.addTo(mymap);

getData();
async function getData(){
    const response = await fetch('/api');
    const data = await response.json();

    for (item of data){
        const root = document.createElement('div');
        const name = document.createElement('div');
        const geolocation = document.createElement('div');
        const date = document.createElement('div');
        const image = document.createElement('img');

        //set a marker from each data position
        const marker = L.marker([0, 0]).addTo(mymap);
        marker.setLatLng([item.lat, item.lon]);
        marker.bindPopup(item.name).openPopup();

        name.textContent = `Name: ${item.name}`;
        name.setAttribute("id", "name");
        geolocation.textContent = `Latitude: ${item.lat}°, Longitude: ${item.lon}°`;
        const dateString = new Date(item.timestamp).toLocaleString();
        date.textContent = `Time: ${dateString}`;
        image.src = item.image64; //loading image data

        root.append(name, geolocation, date, image);
        root.setAttribute("id", "root");
        document.body.append(root);
    }
    mymap.setView([49.2,-0.37], 10);
    console.log(data);

}