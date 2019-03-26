import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

    heroes: Hero[];
    loading = true;
    error: any;

    constructor(private apollo: Apollo) { }

    ngOnInit() {
        this.getHeroes();
    }

    selectedHero: Hero;

    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }


    getHeroes(): void {
        this.apollo.watchQuery({
            query: gql`
              query getHeroes {
                hero {
                  id
                  name
                }
              }
            `,
        }).valueChanges.subscribe(result => {
            this.heroes = result.data && result.data.hero;
            this.loading = result.loading;
            this.error = result.errors;
        });
    }
}
