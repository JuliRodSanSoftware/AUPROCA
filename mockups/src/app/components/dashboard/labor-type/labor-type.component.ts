import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { LaborType } from 'src/app/models/laborType';
import { LaborTypeService } from 'src/app/services/labor-type.service';

@Component({
  selector: 'app-labor-type',
  templateUrl: './labor-type.component.html',
  styleUrls: ['./labor-type.component.css']
})
export class LaborTypeComponent {
  displayedColumns: string[] = Constants.COLUMNS_LABOR_TYPE;

  public laborTypes: LaborType[] = [];
  public dataSource = new MatTableDataSource<LaborType>(this.laborTypes);
  constructor(private router: Router, private laborTypeService: LaborTypeService) {}

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
    this.loadLabors();

  }

  private loadLabors(){
    this.laborTypeService.getLaborTypes()
      .subscribe(data => {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
      });
  }

  viewLaborDetails(laborType: LaborType) {
    this.router.navigate(['/dashboard/labor-types', laborType.tl_id]);
  }

  createLabor(){
    this.router.navigate(['/dashboard/create-labor-type']);
  }
}
