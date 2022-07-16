import deepFreeze from 'deep-freeze'
import cafeReducer from './cafeReducer'

describe('Test reducer', () => {
  test('should return default values with uknown action and undefined state', () => {
    const state = undefined
    const newState = cafeReducer(state, null)
    console.log('reduced', newState)
    expect(newState).toBeDefined()
    expect(newState).toEqual({ good: 0, bad: 0, ok: 0 })
  })
  test('should increment ok with action OK', () => {
    const state = undefined
    const newState = cafeReducer(state, { type: 'OK' })
    console.log('reduced', newState)
    expect(newState).toEqual({ good: 0, bad: 0, ok: 1 })
  })
  test('should reset state with action ZERO', () => {
    const state = { ok:5, good:6, bad:1 }
    deepFreeze(state)
    const newState = cafeReducer(state, { type: 'ZERO' })
    console.log('reduced', newState)
    expect(newState).toEqual({ good: 0, bad: 0, ok: 0 })
  })
})


