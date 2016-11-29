import stateInf from './stateInf';

const getCoords = (usState, arr) => {
	let found = arr.find ( (obj) => {
		return obj.state === usState;
	})
	return found.coordinates;
}

const getSolarData = (usState) => {
	let coords = getCoords(usState, stateInf);
	let lat = coords[0]
	let lon = coords[1]
	let solarKey = 'https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=K3xP9qX4f5MXpVoIg1yjd2DiEMJqqqOXWPD9xm1C&lat=' + lat + '&lon=' + lon;

	fetch(solarKey, {
	    method: 'get',
	  }).then(function (response) {
	    // console.log('response', response);
	    return response.json();
	  }).then (function(data) {
	    console.log('data', data.outputs);
	  }).catch (function(err) {
	    console.log('err', err);
	  })

	  console.log('async test');

}
// url (required), options (optional)

export default getSolarData;
