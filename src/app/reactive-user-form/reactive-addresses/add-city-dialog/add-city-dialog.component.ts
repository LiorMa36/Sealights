import { Component, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-city-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './add-city-dialog.component.html',
  styleUrl: './add-city-dialog.component.scss',
})
export class AddCityDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddCityDialogComponent>);
  readonly data = inject<{ countryName: string }>(MAT_DIALOG_DATA);
  readonly cityName = model('');

  onNoClick(): void {
    this.dialogRef.close();
  }
}
