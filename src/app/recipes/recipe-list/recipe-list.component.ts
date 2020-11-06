import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  constructor(private recipesService:RecipesService,
              private dataStorageService:DataStorageService) { }

  recipes: Recipe[] = [];
  subscription:Subscription;

  // @Output()
  // recipeWasSelected = new EventEmitter<Recipe>();

  isLoading = false;

  ngOnInit() {

   this.isLoading = true;

   this.subscription =  this.recipesService.recipesChanged.subscribe((recipes:Recipe[]) => {
      this.isLoading = false;
      this.recipes = recipes;
      //localStorage.setItem('recipes', JSON.stringify(recipes));
      });

      // if(this.recipes === []){
      //   this.isLoading = false;
      //   this.recipes = JSON.parse(localStorage.getItem('recipes'));
      // }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  recipeSelected(id:string){
    this.dataStorageService.getRecipe(id).subscribe(recipe =>{
    console.log(recipe);
    this.dataStorageService.selectedRecipe.next(recipe);
    });

  }

  // onRecipeSelected(recipe:Recipe){
  //   this.recipeWasSelected.emit(recipe);
  // }


}
