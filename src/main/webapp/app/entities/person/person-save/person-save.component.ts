import { Component, OnInit } from '@angular/core';
import { IPerson, Person } from '../person.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonService } from '../service/person.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'jhi-person-save',
  templateUrl: './person-save.component.html',
  styleUrls: ['./person-save.component.scss'],
})
export class PersonSaveComponent implements OnInit {
  isSaving = false;
  person?: IPerson;

  editForm = this.fb.group({
    id: [],
    name: [],
    age: [],
  });

  constructor(
    protected activeModal: NgbActiveModal,
    protected personService: PersonService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  previousState(): void {
    window.history.back();
    console.log('ad');
  }
  cancel(): void {
    this.activeModal.dismiss();
  }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ person }) => {
      this.isSaving = false;
    });
  }
  save(): void {
    const person = this.createFromForm();

    this.subscribeToSaveResponse(this.personService.create(person));
    console.log('ad');
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPerson>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      // next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected createFromForm(): IPerson {
    return {
      ...new Person(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      age: this.editForm.get(['age'])!.value,
    };
  }

  protected updateForm(person: IPerson): void {
    this.editForm.patchValue({
      id: person.id,
      name: person.name,
      age: person.age,
    });
  }
}
