import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './LogIn.module.css';

interface IFormInput {
  name: string;
  email: string;
  password: number;
  repitPassword: string;
}

export function LogIn(): JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState,
    formState: { errors },
  } = useForm<IFormInput>();

  // console.log(useForm());
  // console.log(formState);
  // console.log(errors);

  const onSubmit = (data: IFormInput, e: React.BaseSyntheticEvent): void => {
    {}
    alert(JSON.stringify(data));
    e.target.reset();
  };

  // console.log(watch('password'));

  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
  //   const { id, value } = e.target;

  // };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = (): void => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  //   const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
  //     event.preventDefault();
  //     // handle form submission
  //   };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputs}>
          <h2>Регистрация</h2>

          <div className={styles.group}>
            <label>Имя</label>
            <input
              // type="text"
              placeholder="Артур"
              // value={formState.name}
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
              // value={formState.email}
              // onChange={handleInputChange}
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
                  pattern: /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/i,
                })}
                className={errors?.password ? styles.error : ''}
              />
              {errors?.password?.type === 'required' && (
                <p className={styles.message}> Ошибка: поле обязательно для заполнения</p>
              )}
              {errors?.password?.type === 'pattern' && (
                <p className={styles.message}>Ошибка: пароль должен быть не короче 6 символов и содержать числа и буквы латинского алфавита</p>
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
  );
}
