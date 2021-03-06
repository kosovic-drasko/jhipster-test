import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { filter, from, map, Observable } from 'rxjs';
import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IStudent, getStudentIdentifier } from '../student.model';
export type EntityResponseType = HttpResponse<IStudent>;
export type EntityArrayResponseType = HttpResponse<IStudent[]>;
@Injectable({ providedIn: 'root' })
export class StudentService {
  readonly source = from([
    { name: 'Joe', age: 31 },
    { name: 'Bob', age: 25 },
  ]);
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/students');
  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}
  public getPerson(): Observable<any> {
    return this.source.pipe(
      filter(person => person.age >= 30),
      map(person => person.age * 10)
    );
    // return this.source.pipe(filter(person => person.age >= 30));
    // return this.source.pipe(filter(person => person.age >= 30),map(person => person.age *30));
    // return this.source.pipe(
    //   map(items => items) /* Don't forget to add this! */,
    //   filter(item => item.name === 'ana')
    // );
  }
  create(student: IStudent): Observable<EntityResponseType> {
    return this.http.post<IStudent>(this.resourceUrl, student, { observe: 'response' });
  }
  update(student: IStudent): Observable<EntityResponseType> {
    return this.http.put<IStudent>(`${this.resourceUrl}/${getStudentIdentifier(student) as number}`, student, { observe: 'response' });
  }
  partialUpdate(student: IStudent): Observable<EntityResponseType> {
    return this.http.patch<IStudent>(`${this.resourceUrl}/${getStudentIdentifier(student) as number}`, student, { observe: 'response' });
  }
  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStudent>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  query(req?: any): Observable<HttpResponse<IStudent[]>> {
    const options = createRequestOption(req);
    return this.http.get<IStudent[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  query1(): Observable<IStudent[]> {
    const student = this.http.get<IStudent[]>(this.resourceUrl);

    return student;
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  addStudentToCollectionIfMissing(studentCollection: IStudent[], ...studentsToCheck: (IStudent | null | undefined)[]): IStudent[] {
    const students: IStudent[] = studentsToCheck.filter(isPresent);
    if (students.length > 0) {
      const studentCollectionIdentifiers = studentCollection.map(studentItem => getStudentIdentifier(studentItem)!);
      const studentsToAdd = students.filter(studentItem => {
        const studentIdentifier = getStudentIdentifier(studentItem);
        if (studentIdentifier == null || studentCollectionIdentifiers.includes(studentIdentifier)) {
          return false;
        }
        studentCollectionIdentifiers.push(studentIdentifier);
        return true;
      });
      return [...studentsToAdd, ...studentCollection];
    }
    return studentCollection;
  }
}
