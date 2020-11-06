import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  constructor(private dataStorageService:DataStorageService){}

  @Input()
  recipe:Recipe;

  @Input()
  rId:string;

  // @Output()
  // recipeSelected = new EventEmitter<void>();

  ngOnInit(): void {

  }

  // onSelect(){
  //   //this.recipeSelected.emit();
  //   this.dataStorageService.selectedRecipe.next(this.recipe);
  // }

}
