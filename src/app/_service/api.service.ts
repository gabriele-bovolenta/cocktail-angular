import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CocktailByName, DrinkById, RestApiCocktailById, RestApiCocktailByName, RestApiDrinkById, RestApidrinksByName } from '../core/models';
import { map } from 'rxjs';
import { handleMapping, sortingDrinkByName } from '../core/logic';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getDrinksByName = (query: string) => {
    return this.httpClient
      .get<RestApiCocktailByName>(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
      )
      // prende l'observable e mappa i dati all'interno dell'observable e lo restituisce mappato
      .pipe(
        map((res: RestApiCocktailByName) => {
          const drinkAPI: RestApidrinksByName[] = sortingDrinkByName(
            res.drinks
          )
          const drink: CocktailByName[] = drinkAPI.map((el: RestApidrinksByName) => ({
            id: el.idDrink,
            name: el.strDrink,
            category: el.strCategory,
            image: el.strDrinkThumb,
          }))
          return drink;
        })
      )
  }

  getDrinkById = (id: string) => {
    return this.httpClient
      .get<RestApiCocktailById>(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .pipe(
        map((res: RestApiCocktailById) => {
          const resDrink : RestApiDrinkById = res.drinks[0]
          const drink : DrinkById = handleMapping(resDrink)
          return drink;
        })
      )
  }
}