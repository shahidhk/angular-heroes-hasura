import {Injectable} from '@angular/core';
import {Subscription} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class GetHeroes extends Subscription {
  document = gql`
    subscription getHeroes {
      hero {
        id
        name
      }
    }
  `;
}