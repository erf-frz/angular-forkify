import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModifiedIngredient } from '../recipes/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  constructor(
              private shoppingListService:ShoppingListService,
              private router:Router) { }

  ingredients:ModifiedIngredient[] = [];

  subscription:Subscription;




  ngOnInit(){
        this.ingredients = this.shoppingListService.getIngredients();
        this.shoppingListService.ingredientsChanged.subscribe(
        ( ingredients:ModifiedIngredient[]) => {
        this.ingredients = ingredients;
        //console.log(this.ingredients);
         });
        localStorage.setItem('ingredients', JSON.stringify(this.ingredients));

  }









   toHome(){
    this.router.navigate(['/']);
  }

 onEditItem(index:number){
    this.shoppingListService.startedEditing.next(index);
  }

ngOnDestroy(){
  // this.subscription.unsubscribe();
}

toLikes(){
    this.router.navigate(['/liked']);
  }
}
