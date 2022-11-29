import { Component, OnInit, ResolvedReflectiveFactory } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Drink } from 'src/app/core/models';
import { LookUpDrinkByIdResolver } from 'src/app/resolver/lookup-drink';
import { ApiService } from 'src/app/_service/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  drink: Partial <Drink> = {}

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.data.subscribe(({drink}) => {
      this.drink = drink;
    })
    // paramMap è observable che ritorna un oggetto, invece snapshot è come se scattasse una foto
   
  }
}