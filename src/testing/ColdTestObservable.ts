/**
 * Created by tushar.mathur on 10/10/16.
 */

import {IEvent, EventType} from '../types/IEvent';
import {TestObservable} from './TestObservable';
import {ISubscriptionObserver} from '../types/core/ISubscriptionObserver';
import {EventNext} from './ReactiveTest';
import {IScheduler} from '../types/IScheduler';

export function ColdTestObservable<T> (scheduler: IScheduler, events: Array<IEvent>) {
  return new TestObservable((observer: ISubscriptionObserver<any>) => {
    let closed = false
    for (var i = 0; i < events.length && !closed; i++) {
      const event = events[i]
      if (event.type === EventType.next) {
        scheduler.scheduleTimeout(() => observer.next((<EventNext<any>> event).value), event.time)
      }
      else if (event.type === EventType.complete) {
        scheduler.scheduleTimeout(() => observer.complete(), event.time)
      }
    }
    return {
      unsubscribe () {
        closed = true
      },
      closed
    }
  })
}
