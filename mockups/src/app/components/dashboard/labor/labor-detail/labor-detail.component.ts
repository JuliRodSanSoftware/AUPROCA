import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { Labor } from 'src/app/models/labor';
import { LaborType } from 'src/app/models/laborType';
import { LaborTypeService } from 'src/app/services/labor-type.service';
import { LaborService } from 'src/app/services/labor.service';

@Component({
  selector: 'app-labor-detail',
  templateUrl: './labor-detail.component.html',
  styleUrls: ['./labor-detail.component.css']
})
export class LaborDetailComponent {
  constructor
  (private _snackBar: MatSnackBar,private route: ActivatedRoute, private router: Router, public dialog: MatDialog, private cdr: ChangeDetectorRef, private laborService: LaborService, private laborTypeService: LaborTypeService) {}

  labor = new Labor();  
  laborTypes: LaborType[] = [];
  selectedType: any = ''; 

  ngOnInit(): void {
  
  }

  ngAfterViewInit(): void {

    const laborId = this.route.snapshot.paramMap.get('id');

    if (laborId === null) {
      this._snackBar.open('ID inválido', 'Cerrar', {
        duration: 2000, 
        panelClass: ['warn']
      });
      this.router.navigate(['/dashboard/labors']);
      return;
    }
    
    this.laborTypeService.getLaborTypes().subscribe(laborTypes =>{
      this.laborTypes = laborTypes;
      this.laborService.getLaborDetail(laborId).subscribe({
        next: (data: Labor) => {
          this.labor = data;
          this.selectedType = data.tl_id?.toString();
          this.cdr.detectChanges();
        },
        error: () => {
          this._snackBar.open('ID inválido', 'Cerrar', {
            duration: 2000,
            panelClass: ['warn'] 
          });
          this.router.navigate(['/dashboard/labors']);
          return; 
        }
      });   
    })

    
  }


  saveChanges(){
    const laborId = this.route.snapshot.paramMap.get('id');

    if (laborId === null) {
      this._snackBar.open('ID inválido', 'Cerrar', {
        duration: 2000,
        panelClass: ['warn']
      });
      this.router.navigate(['/dashboard/labors']);
      return;
    }

    const dialogRef = this.dialog.open(DialogSaveLabor);
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.laborService.updateLabor(laborId, this.labor).subscribe({
          next : () => {
            this._snackBar.open('Se editó la labor correctamente', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/dashboard/labors']);
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
    const laborId = this.route.snapshot.paramMap.get('id');

    if (laborId === null) {
      this._snackBar.open('ID inválido', 'Cerrar', {
        duration: 2000, 
        panelClass: ['warn']
      });
      this.router.navigate(['/dashboard/labors']);
      return; 
    }

    const dialogRef = this.dialog.open(DialogDeleteLabor);
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.laborService.deleteLabor(laborId).subscribe({
          next: () => {
            this._snackBar.open('Se eliminó la labor correctamente', 'Cerrar', {
              duration: 3000, 
            });
            this.router.navigate(['/dashboard/labors']);
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
  selector: 'dialog-save-labor',
  templateUrl: './dialogs/dialog-save-labor.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogSaveLabor {}

@Component({
  selector: 'dialog-delete-labor',
  templateUrl: './dialogs/dialog-delete-labor.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogDeleteLabor {}

