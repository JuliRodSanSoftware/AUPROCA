import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Labor } from 'src/app/models/labor';
import { LaborType } from 'src/app/models/laborType';
import { LaborTypeService } from 'src/app/services/labor-type.service';
import { LaborService } from 'src/app/services/labor.service';

@Component({
  selector: 'app-create-labor',
  templateUrl: './create-labor.component.html',
  styleUrls: ['./create-labor.component.css']
})
export class CreateLaborComponent {
  newLabor = new Labor();
  loading = false;
  laborTypes: LaborType[] = [];

  constructor( private _snackBar: MatSnackBar, private router: Router,  private laborService: LaborService, private laborTypeService: LaborTypeService) {}

  ngAfterViewInit(): void {
    this.laborTypeService.getLaborTypes().subscribe(laborTypes =>{
      this.laborTypes = laborTypes;
    });
  }

  createLabor() {
    this.loading = true;
    this.laborService.createLabor(this.newLabor).subscribe({
        next: () => {
          this.loading = false;
          this._snackBar.open('Se ha creado la labor correctamente', 'Cerrar', {
            duration: 3000,
          });
          this.router.navigate(['/dashboard/labors']);
        },
        error: () => {
          this.loading = false;
          this._snackBar.open('Error, no se pudo crear la labor', 'Cerrar', {
            duration: 3000,
          });
         
        }
      }
    );
  }
}
