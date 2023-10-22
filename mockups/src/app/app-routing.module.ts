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


const routes: Routes = [
  { path: "sign-in", component: SignInComponent, pathMatch: "full" },
  { path: 'dashboard', component: DashboardComponent, children: [
    { path: '', component: HomeComponent }, 
    { path: 'create-professor', component: CreateProfessorComponent },
    { path: 'professors', component: ProfessorComponent }, 
    { path: 'professors/:id', component: ProfessorDetailComponent },
    { path: 'labor', component: LaborComponent }, 
    { path: 'self-assessment', component: SelfAssessmentComponent }, 
    
  ]},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
