import { months, seasons } from './constants'

export const getCurrentState = (state) => {
  return {
    usState: state.usState,
    timeInterval: state.timeInterval,
    data: state.data
  }
}

export const select = (timeInt) => {
  if (months.includes(timeInt)) return 'monthly';
  if (seasons.includes(timeInt)) return 'seasonally';
  if (timeInt === 'annually') return 'annually';
}
