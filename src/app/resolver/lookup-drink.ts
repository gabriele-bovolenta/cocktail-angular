import { Drink } from "../core/models";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ApiService } from "../_service/api.service";

@Injectable({ providedIn: 'root' })
export class LookUpDrinkByIdResolver implements Resolve<Drink> {
  constructor(private service: ApiService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Drink> {
    console.log('dentro resolver');
    
    return this.service.lookupDrinkById(route.paramMap.get('idDrink')!);
  }
} 