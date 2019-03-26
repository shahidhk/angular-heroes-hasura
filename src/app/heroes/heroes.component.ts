import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { GetHeroes } from '../subscription.service';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

    heroes: Hero[];
    loading = false;
    error: any;

    constructor(private getHeroesSub: GetHeroes) {}

    ngOnInit() {
        this.getHeroes();
    }

    selectedHero: Hero;

    getHeroes(): void {
        this.getHeroesSub.subscribe().forEach(result=> {
            this.heroes = result.data && result.data.hero;
        })
    }
}
