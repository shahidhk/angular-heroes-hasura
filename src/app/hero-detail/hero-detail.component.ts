import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


const addHero = gql`
  mutation addHero($name: String!) {
    insert_hero(objects: {
      name: $name
    }) {
      returning {
        id
        name
      }
    }
  }
`;

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  constructor(private apollo: Apollo) {}

  ngOnInit() {
  }

  hero: Hero;

  name = '';

  saveHero(name: String): void {
    this.apollo.mutate({
      mutation: addHero,
      variables: {
        name
      }
    })
    .subscribe(({ data }) => {
      console.log('got data', data);
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }

}
