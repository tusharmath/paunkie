/**
 * Created by tushar.mathur on 04/10/16.
 */

import * as t from 'assert'
import {map} from '../src/operators/Map'
import {fromArray} from '../src/sources/FromArray'
import {EVENT} from '../src/testing/Events'
import {createTestScheduler} from '../src/testing/TestScheduler'
import {ERROR_MESSAGE, throwError} from '../src/testing/Thrower'

const {next, error} = EVENT

describe('fromArray()', () => {
  const throwMessage = (message: string) => {
    throw message
  }
  it('should emit array values as events', () => {
    const sh = createTestScheduler()
    const testFunction = (x: any) =>
      x === 2 ? throwError(ERROR_MESSAGE) : x * 100
    const {results} = sh.start(() => map(testFunction, fromArray([1, 2, 3])))
    t.deepEqual(results, [next(201, 100), error(201, new Error(ERROR_MESSAGE))])
  })

  it('should handle thrown non Error exceptions', () => {
    const sh = createTestScheduler()
    const testFunction = (x: any) =>
      x === 2 ? throwMessage(ERROR_MESSAGE) : x * 100
    const {results} = sh.start(() => map(testFunction, fromArray([1, 2, 3])))
    t.deepEqual(results, [next(201, 100), error(201, ERROR_MESSAGE as any)])
  })
})
