import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessorData } from 'src/app/models/professorData';
import { Role } from 'src/app/models/role';
import { UserRol } from 'src/app/models/user-rol';
import { ProfessorService } from 'src/app/services/professor.service';
import { RoleService } from 'src/app/services/role.service';
import { UserRoleService } from 'src/app/services/user-rol.service';

@Component({
  selector: 'app-professor-detail',
  templateUrl: './professor-detail.component.html',
  styleUrls: ['./professor-detail.component.css']
})
export class ProfessorDetailComponent {
  professor = new ProfessorData();
  userRole = new UserRol();
  roles : Role[] = [];
  selectedRole: any = ''; 

  

  constructor( private _snackBar: MatSnackBar,private route: ActivatedRoute, 
    private router: Router, public dialog: MatDialog, private professorService: ProfessorService,
    private cdr: ChangeDetectorRef, 
    private userRoleService: UserRoleService,
    private roleService: RoleService, ) {}


  ngAfterViewInit(): void {
    // Obtén el ID del profesor de los parámetros de la ruta
    const professorId = this.route.snapshot.paramMap.get('id');

    if (professorId === null) {
      this._snackBar.open('ID inválido', 'Cerrar', {
        duration: 2000, // Duración en milisegundos
        panelClass: ['warn'] // Clase CSS personalizada para estilizar el Snackbar
      });
      this.router.navigate(['/dashboard/professors']);
      return; // Finaliza la función si no hay un ID válido
    }


    this.roleService.getRoles().subscribe(
      {
        next: (roles) =>{
          this.roles = roles;
          this.professorService.getProfessorDetail(professorId).subscribe({
            next: (data: ProfessorData) => {
              this.professor = data
              this.userRoleService.getUserRoles().subscribe({
                next:(userRoles)=>{
                  userRoles.map((role) =>{
                    if (role.usr_identificacion == this.professor.usr_identificacion){
                      console.log(role.usr_identificacion);
                      this.userRole = role;
                      this.selectedRole = role.rol_id?.toString();
                      this.cdr.detectChanges();
                    }
                      
                  })
                }
                
              });
              
            },
            error: (error) => {
              this._snackBar.open('ID inválido', 'Cerrar', {
                duration: 2000, // Duración en milisegundos
                panelClass: ['warn'] // Clase CSS personalizada para estilizar el Snackbar
              });
              this.router.navigate(['/dashboard/professors']);
              return; // Finaliza la función si no hay un ID válido
            }
          }); 
        },

        error: () =>{
          this._snackBar.open('No se pudo consultar los roles', 'Cerrar', {
            duration: 2000, // Duración en milisegundos
            panelClass: ['warn'] // Clase CSS personalizada para estilizar el Snackbar
          });
          this.router.navigate(['/dashboard/professors']);
          return; // Finaliza la función si no hay un ID válido
        }
      }
    );
    
  }
  saveChanges(){
    const professorId = this.route.snapshot.paramMap.get('id');

    const dialogRef = this.dialog.open(DialogSaveProfessor);


    if (professorId === null) {
      this._snackBar.open('ID inválido', 'Cerrar', {
        duration: 2000, // Duración en milisegundos
        panelClass: ['warn'] // Clase CSS personalizada para estilizar el Snackbar
      });
      this.router.navigate(['/dashboard/professors']);
      return; // Finaliza la función si no hay un ID válido
    }

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.professorService.updateProfessor(professorId, this.professor).subscribe({
          next : () => {
            // Manejo de éxito: Puedes redirigir, mostrar un mensaje, etc.
            this._snackBar.open('Se editó el docente correctamente', 'Cerrar', {
              duration: 3000, // Duración en milisegundos
            });
            this.router.navigate(['/dashboard/professors']);
          },
          error: () => {
            this._snackBar.open('Error, no se pudo editar al docente', 'Error', {
              duration: 3000, // Duración en milisegundos
            });
            
          }
        });
      }
    });
    return; 
  }
  deleteProfessor() {
    const dialogRef = this.dialog.open(DialogDeleteProfessor);


    const professorId = this.route.snapshot.paramMap.get('id');

    if (professorId === null) {
      this._snackBar.open('ID inválido', 'Cerrar', {
        duration: 2000, // Duración en milisegundos
        panelClass: ['warn'] // Clase CSS personalizada para estilizar el Snackbar
      });
      this.router.navigate(['/dashboard/professors']);
      return; // Finaliza la función si no hay un ID válido
    }

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.professorService.deleteProfessor(professorId).subscribe({
          next: () => {
            this._snackBar.open('Se eliminó el docente correctamente', 'Cerrar', {
              duration: 3000, // Duración en milisegundos
            });
            this.router.navigate(['/dashboard/professors']);
          },
          error: () => {
            this._snackBar.open('Error, no se pudo eliminar al docente.', 'Cerrar', {
              duration: 3000, // Duración en milisegundos
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
  templateUrl: './dialogs/dialog-save-professor.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogSaveProfessor {}

@Component({
  selector: 'dialog-delete-professor',
  templateUrl: './dialogs/dialog-delete-professor.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogDeleteProfessor {}

