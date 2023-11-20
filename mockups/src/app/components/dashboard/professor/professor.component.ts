import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { Professor } from 'src/app/models/professor';
import { ProfessorData } from 'src/app/models/professorData';
import { ProfessorService } from 'src/app/services/professor.service';


@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css'],
})


export class ProfessorComponent {
  displayedColumns: string[] = Constants.COLUMNS_PROFESSOR;
  public profesorsData: ProfessorData[] = [];
  public dataSource = new MatTableDataSource<ProfessorData>(this.profesorsData);
  constructor(private router: Router, private professorService: ProfessorService) {}

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
    this.loadProfessors();

  }

  private loadProfessors() {
    this.professorService.getProfessors()
      .subscribe(professors => {
        this.dataSource.data = professors;
        this.dataSource.sort = this.sort;
      });
  }


  viewProfessorDetails(professor: ProfessorData) {
    this.router.navigate(['/dashboard/professors', professor.usr_identificacion]);
  }


  createProfessor() {
    this.router.navigate(['/dashboard/create-professor']);
  }

}
