import { Component, OnInit } from '@angular/core';
import { DataServicesService } from 'src/app/services/data-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dataService : DataServicesService) { }

  ngOnInit(): void {
    this.dataService.getGlobalData()
    .subscribe({
      next : (result)=>{
        console.log(result);
      }
    })
  }

}
