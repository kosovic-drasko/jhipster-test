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
  isLoading = false;
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
  // loadRxj(): void {
  //   this.studentService.query().pipe(filter(num =>num.name =='paris')).subscribe
  //   // (val => console.log('Grad je ',val))
  //   this.students = num.body ?? [];
  // }
  ngOnInit(): void {
    this.loadAll();
    this.getStudenti();
  }
  trackId(_index: number, item: IStudent): number {
    return item.id!;
  }
  delete(student: IStudent): void {
    const modalRef = this.modalService.open(StudentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.student = student;
    // unsubscribe not needed because closed completes on modal close
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
