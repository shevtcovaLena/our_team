/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState, useEffect } from 'react';

const initState = {
  dog: '',
  isLoading: true,
};

type ResT = {
  message: string;
  status: string;
};

type DogT = {
  dog: string;
  isLoading: boolean;
};

function useDog(): [DogT, () => Promise<void>] {
  const [dog, setDog] = useState(initState);

  const getDog = async (): Promise<void> => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const result: ResT = await response.json();
      setDog((prev) => ({ ...prev, dog: result.message, isLoading: false }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDog().catch((err) => err);
  }, []);

  return [dog, getDog];
}

export default useDog;
