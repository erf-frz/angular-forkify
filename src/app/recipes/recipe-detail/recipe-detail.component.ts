import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Ingredient } from '../ingredient.model';
import {  Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {



  recipe:Recipe;

  id:string;

  isLoading = false;

  private subscription:Subscription;

  constructor(private dataStorageService:DataStorageService,
              private recipeService:RecipesService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription = this.dataStorageService.selectedRecipe.subscribe(recipe =>{
      if(recipe ===undefined){
        return null;
      }else{
        this.isLoading = false;
        this.recipe = recipe;
        this.route.params.subscribe((params:Params)=>{
        this.recipe.recipe_id = params['id'];
     });
    }
       });

  }


  ngOnDestroy(){
     this.subscription.unsubscribe();
  }

  onAddToSL(){
    const ingredients = this.recipe.ingredients;
    this.recipeService.addToSl(ingredients);

  }

  calculateTime(ingredients:Ingredient[]){

    //I roughly estimated that for each 4 ingredients, we would need 15 minutes of cooking, just to have a time here.
    const time = Math.round((ingredients.length/4)*15);
    return time;

  }


}
