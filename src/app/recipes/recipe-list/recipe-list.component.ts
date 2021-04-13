import { Component,  OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy  {
  subs = new SubSink();

  constructor(private recipesService:RecipesService,
              private dataStorageService:DataStorageService) { }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  recipes: Recipe[] = [];
  isLoading = false;

  ngOnInit() {
    const recipes = JSON.parse(localStorage.getItem('recipes'));
     if(!recipes){
        this.isLoading = true;
        this.subs.sink = this.recipesService.recipesChanged.subscribe((recipes:Recipe[]) => {
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
    this.subs.sink = this.dataStorageService.getRecipe(id).subscribe(recipe =>{
      this.recipesService.setLoadingStatus(false);
      this.dataStorageService.selectedRecipe.next(recipe);
    });

  }



}
