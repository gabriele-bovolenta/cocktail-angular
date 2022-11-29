import { Component, OnInit } from '@angular/core';
import { CocktailByName, Drink, homeInputs } from 'src/app/core/models';
import { ApiService } from 'src/app/_service/api.service';
import { ActivatedRoute } from "@angular/router";
import { first } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  jsonIn : homeInputs = {
    searchInput: ''
  }

  letters =  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  firstLetter = '';

  drinks : Drink[] = [];

  drinksList: CocktailByName [] = []
  cartList: CocktailByName [] = []
  
  constructor(private apiService : ApiService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.changeFirstLetter('A');
    this.route.paramMap.subscribe((res) => {
      const search = res.get('search')
      if (!!search) {
        this.jsonIn.searchInput = search
        this.handleSearchDrinksByName();
      }
    })
    // USING LOCAL STORAGE
    /* const search = localStorage.getItem('search');

    if(!!search) {
      this.jsonIn.searchInput = search;
      this.handleSearchDrinksByName()
    } */
  }

  changeFirstLetter(letter: string) {
    this.firstLetter = letter;
    console.log(this.firstLetter);
    
    this.apiService.searchCocktailByFirstLetter(this.firstLetter)
    .subscribe((res) => (this.drinksList = res))
  }

  handleSearchDrinksByName = () => {
    this.apiService.getDrinksByName(this.jsonIn.searchInput)
      .subscribe((res) => (this.drinksList = res))

      /* localStorage.setItem('search', this.jsonIn.searchInput) */
  }

  count : number = 0;

  handleCartParent = (drink: CocktailByName, $event: boolean) => {
    if ($event === true) {
      if (this.count < 5) {
        this.cartList.push(drink);
        this.count++;
        console.log(this.count);
      } 
    } else {
      if(this.count > 0) {
        /* this.cartList = this.cartList.filter((el) => el !== drink); */
        this.cartList.splice(this.cartList.findIndex((el) => el === drink), 1);
        this.count--;
        console.log(this.count);
      }
    }
  }
}