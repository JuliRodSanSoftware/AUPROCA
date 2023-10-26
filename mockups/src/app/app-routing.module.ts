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
