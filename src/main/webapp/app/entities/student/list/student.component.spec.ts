import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { StudentService } from '../service/student.service';

import { StudentComponent } from './student.component';

describe('Student Management Component', () => {
  let comp: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;
  let service: StudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [StudentComponent],
    })
      .overrideTemplate(StudentComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StudentComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(StudentService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.students?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
