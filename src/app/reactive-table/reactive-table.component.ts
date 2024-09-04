import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  inject,
  DestroyRef,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Address, PersonUser } from '../interfaces/person';
import { ApiService } from '../api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-reactive-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reactive-table.component.html',
  styleUrl: './reactive-table.component.scss',
})
export class ReactiveTableComponent {
  destroyRef = inject(DestroyRef);
  displayedColumns: string[] = ['id', 'name', 'birthdate', 'addressesCount'];
  data: MatTableDataSource<PersonUser> = new MatTableDataSource<PersonUser>([]);

  constructor(private api: ApiService) {}

  ngAfterViewInit() {
    this.api
      .getPersons()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((persons: PersonUser[]) => {
        const data = persons.map((p: PersonUser) => {
          const tp: PersonUser = {
            id: p.id,
            name: p.name,
            birthdate: p.birthdate,
            addressesCount: this.getAddressesCount(p.addresses),
          };
          return tp;
        });
        this.data.data = data;
      });
  }

  private getAddressesCount(p: Address[] | undefined): number {
    return p?.length || 1;
  }
}
