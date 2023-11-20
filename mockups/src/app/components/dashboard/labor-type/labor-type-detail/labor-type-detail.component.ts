import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LaborType } from 'src/app/models/laborType';
import { LaborTypeService } from 'src/app/services/labor-type.service';

@Component({
  selector: 'app-labor-type-detail',
  templateUrl: './labor-type-detail.component.html',
  styleUrls: ['./labor-type-detail.component.css']
})
export class LaborTypeDetailComponent {
  constructor(private _snackBar: MatSnackBar,private route: ActivatedRoute, private router: Router, public dialog: MatDialog, private laborTypeService: LaborTypeService) {}
  laborType = new LaborType;

  ngOnInit(): void {
    const laborTypeId = this.route.snapshot.paramMap.get('id');

    if (laborTypeId === null) {
      this._snackBar.open('ID inválido', 'Cerrar', {
        duration: 2000, 
        panelClass: ['warn']
      });
      this.router.navigate(['/dashboard/labor-type']);
      return;
    }

    this.laborTypeService.getLaborTypeDetail(laborTypeId).subscribe({
      next: (data: LaborType) => {
        this.laborType = data
      },
      error: () => {
        this._snackBar.open('ID inválido', 'Cerrar', {
          duration: 2000,
          panelClass: ['warn'] 
        });
        this.router.navigate(['/dashboard/labor-type']);
        return; 
      }
    }); 
    
    
    
  }



  saveChanges(){
    const laborTypeId = this.route.snapshot.paramMap.get('id');

    if (laborTypeId === null) {
      this._snackBar.open('ID inválido', 'Cerrar', {
        duration: 2000,
        panelClass: ['warn']
      });
      this.router.navigate(['/dashboard/labor-type']);
      return;
    }

    const dialogRef = this.dialog.open(DialogSaveLaborType);
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.laborTypeService.updateLaborType(laborTypeId, this.laborType).subscribe({
          next : () => {
            this._snackBar.open('Se editó la labor correctamente', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/dashboard/labor-types']);
          },
          error: () => {
            this._snackBar.open('Error, no se pudo editar a la labor', 'Error', {
              duration: 3000,
            });
          }
        });
      }
    });

    return; 
  }


  deleteLabor() {
    const laborTypeId = this.route.snapshot.paramMap.get('id');

    if (laborTypeId === null) {
      this._snackBar.open('ID inválido', 'Cerrar', {
        duration: 2000, 
        panelClass: ['warn']
      });
      this.router.navigate(['/dashboard/labor-types']);
      return; 
    }

    const dialogRef = this.dialog.open(DialogDeleteLaborType);
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.laborTypeService.deleteLaborType(laborTypeId).subscribe({
          next: () => {
            this._snackBar.open('Se eliminó la labor correctamente', 'Cerrar', {
              duration: 3000, 
            });
            this.router.navigate(['/dashboard/labor-types']);
          },
          error: () => {
            this._snackBar.open('Error, no se pudo eliminar la labor.', 'Cerrar', {
              duration: 3000,
            });
        
          }
        });    
      }
    });

    


  }

}

@Component({
  selector: 'dialog-save-labor-type',
  templateUrl: './dialogs/dialog-save-labor-type.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogSaveLaborType {}

@Component({
  selector: 'dialog-delete-labor-type',
  templateUrl: './dialogs/dialog-delete-labor-type.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogDeleteLaborType {}
