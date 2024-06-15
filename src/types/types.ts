
interface IPerson {
  id: number;
  title: string;
  text: string;
}

export type PersonsType = Array<IPerson>;

export type { IPerson }
