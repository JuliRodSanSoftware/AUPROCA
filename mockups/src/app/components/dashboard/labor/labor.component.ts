import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { Labor } from 'src/app/models/labor';
import { LaborService } from 'src/app/services/labor.service';

@Component({
  selector: 'app-labor',
  templateUrl: './labor.component.html',
  styleUrls: ['./labor.component.css']
})
export class LaborComponent {
  displayedColumns: string[] = Constants.COLUMNS_LABOR;

  public labors: Labor[] = [];
  public dataSource = new MatTableDataSource<Labor>(this.labors);
  constructor(private router: Router, private laborService: LaborService) {}

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  
  ngOnInit(): void {
    this.loadLabors();

  }

  private loadLabors(){
    this.laborService.getLabors()
      .subscribe(data => {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
      });
  }

  viewLaborDetails(labor: Labor) {
    this.router.navigate(['/dashboard/labors', labor.lab_id]);
  }

  createLabor(){
    this.router.navigate(['/dashboard/create-labor']);
  }

  
  
}
