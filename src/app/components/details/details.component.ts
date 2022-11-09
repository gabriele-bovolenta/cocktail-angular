import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CocktailByName, DrinkById, RestApiDrinkById } from 'src/app/core/models';
import { ApiService } from 'src/app/_service/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  drink: DrinkById = {
    idDrink: '',
    name: '',
    category: '',
    glass: '',
    image: '',
    drinkIngr: [],
    drinkInstruction: [],
  }

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    // paramMap è observable che ritorna un oggetto, invece snapshot è come se scattasse una foto
    this.route.paramMap.subscribe((res: ParamMap) => {
      const id = res.get('idDrink')
      if (!!id) {
        this.apiService.getDrinkById(id)

          // res non la tipizziamo perchè adesso è un observable
          .subscribe((res: any) => {
            this.drink = res;
            console.log(this.drink);
          })
      }
    })
  }
}