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

const dataService = (store, usState) => next => action => {
  let solarKey = getSolarKey(usState);
  /*
  Pass all actions through by default
  */
  next(action)
  switch (action.type) {
  case 'GET_SOLAR_DATA':
    /*
    In case we receive an action to send an API request, send the appropriate request
    */
    request
      .get(solarKey)
      .end((err, res) => {
        if (err) {
          /*
          in case there is any error, dispatch an action containing the error
          */
          return next({
            type: 'GET_SOLAR_DATA_ERROR',
            err
          })
        }
        const data = JSON.parse(res.text)
        console.log('DS data: ', data);
        /*
        Once data is received, dispatch an action telling the application
        that data was received successfully, along with the parsed data
        */
        next({
          type: 'GET_SOLAR_DATA_RECEIVED',
          data
        })
      })
    break
  /*
  Do nothing if the action does not interest us
  */
  default:
    break
  }

};

export default dataService
