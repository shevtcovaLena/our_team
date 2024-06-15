import React, { useState } from 'react';
import type { ChangeEvent, Dispatch, SetStateAction} from 'react';
import axios from 'axios';
import type { UserType } from '../../App';


type InputsType = {
  title: string;
  body: string;
};

type FormPropsType = {
  setUsers: Dispatch<SetStateAction<UserType[]>>;
};

export default function Form({ setUsers }: FormPropsType): JSX.Element {
  const [inputs, setInputs] = useState<InputsType>({ title: '', body: '' });

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    console.log(inputs); // батчинг состояния (похоже на асинхронный код, смена состояния - не быстрая операция,
    // синхронный код может не успеть)
  };

  const addUserHandler = async (): Promise<void> => {
    const res = await axios.post('http://localhost:3333/api/', inputs);
    setUsers((prev) => [...prev, res.data]);
    setInputs({ title: '', body: '' });
  };

  return (
    <div>
      <form>
        <input name="title" type="text" value={inputs.title} onChange={changeHandler} />
        <input name="body" type="text" value={inputs.body} onChange={changeHandler} />
        <button type="button" onClick={addUserHandler}>
          Добавить
        </button>
      </form>
    </div>
  );
}
