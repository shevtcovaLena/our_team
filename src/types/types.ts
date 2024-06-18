
interface IPerson {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar:string;
}

interface IPerson {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar:string;
  like?:boolean;
}

export type PersonsType = Array<IPerson>;

export type { IPerson }
