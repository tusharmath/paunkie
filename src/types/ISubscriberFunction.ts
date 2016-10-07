/**
 * Created by tushar.mathur on 05/10/16.
 */

import {ISubscription} from './ISubscription';
import {ITask} from './ITask';
import {ISubscriptionObserver} from './ISubscriptionObserver';

export interface ISubscriberFunction<T> {
  (observer: ISubscriptionObserver<T>): void | ITask | ISubscription
}
