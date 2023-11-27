import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { Evaluation } from 'src/app/models/evaluation';
import { EvaluationC } from 'src/app/models/evaluationComplete';
import { LaborService } from 'src/app/services/labor.service';
import { PeriodService } from 'src/app/services/period.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { SelfAssessmentService } from 'src/app/services/self-assessment.service';
import { UserRoleService } from 'src/app/services/user-rol.service';

@Component({
  selector: 'app-self-assessment',
  templateUrl: './self-assessment.component.html',
  styleUrls: ['./self-assessment.component.css']
})
export class SelfAssessmentComponent {
  public evaluations: Evaluation[] = [];
  public evaluationsNoComplete: EvaluationC[] = [];
  public dataSource = new MatTableDataSource<Evaluation>(this.evaluations);
  constructor(private router: Router, private selfAssessmentService: SelfAssessmentService, 
    private professorService: ProfessorService, private periodSerive: PeriodService,
    private laborService: LaborService, ) {}

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;


  ngOnInit(): void {
    this.loadSelfAssessments();
  }

  private loadSelfAssessments() {
    this.selfAssessmentService.getSelfAssessmentsComplete()
      .subscribe(selfAssessments => {
        this.dataSource.data = selfAssessments;
        console.log(selfAssessments);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }



  displayedColumns: string[] = [
    'periodo',
    'identificacionDocente',
    'nombreDocente',
    'apellidoDocente',
    'nombreLabor',
    'horas',
    'fechaInicio',
    'fechaFin',
    'estado',
    'resultados',
    'puntaje',
    'sugerencias',
  ];

  
  getColumnHeader(column: string) {
    const headerMapping: Record<string, string> = {
        periodo: "Periodo",
        nombreDocente: 'Nombre del Docente',
        apellidoDocente: 'Apellido del Docente',
        identificacionDocente: 'Identificación del Docente',
        nombreLabor: 'Nombre de la Labor',
        horas: 'Horas',
        fechaInicio: 'Fecha Inicio',
        fechaFin: 'Fecha Fin',
        estado: 'Estado',
        resultados: 'Resultados',
        puntaje: 'Puntaje',
        sugerencias: "Sugerencias"
    };

    return headerMapping[column] || column;
  }

  getCellValue(evaluation: Evaluation, column: string) {
    
    switch (column) {
      case 'puntaje':
        return evaluation.puntaje?.toFixed(2);
      
      default:
        return evaluation[column]; 
    }
  }
  
  viewEvaluationDetails(evaluation: Evaluation) {
    this.router.navigate(['/dashboard/self-assessment', evaluation.id]);
  }

  createEvaluation() {
    this.router.navigate(['/dashboard/create-self-assessment']);
  }
}
