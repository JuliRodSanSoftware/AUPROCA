import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { Professor } from 'src/app/models/professor';





@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css'],
})


export class ProfessorComponent {
  displayedColumns: string[] = Constants.columns;
  public dataSource = Constants.PROFESSORS_DATA;

  constructor(private router: Router) {}

  viewProfessorDetails(professor: Professor) {
    this.router.navigate(['/dashboard/professors', professor.id]);
  }

  ngOnInit() {
    this.loadTeachers();
  }

  loadTeachers() {
    
  }

  createProfessor() {
    this.router.navigate(['/dashboard/create-professor']);
  }

}
