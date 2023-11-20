import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LaborType } from 'src/app/models/laborType';
import { LaborTypeService } from 'src/app/services/labor-type.service';

@Component({
  selector: 'app-create-labor-type',
  templateUrl: './create-labor-type.component.html',
  styleUrls: ['./create-labor-type.component.css']
})
export class CreateLaborTypeComponent {
  newLaborType = new LaborType();
  loading = false;
  constructor( private _snackBar: MatSnackBar, private router: Router, private laborTypeService: LaborTypeService) {}

  createLaborType() {
    this.loading = true;
    this.laborTypeService.createLabor(this.newLaborType).subscribe({
        next: () => {
          this.loading = false;
          this._snackBar.open('Se ha creado el tipo labor correctamente', 'Cerrar', {
            duration: 3000,
          });
          this.router.navigate(['/dashboard/labor-types']);
        },
        error: () => {
          this.loading = false;
          this._snackBar.open('Error, no se pudo crear el tipo labor', 'Cerrar', {
            duration: 3000,
          });
         
        }
      }
    );
  }
}
