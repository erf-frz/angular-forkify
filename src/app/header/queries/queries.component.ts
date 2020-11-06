import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css']
})
export class QueriesComponent implements OnInit {

  constructor(private dataStorageService:DataStorageService) { }

  @Output()
  close = new EventEmitter<void>();

foodList = this.dataStorageService.foodList.slice();

  ngOnInit(): void {
  }

  onClose(){
    this.close.emit();
  }

}
