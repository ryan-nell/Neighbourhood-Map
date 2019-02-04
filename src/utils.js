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
    const apiKey = 'AIzaSyBJuRWeadAvrwCfb7Iw60xwevqwxjyLwHA';

    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    document.body.appendChild(script);
  });
}

export function loadPlaces() {
  let city = 'Dublin, Ireland';
  let query = 'Food';
  let apiUrl = 'https://api.foursquare.com/v2/venues/search?client_id=20NEGFR044A0D21F3H0ZGBAMYP4IGD23WWSDQUUMDHIDDQCN&client_secret=FYXVGRU00ZN2Y52DZQYS0PAZFHYSKPMYE2AWFTNLY2BH300Z&v=20130815%20&limit=10&near=' + city + '&query=' + query + '';
  return fetch(apiUrl).then(response => response.json());
}
