import { CommonModule } from '@angular/common';
import {
  Component,
  forwardRef,
  ChangeDetectionStrategy,
  inject,
  DestroyRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import {
  ReactiveFormsModule,
  FormsModule,
  NG_VALUE_ACCESSOR,
  FormGroup,
  FormBuilder,
  AbstractControl,
  Validators,
  ControlValueAccessor,
  ValidationErrors,
  Validator,
  FormArray,
  NG_VALIDATORS,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Address, City, Country } from 'src/app/interfaces/person';
import { ApiService } from 'src/app/api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AddCityDialogComponent } from './add-city-dialog/add-city-dialog.component';

@Component({
  selector: 'app-reactive-addresses',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  ],
  templateUrl: './reactive-addresses.component.html',
  styleUrl: './reactive-addresses.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReactiveAddressesComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ReactiveAddressesComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveAddressesComponent
  implements ControlValueAccessor, Validator
{
  addressesFormArray: FormArray;
  countries$: Observable<Country[]>;
  readonly dialog = inject(MatDialog);
  destroyRef = inject(DestroyRef);

  constructor(private formBuilder: FormBuilder, private api: ApiService) {
    this.addressesFormArray = this.formBuilder.array([
      this.createAddressForm(),
    ]);
    this.api
      .refreshCountries()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
    this.countries$ = this.api.getCountriesAsObs();
  }

  getCitiesByCountryId(id: number) {
    return this.api.getCitiesByCountryId(id);
  }

  castToFormGroup(control: AbstractControl) {
    return control as FormGroup;
  }

  addAddress() {
    this.addressesFormArray.push(this.createAddressForm());
  }

  removeAddress(i: number) {
    this.addressesFormArray.removeAt(i);
  }

  selectCountry(country: Country) {}

  addCity(country: Country) {
    const dialogRef = this.dialog.open(AddCityDialogComponent, {
      data: { countryName: country?.name || 'Israel' },
    });

    dialogRef.afterClosed().subscribe((cityName: string) => {
      if (cityName !== undefined) {
        const newCityId: any =
          this.api.getCitiesByCountryId(country?.id || 1).length + 1;
        const city: City = {
          name: cityName,
          countryId: country?.id || 1,
          id: newCityId,
        };
        this.api
          .addCity(city)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(() =>
            this.api
              .refreshCountries()
              .pipe(takeUntilDestroyed(this.destroyRef))
              .subscribe()
          );
      }
    });
  }

  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1 === f2;
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.addressesFormArray.valid
      ? null
      : {
          invalidForm: {
            valid: false,
            message: 'AddressesFormArray fields are invalid',
          },
        };
  }

  onChange() {}
  onTouch() {}

  writeValue(addresses: Address[]): void {
    this.initAddressesFormArray(addresses);
  }
  registerOnChange(fn: any): void {
    this.addressesFormArray.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled
      ? this.addressesFormArray.disable()
      : this.addressesFormArray.enable();
  }

  private initAddressesFormArray(addresses: Address[]) {
    if (addresses && addresses.length) {
      this.addressesFormArray = this.formBuilder.array(
        addresses.map((address: Address) => this.createAddressForm(address))
      );
      return;
    }
    for (let addressForm of this.addressesFormArray.controls) {
      for (let c in this.castToFormGroup(addressForm).controls) {
        this.castToFormGroup(addressForm).controls[c].setValue(null);
      }
    }
    this.addressesFormArray = this.formBuilder.array([
      this.createAddressForm(),
    ]);
  }

  private createAddressForm(address?: Address): FormGroup {
    return this.formBuilder.group({
      name: [address?.name || null, Validators.required],
      countryId: [address?.countryId || null],
      cityId: [address?.cityId || null],
      street: [address?.street || null, Validators.required],
    });
  }
}
