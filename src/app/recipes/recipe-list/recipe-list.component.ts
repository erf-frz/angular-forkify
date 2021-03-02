import { Component,  OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit  {

  constructor(private recipesService:RecipesService,
              private dataStorageService:DataStorageService) { }

  recipes: Recipe[] = [];
  subscription:Subscription;

  isLoading = false;

  ngOnInit() {

    const recipes = JSON.parse(localStorage.getItem('recipes'));
     if(recipes === null){
        this.isLoading = true;
       this.recipesService.recipesChanged.subscribe((recipes:Recipe[]) => {
            this.isLoading = false;
             this.recipes = recipes;
          });
     }
     else{
       this.recipes = recipes;
     }
  }


  recipeSelected(id:string){
    this.dataStorageService.getRecipe(id).subscribe(recipe =>{
    //console.log(recipe);
    this.dataStorageService.selectedRecipe.next(recipe);
    });

  }



}
