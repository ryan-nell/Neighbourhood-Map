export function displayGoogleMap() {
  return new Promise((resolve) => {
    //define global callback that runs when maps is loaded
    window.initMap = () => {
      // resolve the global object
      resolve(window.google);
      // delete the global as its no longer needed
      console.log('loaded');
      delete window.initMap;
    };
    // load the google maps API
    const script = document.createElement("script");
    const apiKey = '[INSERT_GOOGLE_KEY_HERE]';

    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    document.body.appendChild(script);
  });
}

export function loadPlaces() {
  let city = 'Dublin, Ireland';
  let query = 'Food';
  let apiUrl = 'https://api.foursquare.com/v2/venues/search?client_id=[INSERT_FOURSQAURE_KEY_HERE]&client_secret=[INSERT_FOURSQAURE_KEY_HERE]&v=20130815%20&limit=20&near=' + city + '&query=' + query + '';
  return fetch(apiUrl).then(response => response.json());
}
