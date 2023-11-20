import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HomeComponent } from './components/dashboard/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfessorComponent } from './components/dashboard/professor/professor.component';
import { ProfessorDetailComponent } from './components/dashboard/professor/professor-detail/professor-detail.component';
import { LaborComponent } from './components/dashboard/labor/labor.component';
import { SelfAssessmentComponent } from './components/dashboard/self-assessment/self-assessment.component';
import { CreateProfessorComponent } from './components/dashboard/professor/create-professor/create-professor.component';
import { CreateLaborComponent } from './components/dashboard/labor/create-labor/create-labor.component';
import { LaborDetailComponent } from './components/dashboard/labor/labor-detail/labor-detail.component';
import { SelfAssessmentDetailComponent } from './components/dashboard/self-assessment/self-assessment-detail/self-assessment-detail.component';
import { CreateSelfAssessmentComponent } from './components/dashboard/self-assessment/create-self-assessment/create-self-assessment.component';
import { CreateLaborTypeComponent } from './components/dashboard/labor-type/create-labor-type/create-labor-type.component';
import { LaborTypeComponent } from './components/dashboard/labor-type/labor-type.component';
import { LaborTypeDetailComponent } from './components/dashboard/labor-type/labor-type-detail/labor-type-detail.component';


const routes: Routes = [
  { path: "sign-in", component: SignInComponent, pathMatch: "full" },
  { path: 'dashboard', component: DashboardComponent, children: [
    { path: '', component: HomeComponent }, 
    { path: 'create-professor', component: CreateProfessorComponent },
    { path: 'professors', component: ProfessorComponent }, 
    { path: 'professors/:id', component: ProfessorDetailComponent },
    { path: 'create-labor', component: CreateLaborComponent },
    { path: 'labors', component: LaborComponent }, 
    { path: 'labors/:id', component: LaborDetailComponent },
    { path: 'create-labor-type', component: CreateLaborTypeComponent },
    { path: 'labor-types', component: LaborTypeComponent }, 
    { path: 'labor-types/:id', component: LaborTypeDetailComponent },
    { path: 'create-self-assessment', component: CreateSelfAssessmentComponent }, 
    { path: 'self-assessment', component: SelfAssessmentComponent }, 
    { path: 'self-assessment/:id', component: SelfAssessmentDetailComponent }, 
    
  ]},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
