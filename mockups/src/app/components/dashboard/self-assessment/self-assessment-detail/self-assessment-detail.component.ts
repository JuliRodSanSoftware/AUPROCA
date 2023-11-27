import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { Constants } from 'src/app/models/constants';
import { Evaluation } from 'src/app/models/evaluation';
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
  selector: 'app-self-assessment-detail',
  templateUrl: './self-assessment-detail.component.html',
  styleUrls: ['./self-assessment-detail.component.css']
})
export class SelfAssessmentDetailComponent {

  evaluation = new Evaluation();
  evaluationC = new EvaluationC();

  professors: ProfessorData[] = [];
  labors: Labor[] = [];
  periods: Period[] = [];
  loading = false;

  
  public STATE_CHOICES = [
    {'E': 'En ejecución'},
    {'T': 'Terminado'},
    {'S': 'Suspendido'},
  ];

  professorCtrl = new FormControl();
  professorFilterCtrl = new FormControl();

  laborCtrl = new FormControl();
  laborFilterCtrl = new FormControl();
    
  filteredProfessors: Observable<any[]> = new Observable<any[]>();
  filteredLabors: Observable<any[]> = new Observable<any[]>();
  
  selectedProfessor: any = ''; 
  selectedLabor: any = ''; 
  selectedPeriod: any = ''; 
  

  constructor(private _formBuilder: FormBuilder, private _snackBar: MatSnackBar,private route: ActivatedRoute, private router: Router, 
    public dialog: MatDialog, private laborService: LaborService, private periodService: PeriodService,
    private professorService: ProfessorService, private selfAssessmentService: SelfAssessmentService,
    private userRoleService: UserRoleService, private cdr: ChangeDetectorRef, ) {}



  ngAfterViewInit(): void {
    this.periodService.getPeriods().subscribe(periods =>{
      this.periods = periods;

      this.laborService.getLabors().subscribe(labors =>{
        this.labors = labors;
        this.filteredLabors = this.laborFilterCtrl.valueChanges.pipe(
          startWith(''),
          map((laborFilter) =>
            laborFilter ? this.filterLabors(laborFilter) : this.labors.slice()
          )
        );

        this.professorService.getProfessors().subscribe(professors =>{
          this.professors = professors;
          this.filteredProfessors = this.professorFilterCtrl.valueChanges.pipe(
            startWith(''),
            map((professorFilter) =>
              professorFilter ? this.filterProfessors(professorFilter) : this.professors.slice()
            )
          );

          // Obtén el ID del profesor de los parámetros de la ruta
          let idParam = this.route.snapshot.paramMap.get('id');

          if (idParam === null) {
            this._snackBar.open('ID inválido', 'Cerrar', {
              duration: 2000, 
              panelClass: ['warn'] 
            });
            this.router.navigate(['/dashboard/self-assessment']);
            return; 
          }
          

          this.selfAssessmentService.getSelfAssessmentDetail(idParam).subscribe((evaluationC) =>{
            this.evaluationC = evaluationC;
            
            if (idParam === null) {
              this._snackBar.open('ID inválido', 'Cerrar', {
                duration: 2000, 
                panelClass: ['warn'] 
              });
              this.router.navigate(['/dashboard/self-assessment']);
              return; 
            }

            this.selfAssessmentService.getSelfAssessmentCompleteDetail(idParam).subscribe(evaluation =>{
              this.evaluation = evaluation;
              this.selectedProfessor = evaluationC.usr_identificacion?.toString();
              this.selectedLabor = evaluationC.lab_id?.toString();
              this.selectedPeriod = evaluationC.per_id?.toString();
              this.cdr.detectChanges();
              if (!this.evaluation.id) {
                this._snackBar.open('ID no encontrado', 'Cerrar', {
                  duration: 2000, 
                  panelClass: ['warn'] 
                });
                this.router.navigate(['/dashboard/self-assessment']);
                return; 
              } 
            })

          });
        });
        
      });

    });




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



  saveChanges(){
    const evaluationId = this.route.snapshot.paramMap.get('id');

    const dialogRef = this.dialog.open(DialogSaveSelfAssessment);


    if (evaluationId === null) {
      this._snackBar.open('ID inválido', 'Cerrar', {
        duration: 2000, 
        panelClass: ['warn'] 
      });
      this.router.navigate(['/dashboard/self-assessment']);
      return; 
    }
    

    dialogRef.afterClosed().subscribe(result => {
      if (result){

        this.userRoleService.getUserRoles().subscribe({
          next:(userRoles)=>{
            userRoles.map((userRole) =>{
              if (userRole.usr_identificacion == this.evaluationC.usr_identificacion){
                this.evaluationC.usr_identificacion = userRole.id
                this.evaluationC.rol_id = userRole.id
              }});
              this.selfAssessmentService.updateSelfAssessment(evaluationId, this.evaluationC).subscribe({
                next : () => {
                  this._snackBar.open('Se editó la autoevaluación correctamente', 'Cerrar', {
                    duration: 3000, 
                  });
                  this.router.navigate(['/dashboard/self-assessment']);
                },
                error: () => {
                  this._snackBar.open('Error, no se pudo editar la autoevaluación', 'Error', {
                    duration: 3000,
                  });
                  
                }
              });
    
          }
          
        });

       
      }
    });
    return; 
  }

}

@Component({
  selector: 'dialog-delete-professor',
  templateUrl: './dialogs/dialog-save-self-assessment.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogSaveSelfAssessment {}

