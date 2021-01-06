import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor(private dataStorageService:DataStorageService) { }

   @Input()
   message:string;

   @Output()
  close = new EventEmitter<void>();

  ngOnInit() {

  }

  onClose(){
    this.close.emit();
  }


}
