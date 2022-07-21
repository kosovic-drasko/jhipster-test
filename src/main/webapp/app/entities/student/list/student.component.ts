import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IStudent } from '../student.model';
import { StudentService } from '../service/student.service';
import { StudentDeleteDialogComponent } from '../delete/student-delete-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'jhi-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.scss'],
})
export class StudentComponent implements OnInit {
  students?: IStudent[];
  student_age?: number[];
  student_name?: any[];
  isLoading = false;
  ime?: string;
  ukupno?: any;
  public displayedColumns = ['id', 'name', 'age'];

  public dataSource = new MatTableDataSource<IStudent>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(protected studentService: StudentService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;
    this.studentService.query().subscribe({
      next: (res: HttpResponse<IStudent[]>) => {
        this.isLoading = false;
        this.students = res.body ?? [];
        this.dataSource.data = res.body ?? [];
        this.getTotalProcjenjena();
        // eslint-disable-next-line no-console
        console.log(' ===========>  ', this.students);
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
        this.dataSource.data = res.filter(val => val.name === this.ime);
        this.getTotalProcjenjena();
        // this.ukupno = res.reduce((acc, productsdet) => acc + productsdet.age!, 0);
        // eslint-disable-next-line no-console
        console.log('Studenti iz boota ukupno godina======>>  ', this.ukupno);
        // eslint-disable-next-line no-console
        console.log('Studenti iz boota name je  ', this.students);
        // eslint-disable-next-line no-console
        console.log('Uvecane godine ===========>  ', this.student_age);
      },
    });
  }

  getTotalProcjenjena(): any {
    return (this.ukupno = this.dataSource.filteredData.map(t => t.age).reduce((acc, value) => acc! + value!, 0));
    // eslint-disable-next-line no-console
    console.log('Uvecane godine ===========>  ', this.ukupno);
  }

  ngOnInit(): void {
    this.loadAll();

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
