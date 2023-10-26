import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { Labor } from 'src/app/models/labor';

@Component({
  selector: 'app-labor',
  templateUrl: './labor.component.html',
  styleUrls: ['./labor.component.css']
})
export class LaborComponent {
  displayedColumns: string[] = ["ID",'Nombre', 'Tipo labor', 'Horas asignadas'];
  public dataSource: Labor[] = Constants.LABORS_DATA;
  constructor(private router: Router) {}


  viewLaborDetails(labor: Labor) {
    this.router.navigate(['/dashboard/labors', labor.id]);
  }

  createLabor(){
    this.router.navigate(['/dashboard/create-labor']);
  }

  
  
}
