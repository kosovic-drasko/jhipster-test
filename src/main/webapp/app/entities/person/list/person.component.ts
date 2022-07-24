import { PersonUpdateComponent } from './../update/person-update.component';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PersonService } from '../service/person.service';
import { PersonDeleteDialogComponent } from '../delete/person-delete-dialog.component';
import { IPerson } from '../person.model';
import { PersonSaveComponent } from '../person-save/person-save.component';

@Component({
  selector: 'jhi-person',
  templateUrl: './person.component.html',
})
export class PersonComponent implements OnInit {
  people?: IPerson[];
  isLoading = false;
  //  let data: any{
  //     ime:'ana'
  //    }

  constructor(protected personService: PersonService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.personService.query().subscribe({
      next: (res: HttpResponse<IPerson[]>) => {
        this.isLoading = false;
        this.people = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IPerson): number {
    return item.id!;
  }

  delete(person: IPerson): void {
    const modalRef = this.modalService.open(PersonDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.person = person;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
        // eslint-disable-next-line no-console
        console.log('as');
      }
    });
  }

  save(person: IPerson): void {
    const modalRef = this.modalService.open(PersonSaveComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.person = person;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
  add(): void {
    const modalRef = this.modalService.open(PersonUpdateComponent, { size: 'lg', backdrop: 'static' });
    // modalRef.componentInstance.person = person;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.isLoading = true;
      }
    });
  }
}
