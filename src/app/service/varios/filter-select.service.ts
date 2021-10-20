import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterSelectService {

  constructor() { }

  filter(event:any,data:any){
    let filtered : any[] = [];
    let query = event.query;
    for(let i = 0; i < data.length; i++) {
      let item = data[i];
      if (item.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(item);
      }
    }
    return filtered;
  }
}
