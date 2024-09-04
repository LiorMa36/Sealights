import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveUserInfoComponent } from './reactive-user-info/reactive-user-info.component';
import { ReactiveAddressesComponent } from './reactive-addresses/reactive-addresses.component';
import { PersonUser } from '../interfaces/person';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reactive-user-form',
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
    ReactiveUserInfoComponent,
    ReactiveAddressesComponent,
  ],
  templateUrl: './reactive-user-form.component.html',
  styleUrl: './reactive-user-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveUserFormComponent {
  userForm: FormGroup;
  errorMessage = signal('');
  destroyRef = inject(DestroyRef);
  personsCount: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private api: ApiService
  ) {
    this.userForm = this.createUserForm();
    this.api
      .getPersons()
      .pipe(takeUntilDestroyed())
      .subscribe((persons: PersonUser[]) => {
        this.personsCount = persons.length;
      });
  }

  save() {
    const { name, birthdate } = this.userForm.getRawValue().userInfo;
    const person: PersonUser = {
      id: this.personsCount + 1,
      name,
      birthdate,
      addresses: this.userForm.getRawValue().addresses,
    };
    this.api
      .createPerson(person)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.reset();
        this.router.navigate(['/rt'], { relativeTo: this.route });
      });
  }

  private createUserForm() {
    return this.formBuilder.group({
      userInfo: [''],
      addresses: [[]],
    });
  }

  private reset() {
    for (let c in this.userForm.controls) {
      this.userForm.controls[c].setValue(null);
    }
    this.userForm.reset();
  }
}
