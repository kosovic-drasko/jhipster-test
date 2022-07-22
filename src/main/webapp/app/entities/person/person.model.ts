export interface IPerson {
  id?: number;
  name?: string | null;
  age?: number | null;
}

export class Person implements IPerson {
  constructor(public id?: number, public name?: string | null, public age?: number | null) {}
}

export function getPersonIdentifier(person: IPerson): number | undefined {
  return person.id;
}
