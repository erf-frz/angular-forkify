import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../recipes/ingredient.model';


  // interface IngredientObj{
  //   count:number;
  //   unit:string;
  //   ingredient:string;
  // }

@Injectable({providedIn:'root'})
export class ShoppingListService{
  ingredients:Ingredient[] = [];
  ingredientsChanged = new Subject<Ingredient[]>();



  addIngredients(ingredients:Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
    //this.editIngredients(ingredients);
    console.log(ingredients);
  }

  addIngredient(){

  }


  editIngredients(ingredients:Ingredient[]){

       const unitsLong = ['tablespoons','tablespoon','ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
       const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
       const units =[...unitsShort, 'kg', 'g'];

     ingredients.map(el =>{
       // uniform units
        let ingredient= el.ingredient.toLowerCase();
        unitsLong.forEach((unit,index)=>{
        ingredient = ingredient.replace(unit, unitsShort[index]);
        });

      //remove parenthesis
        ingredient = ingredient.replace(/ *\([^)]*\) */g, '');

      //parse the ingredients into count,unit and ingredient
      const arrIng = ingredient.split('');
      const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

      let objIng;
        if (unitIndex > -1){
            //there is a unit
            const arrCount = arrIng.slice(0, unitIndex);

            let count;
            if (arrCount.length ===1){
                // count = arrIng[0];   just because of one of the examples that the unt was 1-1/2
                count = eval(arrIng[0].replace('-', '+'));
            }else{
              count =eval(arrIng.slice(0, unitIndex).join('+'));
            }
          objIng ={
            count,
            unit: arrIng[unitIndex],
            ingredient: arrIng.slice(unitIndex +1).join(' ')
            };


        }else if(parseInt(arrIng[0], 10)){
            //there is no unit, but the first element is a number
            objIng = {
                count:parseInt(arrIng[0], 10),
                unit: '',
                ingredient: arrIng.slice(1).join(' ')
            };

        }else if(unitIndex === -1){
            // there is no unit and no number in the first position
            objIng = {
                count:1,
                unit: '',
                ingredient
            };
        }
          return objIng;
    });

    this.ingredients = ingredients;

 }
}
