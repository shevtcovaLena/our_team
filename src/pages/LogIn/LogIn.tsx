import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './LogIn.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../helpers/getcockie';

interface IFormInput {
  name: string;
  email: string;
  password: number;
  repitPassword: string;
}

export function LogIn(): JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (getCookie('token')) {
      navigate('/users');
    }
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = async (data: IFormInput, e: React.BaseSyntheticEvent): Promise<void> => {
    const { email, password } = data;
    const sendBody = { email, password };
    try {
      const response = await axios.post(`https://reqres.in/api/register`, sendBody);
      if (response.status === 200) {
        const { token } = response.data;
        document.cookie = `token=${token}; max-age=${60 * 60 * 24 * 30}; path=/`;
        e.target.reset();
        navigate('/users');
      } else {
        throw new Error('Ошибка регистрации' + response.data.error);
      }
    } catch (error) {
      console.log(error);
      console.log(`введите следующие данные: "email": "eve.holt@reqres.in"`);
      alert(`для успешной регистрации введите email, который, указан в консоли (для удобства копирования)`);
    }
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = (): void => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputs}>
            <h2>Регистрация</h2>

            <div className={styles.group}>
              <label>Имя</label>
              <input
                placeholder="Артур"
                {...register('name', {
                  required: true,
                  maxLength: 20,
                })}
                className={errors?.name ? styles.error : ''}
              />
              {errors?.name?.type === 'required' && (
                <p className={styles.message}>Ошибка: поле обязательно для заполнения</p>
              )}
              {errors?.name?.type === 'maxLength' && (
                <p className={styles.message}>Ошибка: имя не должно превышать 20 символов</p>
              )}
            </div>

            <div className={styles.group}>
              <label>Электронная почта</label>
              <input
                placeholder="example@mail.ru"
                {...register('email', {
                  required: true,
                  pattern: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/i,
                })}
                className={errors?.email ? styles.error : ''}
              />
              {errors?.email?.type === 'required' && (
                <p className={styles.message}> Ошибка: поле обязательно для заполнения</p>
              )}
              {errors?.email?.type === 'pattern' && (
                <p className={styles.message}>Ошибка: введите корректный адрес</p>
              )}
            </div>

            <div className={styles.group}>
              <label>Пароль</label>
              <div className={styles.password}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="******"
                  {...register('password', {
                    required: true,
                    pattern: /^(?=.*[a-zA-Z]).{6,}$/i,
                  })}
                  className={errors?.password ? styles.error : ''}
                />
                {errors?.password?.type === 'required' && (
                  <p className={styles.message}> Ошибка: поле обязательно для заполнения</p>
                )}
                {errors?.password?.type === 'pattern' && (
                  <p className={styles.message}>
                    Ошибка: пароль должен быть не короче 6 символов и состоять из букв латинского
                    алфавита
                  </p>
                )}
                <button type="button" className={styles.toggle} onClick={togglePasswordVisibility}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke={showPassword ? '#512689' : '#808185'}
                  >
                    <use href="eye1.svg#eye" />
                  </svg>
                </button>
              </div>
            </div>

            <div className={styles.group}>
              <label>Подтвердите пароль</label>
              <div className={styles.password}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirm-password"
                  placeholder="******"
                  {...register('repitPassword', {
                    required: true,
                    validate: (value) => value === watch('password') || '',
                  })}
                  className={errors?.repitPassword ? styles.error : ''}
                />
                {errors?.repitPassword && (
                  <p className={styles.message}>Ошибка: пароли не совпадают</p>
                )}
                <button
                  type="button"
                  className={styles.toggle}
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke={showConfirmPassword ? '#512689' : '#808185'}
                  >
                    <use href="eye1.svg#eye" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <button type="submit" className={styles.submit}>
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
}
