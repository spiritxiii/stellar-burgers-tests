import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useRef,
  useState,
  FormEvent,
  useEffect
} from 'react';
import { IFormProps } from './types';

import styles from './form.module.css';
import clsx from 'clsx';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
// Используйте для проверки формата введённого имени
import { namePattern } from '../../utils/constants';

export const Form: FC<IFormProps> = ({ setMode, className }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));

    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const isValid =
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.password !== '' &&
      formData.repeatPassword !== '' &&
      formData.password === formData.repeatPassword;

    return isValid;
  };

  const [isFormReady, setIsFormReady] = useState(false);

  useEffect(() => {
    const ready = !!(
      formData.name &&
      formData.email &&
      formData.password &&
      formData.repeatPassword &&
      formData.password === formData.repeatPassword
    );
    setIsFormReady(ready);
  }, [formData]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (isFormReady) {
      setMode('complete');
    }
  };

  return (
    <form
      className={clsx(styles.form, className)}
      data-testid='form'
      onSubmit={handleSubmit}
    >
      <div className={styles.icon} />
      <div className={styles.text_box}>
        <p className='text text_type_main-large'>Мы нуждаемся в вашей силе!</p>
        <p className={clsx(styles.text, 'text text_type_main-medium')}>
          Зарегистрируйтесь на нашей платформе, чтобы присоединиться к списку
          контрибьюторов
        </p>
      </div>
      <fieldset className={styles.fieldset}>
        <Input
          type='text'
          placeholder='Имя'
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={!!errors.name}
          errorText={errors.name}
          data-testid='name-input'
          extraClass={clsx(styles.input, errors.name && styles.input_error)}
          name='name'
          required
        />
        <EmailInput
          placeholder='E-mail'
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          isIcon={false}
          data-testid='email-input'
          extraClass={clsx(styles.input, errors.email && styles.input_error)}
          name='email'
          required
        />

        <PasswordInput
          placeholder='Пароль'
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          data-testid='password-input'
          extraClass={clsx(styles.input, errors.password && styles.input_error)}
          name='password'
          required
        />

        <PasswordInput
          placeholder='Повторите пароль'
          value={formData.repeatPassword}
          onChange={(e) => handleChange('repeatPassword', e.target.value)}
          data-testid='repeat-password-input'
          extraClass={clsx(
            styles.input,
            errors.repeatPassword && styles.input_error
          )}
          name='repeatPassword'
          required
        />
        <Button htmlType='submit' type='primary' size='medium'>
          Зарегистрироваться
        </Button>
      </fieldset>
      <div className={styles.signin_box}>
        <p className='text text_type_main-default text_color_inactive'>
          Уже зарегистрированы?
        </p>
        <Button
          htmlType='button'
          type='secondary'
          size='medium'
          extraClass={styles.signin_btn}
        >
          Войти
        </Button>
      </div>
    </form>
  );
};
