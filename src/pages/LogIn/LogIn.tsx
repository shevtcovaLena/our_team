import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from './LogIn.module.css';
interface FormState {
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  email: string;
  password: string;
  confirmPassword: string;
}

export function LogIn(): JSX.Element {
  const [formState, setFormState] = useState<FormState>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const emailError = validateEmail(formState.email);
    const passwordError = validatePassword(formState.password);
    const confirmPasswordError = validateConfirmPassword(
      formState.password,
      formState.confirmPassword,
    );

    setFormErrors({
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    if (!emailError && !passwordError && !confirmPasswordError) {
      // handle form submission
      console.log('Form submitted successfully');
    }
  };
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
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputs}>
          <h2>Регистрация</h2>

          <div className={styles.group}>
            <label htmlFor="name">Имя</label>
            <input type="text" id="name" placeholder="Артур" />
          </div>

          <div className={styles.group}>
            <label htmlFor="email">Электронная почта</label>
            <input type="email"
            id="email"
            placeholder="example@mail.ru"
            value={formState.email}
            onChange={handleInputChange}
            className={formErrors.email ? styles.error : ''} />
          </div>

          <div className={styles.group}>
            <label htmlFor="password">Пароль</label>
            <div className={styles.password}>
              <input type={showPassword ? 'text' : 'password'} id="password" placeholder="******" />
              <button type="button" className={styles.toggle} onClick={togglePasswordVisibility}>
                &#128065;
              </button>
            </div>
          </div>

          <div className={styles.group}>
            <label htmlFor="confirm-password">Подтвердите пароль</label>
            <div className={styles.password}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirm-password"
                placeholder="******"
              />
              <button
                type="button"
                className={styles.toggle}
                onClick={toggleConfirmPasswordVisibility}
              >
                &#128065;
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
