import { Component,  OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy  {

  constructor(private recipesService:RecipesService,
              private dataStorageService:DataStorageService) { }

  recipes: Recipe[] = [];
  getRecipeSubscription$$: Subscription;
  recipesChangedSubscription$$: Subscription;
  isLoading = false;

  ngOnInit() {
    //the problem lies here. when we search for a new list, the recipes are stillcoming from the storage.
    const recipes = JSON.parse(localStorage.getItem('recipes'));
     if(recipes === null){
        this.isLoading = true;
        this.getRecipeSubscription$$ = this.recipesService.recipesChanged.subscribe((recipes:Recipe[]) => {
            this.isLoading = false;
             this.recipes = recipes;
          });
     }
     else{
       this.recipes = recipes;
     }
  }


  recipeSelected(id:string){
    this.dataStorageService.selectedRecipe.next(null);
    this.recipesService.setLoadingStatus(true);
    this.recipesChangedSubscription$$ = this.dataStorageService.getRecipe(id).subscribe(recipe =>{
      this.recipesService.setLoadingStatus(false);
      this.dataStorageService.selectedRecipe.next(recipe);
    });

  }

  ngOnDestroy(){
    if(this.getRecipeSubscription$$){
      this.getRecipeSubscription$$.unsubscribe();
    }
    if(this.recipesChangedSubscription$$){
      this.recipesChangedSubscription$$.unsubscribe();
    }
  }



}
