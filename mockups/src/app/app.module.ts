import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { HomeComponent } from './components/dashboard/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfessorComponent } from './components/dashboard/professor/professor.component';
import { ProfessorDetailComponent } from './components/dashboard/professor/professor-detail/professor-detail.component';
import { LaborComponent } from './components/dashboard/labor/labor.component';
import { SelfAssessmentComponent } from './components/dashboard/self-assessment/self-assessment.component';
import { CreateProfessorComponent } from './components/dashboard/professor/create-professor/create-professor.component';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';



@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    DashboardComponent,
    ProfessorComponent,
    ProfessorDetailComponent,
    LaborComponent,
    SelfAssessmentComponent,
    CreateProfessorComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    MatStepperModule,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
