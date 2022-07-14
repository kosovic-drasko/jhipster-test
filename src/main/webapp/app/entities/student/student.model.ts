export interface IStudent {
  id?: number;
  name?: string | null;
  age?: number;
}

export class Student implements IStudent {
  constructor(public id?: number, public name?: string | null, public age?: number) {}
}

export function getStudentIdentifier(student: IStudent): number | undefined {
  return student.id;
}
