import { describe, it, expect } from 'vitest'
import { add, multiply } from '../src/utils/math'

describe('Math utilities', () => {
  it('should fail test', () => {
    expect(1).toBe(2)
  })

  it('should multiply two numbers correctly', () => {
    expect(multiply(2, 3)).toBe(6)
    expect(multiply(-2, 3)).toBe(-6)
    expect(multiply(0, 5)).toBe(0)
  })
})
