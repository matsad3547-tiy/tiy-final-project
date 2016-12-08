import { months, seasons } from './constants'

export const getCurrentState = state => state

export const select = (timeInt) => {
  if (months.includes(timeInt)) return 'monthly';
  else if (seasons.includes(timeInt)) return 'seasonally';
  else if (timeInt === 'annually') return 'annually';
}
