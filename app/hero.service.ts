import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';


import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';


@Injectable()
export class HeroService {

  private heroesUrl = 'app/heroes';
  private headers = new Headers({'content-type': 'application/json'});

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.messaage || error);
  }

  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json().data as Hero[])
               .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http
               .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
               .put(url, JSON.stringify(hero), {headers: this.headers})
               .toPromise()
               .then(() => hero) 
               .catch(this.handleError);

  }

  delete(id: Number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
               .toPromise()
               .then(() => null)
               .catch(this.handleError);
  }

  getHero(id: Number): Promise<Hero> {
    return this.getHeroes()
    .then(heroes => heroes.find(hero => hero.id === id));
  }
}