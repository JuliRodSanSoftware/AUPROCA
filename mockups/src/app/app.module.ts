import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

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
import { LaborTypeComponent } from './components/dashboard/labor-type/labor-type.component';
import { CreateLaborTypeComponent } from './components/dashboard/labor-type/create-labor-type/create-labor-type.component';
import { LaborTypeDetailComponent } from './components/dashboard/labor-type/labor-type-detail/labor-type-detail.component';

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
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';






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
    CreateLaborComponent,
    LaborDetailComponent,
    SelfAssessmentDetailComponent,
    CreateSelfAssessmentComponent,
    LaborTypeComponent,
    CreateLaborTypeComponent,
    LaborTypeDetailComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
    NgxMatSelectSearchModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
