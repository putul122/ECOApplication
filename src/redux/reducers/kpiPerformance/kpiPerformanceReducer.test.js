import kpiPerformanceReducer, {actions, actionCreators} from './kpiPerformanceReducer'

it('should create increment actions', () => {
  expect(actionCreators.increment(1)).toEqual({type: actions.INCREMENT, payload: 1})
})
it('should create decrement actions', () => {
  expect(actionCreators.decrement(1)).toEqual({type: actions.DECREMENT, payload: 1})
})

it('should reduce increments', () => {
  expect(kpiPerformanceReducer({count: 5}, actionCreators.increment(1))).toEqual({count: 6})
})
it('should reduce decrements', () => {
  expect(kpiPerformanceReducer({count: 5}, actionCreators.decrement(2))).toEqual({count: 3})
})
it('should set the stars to whatever comes from the setStars saga', () => {
  expect(kpiPerformanceReducer({count: 938}, {type: actions.FETCH_STARS_SUCCESS, payload: 9999})).toEqual({count: 9999})
})
