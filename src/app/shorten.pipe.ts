import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name:'shorten'
})
export class ShortenPipe implements PipeTransform{

  transform(value:any){
    if(value.length > 30){
      return value.substr(0,27) + '...';
    }
    return value;
  }
}
