import React, { Component } from 'react';
import './App.css';
import { initMap, loadPlaces } from './utils'

class App extends Component {

  componentDidMount() {
    let loadMap = initMap();
    let placesPromise = loadPlaces();

    // Take Array of promises to resolove
    Promise.all([
      loadMap,
      placesPromise
    ])
    // Return Array of values
    .then(values => {
      let google = values[0];
      let places = values[1].response.venues;

      this.google = google;
      this.markers = [];
      console.log(values)

      // Create new map
      this.map = new google.maps.Map(document.getElementById('map') , {
        center: {
          lat: places[0].location.lat,
          lng: places[0].location.lng
        },
        zoom: 12,
      });

      // Loop through each venue from foursquare and place a marker
      places.forEach(place => {
        let marker = new google.maps.Marker({
          position: {
            lat: place.location.lat,
            lng: place.location.lng
          },
          map: this.map,
          venue: place,
          name: place.name,
          animation: google.maps.Animation.DROP
        });
        this.markers.push(marker);
        console.log(place)
      });
    });
  }

  render() {
    return (
      <div id="map">

      </div>
    );
  }
}

export default App;
