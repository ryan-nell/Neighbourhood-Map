import React, { Component } from 'react';
import './App.css';
import { displayGoogleMap, loadPlaces } from './utils'

class App extends Component {

  state = {
    query: ''
  }


  componentDidMount() {
    let loadMap = displayGoogleMap();
    let placesPromise = loadPlaces();


    // Take Array of promises to resolove
    Promise.all([
      loadMap,
      placesPromise
    ])
    // Return Array of values
    .then(values => {
      let google = values[0];
      this.places = values[1].response.venues;

      this.google = google;
      this.markers = [];

      // Create new infoWindow
      this.infoWindow = new google.maps.InfoWindow();

      // Create new map and center around first venue in places array
      this.map = new google.maps.Map(document.getElementById('map') , {
        center: {
          lat: this.places[0].location.lat,
          lng: this.places[0].location.lng
        },
        zoom: 13,

      });

      // Loop through each venue from foursquare and place a marker
      this.places.forEach(place => {
        let marker = new google.maps.Marker({
          position: {
            lat: place.location.lat,
            lng: place.location.lng
          },
          map: this.map,
          venue: place,
          id: place.id,
          name: place.name,
          animation: google.maps.Animation.DROP
        });
        marker.addListener('click', () => {
          if (marker.getAnimation() !== null) { marker.setAnimation(null); }
				  else { marker.setAnimation(google.maps.Animation.BOUNCE); }
				  setTimeout(() => { marker.setAnimation(null) }, 1500);
			  });

        // push each marker to an array
        this.markers.push(marker);

        this.setState({
          filteredPlaces: this.places
        });
        // Add infoWindow when marker is clicked
        google.maps.event.addListener(marker, 'click', () => {
          this.infoWindow.setContent(marker.name);
          this.infoWindow.open(this.map, marker);
        });
      });
    });
  }

  // display infoWindow on marker when list item is clicked
  listItemClicked = (place) => {
    let marker = this.markers.filter(item => item.id === place.id )[0];
    this.infoWindow.setContent(marker.name);
    this.infoWindow.open(this.map, marker);
    
  }

  // function to filter markers and places list according to input
  filterVenue(query) {
    let filteredPlacesList = this.places.filter(place => place.name.toLowerCase().includes(query.toLowerCase()));
    this.markers.forEach(marker => {
      marker.name.toLowerCase().includes(query.toLowerCase()) === true ?
      marker.setVisible(true)
      : marker.setVisible(false)
    });
    this.setState({
      filteredPlaces: filteredPlacesList,
      query
    });
    console.log(query)
  }



  render() {
    return (
      <div className="map-container">

        <div id="sidebar">
          <input placeholder="Seacrh Places" value={this.state.query} onChange={(e) =>{this.filterVenue(e.target.value)}} />
          <br/>
          {
            this.state.filteredPlaces && this.state.filteredPlaces.length > 0 &&
            this.state.filteredPlaces.map((place) => (
              <div key={place.id} className="place-item" onClick={() => {this.listItemClicked(place)}}>
                <li tabIndex="0" className="list-place" aria-label="places-list">{place.name}</li>
              </div>
            ))
          }
        </div>
        <div id="map"></div>
      </div>
    );
  }
}

export default App;
