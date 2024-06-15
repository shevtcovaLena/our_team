interface IInputs {
  title: string,
  text: string,
  check1?: boolean
}

interface IPropsForm {
  inputs: IInputs,
  formHandler: React.ChangeEventHandler,
  submitHandler: React.FormEventHandler
}

interface IList {
  cards: IInputs[],
  // delHandler: (id: number) => void
}

interface IUser {
  id: number;
  title: string;
  text: string;
  // createdAt: Date;
  // updatedAt: Date;
}

export type UsersType = Array<IUser>;

export type { IInputs, IPropsForm, IList, IUser }
