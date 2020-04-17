import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServicesService } from 'src/app/services/data-services.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  data : GlobalDataSummary [];
  countries : String[] = [];

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;

  constructor(private service : DataServicesService) { }

  ngOnInit(): void {

    this.service.getGlobalData()
    .subscribe(result=>{
        this.data = result;
        this.data.forEach(cs=>{
           this.countries.push(cs.country)
        })
    })
  }

  updateValues(country : String){
    console.log(country);
    this.data.forEach(cs=>{
      if(cs.country == country){
        this.totalActive=cs.active
          this.totalConfirmed=cs.confirmed
          this.totalRecovered=cs.recoverd
          this.totalDeaths=cs.deaths
      }
    })
  }

}
