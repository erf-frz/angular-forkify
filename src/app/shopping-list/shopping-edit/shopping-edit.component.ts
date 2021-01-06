import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModifiedIngredient } from 'src/app/recipes/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private slService:ShoppingListService) { }

    @ViewChild('form')
    slForm:NgForm;

    editMode:boolean = false;

     editedItemIndex:number;
     editedItem:ModifiedIngredient;

     subscription:Subscription;


   ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe(
      (index:number) =>{
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name:this.editedItem.ingredient,
          unit:this.editedItem.unit,
          amount: this.editedItem.count
        });
      }
    );

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onAddItem(form:NgForm){
    const value = form.value;
    const newIng = new ModifiedIngredient(value.count, value.unit, value.ingredient);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, newIng);
    }else{
      this.slService.addIngredient(newIng);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
