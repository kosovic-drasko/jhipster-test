import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IStudent } from '../student.model';
import { StudentService } from '../service/student.service';
import { StudentDeleteDialogComponent } from '../delete/student-delete-dialog.component';
@Component({
  selector: 'jhi-student',
  templateUrl: './student.component.html',
})
export class StudentComponent implements OnInit {
  students?: IStudent[];
  student_age?: number[];
  student_name?: any[];
  isLoading = false;
  ime?: string;
  ukupno?: any;
  constructor(protected studentService: StudentService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;
    this.studentService.query().subscribe({
      next: (res: HttpResponse<IStudent[]>) => {
        this.isLoading = false;
        this.students = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
  loadAll1(): void {
    this.studentService.query1().subscribe({
      next: res => {
        this.students = res;
        this.student_age = res.map(val => val.age! * 10);
        this.students = res.filter(val => val.name === this.ime);

        this.ukupno = res.reduce((acc, productsdet) => acc + productsdet.age!, 0);
        // eslint-disable-next-line no-console
        console.log('Studenti iz boota ukupno godina======>>  ', this.ukupno);
        // eslint-disable-next-line no-console
        console.log('Studenti iz boota name je  ', this.students);
        // eslint-disable-next-line no-console
        console.log('Uvecane godine ===========>  ', this.student_age);
      },
    });
  }
  ngOnInit(): void {
    this.loadAll1();
    // this.getStudenti();
  }
  trackId(_index: number, item: IStudent): number {
    return item.id!;
  }
  delete(student: IStudent): void {
    const modalRef = this.modalService.open(StudentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.student = student;

    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
  getStudenti(): any {
    this.studentService.getPerson().subscribe({
      next: res => {
        // eslint-disable-next-line no-console
        console.log('Studenti su ', res);
      },
    });
  }
}
