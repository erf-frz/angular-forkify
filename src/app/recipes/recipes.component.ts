import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor(private dataStorageService:DataStorageService) { }

  //selectedRecipe:Recipe;


  ngOnInit(): void {

    // this.dataStorageService.selectedRecipe.subscribe((recipe:Recipe) =>{
    //     this.selectedRecipe = recipe;
    // })


  }



}
