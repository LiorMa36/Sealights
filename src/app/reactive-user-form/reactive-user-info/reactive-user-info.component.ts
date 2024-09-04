import { CommonModule } from '@angular/common';
import { Component, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { PersonUser } from 'src/app/interfaces/person';

@Component({
  selector: 'app-reactive-user-info',
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
  ],
  templateUrl: './reactive-user-info.component.html',
  styleUrl: './reactive-user-info.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReactiveUserInfoComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ReactiveUserInfoComponent),
      multi: true,
    },
    provideNativeDateAdapter(),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveUserInfoComponent
  implements ControlValueAccessor, Validator
{
  userInfoForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.userInfoForm = this.createUserInfoForm();
  }
  validate(c: AbstractControl): ValidationErrors | null {
    return this.userInfoForm.valid
      ? null
      : {
          invalidForm: {
            valid: false,
            message: 'userInfoForm fields are invalid',
          },
        };
  }

  onChange() {}
  onTouch() {}

  writeValue(userInfo: PersonUser): void {
    if (!userInfo) {
      for (let c in this.userInfoForm.controls) {
        this.userInfoForm.controls[c].setValue(null);
      }
      this.userInfoForm = this.createUserInfoForm();
    } else {
      this.userInfoForm.setValue(userInfo);
    }
  }
  registerOnChange(fn: any): void {
    this.userInfoForm.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.userInfoForm.disable() : this.userInfoForm.enable();
  }

  private createUserInfoForm(userInfo?: PersonUser): FormGroup {
    return this.formBuilder.group({
      name: [userInfo?.name || '', Validators.required],
      birthdate: [userInfo?.birthdate || ''],
    });
  }
}
