import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, startWith, map } from 'rxjs';
import { EvaluationC } from 'src/app/models/evaluationComplete';
import { Labor } from 'src/app/models/labor';
import { Period } from 'src/app/models/period';
import { ProfessorData } from 'src/app/models/professorData';
import { LaborService } from 'src/app/services/labor.service';
import { PeriodService } from 'src/app/services/period.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { SelfAssessmentService } from 'src/app/services/self-assessment.service';
import { UserRoleService } from 'src/app/services/user-rol.service';



@Component({
  selector: 'app-create-self-assessment',
  templateUrl: './create-self-assessment.component.html',
  styleUrls: ['./create-self-assessment.component.css']
})
export class CreateSelfAssessmentComponent {
  newEvaluation = new EvaluationC();
  professors: ProfessorData[] = [];
  labors: Labor[] = [];
  periods: Period[] = [];
  loading = false;

  professorCtrl = new FormControl();
  professorFilterCtrl = new FormControl();

  laborCtrl = new FormControl();
  laborFilterCtrl = new FormControl();
    
  filteredProfessors: Observable<any[]> = new Observable<any[]>();
  filteredLabors: Observable<any[]> = new Observable<any[]>();


  constructor( private _snackBar: MatSnackBar, 
    private router: Router, private laborService: LaborService, private periodService: PeriodService,
    private professorService: ProfessorService, private selfAssessmentService: SelfAssessmentService,
    private userRoleService: UserRoleService) {}

  ngAfterViewInit(): void {
    this.newEvaluation.eva_estado ="E";
    this.newEvaluation.eva_puntaje = "0";
    this.periodService.getPeriods().subscribe(periods =>{
      this.periods = periods;
    }

    )
    this.laborService.getLabors().subscribe(labors =>{
      this.labors = labors;
      this.filteredLabors = this.laborFilterCtrl.valueChanges.pipe(
        startWith(''),
        map((laborFilter) =>
          laborFilter ? this.filterLabors(laborFilter) : this.labors.slice()
        )
      );
      
    });
    this.professorService.getProfessors().subscribe(professors =>{
      this.professors = professors;
      this.filteredProfessors = this.professorFilterCtrl.valueChanges.pipe(
        startWith(''),
        map((professorFilter) =>
          professorFilter ? this.filterProfessors(professorFilter) : this.professors.slice()
        )
      );
    });

  }

  ngOnInit() {
    

  }

  filterProfessors(filter: string): any[] {
    // Filtra los profesores según el término de búsqueda
    const filterValue = filter.toLowerCase();
    return this.professors.filter((professor) =>
      professor.usu_nombre?.toLowerCase().includes(filterValue)
    );
  }

  filterLabors(filter: string): any[] {
    // Filtra los profesores según el término de búsqueda
    const filterValue = filter.toLowerCase();
    return this.labors.filter((labor) =>
      labor.lab_nombre?.toLowerCase().includes(filterValue)
    );
  }

  createSelfAssessment() {
    this.loading = true;
    this.newEvaluation.eva_resultado = "";
    this.newEvaluation.eva_sugerencias = "";
    


    this.userRoleService.getUserRoles().subscribe({
      next:(userRoles)=>{
        userRoles.map((userRole) =>{
          if (userRole.usr_identificacion == this.newEvaluation.usr_identificacion){
            this.newEvaluation.usr_identificacion = userRole.id
            this.newEvaluation.rol_id = userRole.id
          }});
          
          this.selfAssessmentService.createSelfAssessment(this.newEvaluation).subscribe({
            next: () => {
              this.loading = false;
              this._snackBar.open('Se ha creado la autoevaluación correctamente', 'Cerrar', {
                duration: 3000,
              });
              this.router.navigate(['/dashboard/self-assessment']);
            },
            error: () => {
              this.loading = false;
              this._snackBar.open('Error, no se pudo crear la autoevaluación', 'Cerrar', {
                duration: 3000,
              });
             
            }
          }
        );
        


      }
      
    });
    
  }


}
