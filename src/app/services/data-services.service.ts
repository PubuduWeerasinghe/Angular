import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GlobalDataSummary } from '../models/global-data';

@Injectable({
  providedIn: 'root'
})
export class DataServicesService {

  private globalDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/04-12-2020.csv'

  constructor(private http :  HttpClient) { }

  getGlobalData(){
    return this.http.get(this.globalDataUrl, {responseType : 'text'}).pipe(
      map(result=>{

        let data : GlobalDataSummary[]=[];

        let raw={}

        let rows= result.split("\n");
        rows.splice(0,1);
       // console.log(rows);

        rows.forEach(row => {
          let cols=row.split(/,(?=\S)/);
          // console.log(cols);

          let cs = {
            country : cols[3],
            confirmed : +cols[7],
            deaths : +cols[8],
            recoverd : +cols[9],
            active : +cols[10]
          };
          let temp: GlobalDataSummary = raw[cs.country];
          if(temp){
            temp.active = cs.active + temp.active
            temp.confirmed = cs.confirmed+ temp.confirmed
            temp.deaths = cs.deaths+temp.deaths
            temp.recoverd=cs.recoverd+temp.recoverd
          
          raw[cs.country]=temp;
          }else{
            raw[cs.country]=cs;
          }
          
        });

        return <GlobalDataSummary[]> Object.values(raw);
      })
    ) 
  }
}
