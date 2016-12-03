import request from 'superagent'

import stateInf from './data/stateInf';

const getCoords = (usState, arr) => {
	let found = arr.find ( (obj) => {
		return obj.state === usState;
	})
	return found.coordinates;
}

const getSolarKey = usState => {
	let coords = getCoords(usState, stateInf);
	let lat = coords[0]
	let lon = coords[1]
	let solarKey = 'https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=K3xP9qX4f5MXpVoIg1yjd2DiEMJqqqOXWPD9xm1C&lat=' + lat + '&lon=' + lon;
  return solarKey;
}

const dataService = store => next => action => {
	next(action)

	console.log('data service state: ', store );
	console.log('data service action: ', action);
	switch (action.type) {
	case 'GET_SOLAR_DATA':
		request
			.get(getSolarKey(action.usState))
			.end((err, res) => {
				if (err) {
					return next({
						type: 'GET_SOLAR_DATA_ERROR',
						err
					})
				}
				const data = JSON.parse(res.text)
				console.log(data.outputs);
				next({
					type: 'GET_SOLAR_DATA_RECEIVED',
					data: data.outputs
				})
			})
		break
	default:
		break
	}
};

export default dataService
