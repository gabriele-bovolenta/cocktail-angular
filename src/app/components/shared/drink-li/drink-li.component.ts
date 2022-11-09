import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CocktailByName } from 'src/app/core/models';

@Component({
  selector: 'app-drink-li',
  templateUrl: './drink-li.component.html',
  styleUrls: ['./drink-li.component.scss']
})
export class DrinkLiComponent implements OnInit {

  // input --> padre figlio
  @Input() drink: CocktailByName = {
    id: '',
    name: '',
    category: '',
    image: ''
  }

  @Input() showButton: boolean = false;

  // Output --> figlio padre
  // handleCount --> Evento 
  @Output() handleCount: EventEmitter<boolean> = new EventEmitter();

  selected : boolean = false;

  handleCart = (handler: boolean) => {
    if (handler) {
      this.handleCount.emit(true)
      this.selected = true;
    } else {
      this.handleCount.emit(false)
      this.selected = false;
    } 
  }

  constructor() { }

  ngOnInit(): void { }
}
