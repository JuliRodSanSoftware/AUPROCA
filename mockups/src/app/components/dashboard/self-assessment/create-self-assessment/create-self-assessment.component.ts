import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, startWith, map } from 'rxjs';
import { Constants } from 'src/app/models/constants';
import { EvaluationC } from 'src/app/models/evaluationComplete';



@Component({
  selector: 'app-create-self-assessment',
  templateUrl: './create-self-assessment.component.html',
  styleUrls: ['./create-self-assessment.component.css']
})
export class CreateSelfAssessmentComponent {
  newEvaluation = new EvaluationC();
  professors = Constants.PROFESSORS_DATA;
  labors = Constants.LABORS_DATA;

  professorCtrl = new FormControl();
  professorFilterCtrl = new FormControl();

  laborCtrl = new FormControl();
  laborFilterCtrl = new FormControl();
    
  filteredProfessors: Observable<any[]> = new Observable<any[]>();
  filteredLabors: Observable<any[]> = new Observable<any[]>();


  constructor( private _snackBar: MatSnackBar, private router: Router,) {}

  ngOnInit() {
    this.filteredProfessors = this.professorFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((professorFilter) =>
        professorFilter ? this.filterProfessors(professorFilter) : this.professors.slice()
      )
    );

    this.filteredLabors = this.laborFilterCtrl.valueChanges.pipe(
      startWith(''),
      map((laborFilter) =>
        laborFilter ? this.filterLabors(laborFilter) : this.labors.slice()
      )
    );
  }

  filterProfessors(filter: string): any[] {
    // Filtra los profesores según el término de búsqueda
    const filterValue = filter.toLowerCase();
    return this.professors.filter((professor) =>
      professor.firstName.toLowerCase().includes(filterValue)
    );
  }

  filterLabors(filter: string): any[] {
    // Filtra los profesores según el término de búsqueda
    const filterValue = filter.toLowerCase();
    return this.labors.filter((labor) =>
      labor.lab_nombre?.toLowerCase().includes(filterValue)
    );
  }

  saveEvaluation(){
    this._snackBar.open('Se ha creado la autoevauación correctamente', 'Cerrar', {
      duration: 3000, // Duración en milisegundos
    });
    this.router.navigate(['/dashboard/self-assessment']);
    return; 
  }

  


}
