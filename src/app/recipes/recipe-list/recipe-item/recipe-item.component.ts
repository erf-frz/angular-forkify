import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  constructor(){}

  @Input()
  recipe:Recipe;

  @Input()
  rId:string;


  ngOnInit(): void {

  }


}
