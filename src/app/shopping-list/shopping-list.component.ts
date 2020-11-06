import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ingredient } from '../recipes/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  constructor(private shoppingListService:ShoppingListService,
              private router:Router) { }

  ingredients:Ingredient[] = [];

  ngOnInit(){
     this.ingredients = this.shoppingListService.ingredients ;
    //this.shoppingListService.editIngredients(this.ingredients);
  }

   toHome(){
    this.router.navigate(['/']);
  }
}
