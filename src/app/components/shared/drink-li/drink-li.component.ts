import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  // Esempio di come inizializzare un oggetto drink senza passare tutti i campi con stringhe vuote ad esempio
  // non obbliga a definire tutti i campi opzionali e non obbliga a inizializzare di nuovo l'oggetto
  // qui si possono utilizzare tutti i campi di CocktailByName ma non si possono aggiungere i campi   
  drink2: Partial<CocktailByName> = {}

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

  constructor() {
     
   }

  ngOnInit(): void { }
}
