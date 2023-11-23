import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  Router } from '@angular/router';
import { Professor } from 'src/app/models/professor';
import { Role } from 'src/app/models/role';
import { UserRol } from 'src/app/models/user-rol';
import { ProfessorService } from 'src/app/services/professor.service';
import { RoleService } from 'src/app/services/role.service';
import { UserRoleService } from 'src/app/services/user-rol.service';

@Component({
  selector: 'app-create-professor',
  templateUrl: './create-professor.component.html',
  styleUrls: ['./create-professor.component.css']
})
export class CreateProfessorComponent {

  newProfessor = new Professor();
  newUserRole = new UserRol();
  roles : Role[] = [];
  loading = false;
  constructor( private _snackBar: MatSnackBar, private router: Router, 
    private professorService: ProfessorService, private userRolService: UserRoleService,
    private rolService: RoleService) {}

  ngAfterViewInit(): void {
    this.rolService.getRoles().subscribe(roles =>{
      this.roles = roles;
    });
  }

  createProfessor() {
    this.newUserRole.usr_identificacion = this.newProfessor.identificationNumber;
    this.loading = true;
    this.professorService.createProfessor(this.newProfessor).subscribe({
        next: () => {
          this.userRolService.createUserRole(this.newUserRole).subscribe({
            next:() =>{
              this.loading = false;
              this._snackBar.open('Se ha creado el docente correctamente', 'Cerrar', {
                duration: 3000,
              });
              this.router.navigate(['/dashboard/professors']);
                },
            error:() =>{
              this.loading = false;
              this._snackBar.open('Error, no se pudo crear el docente', 'Cerrar', {
                duration: 3000,
              });
            }
          })
        },
        error: () => {
          this.loading = false;
          this._snackBar.open('Error, no se pudo crear el docente', 'Cerrar', {
            duration: 3000,
          });
         
        }
      }
    );
  }
}
