import styles from './Register.module.css';
import { useState } from 'react';
import api from '../services/api';
import Header from '../Login/Header';
import Button from '../components/Button';
import Input from '../components/Input';

type errorList = {
  username: string[],
  password: string[],
  email: string[],
}

function Register() {
  const [errorMessage, setErrorMessage] = useState<errorList>({
    username: [],
    password: [],
    email: [],
  });
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const username = e.target['username'].value
    const password = e.target['password'].value
    const email = e.target['email'].value

    await api.post(
      '/register/',
      { username, password, email },
    ).then(e => {
      setSuccessMessage("User created successfully!")
    }).catch(e => {
      setErrorMessage(e.response.data)
    })
  }

  return (
    <div>
      <div className={styles.upperContainer}>
        <Header />
      </div>
      <div className={styles.lowerContainer}>
        <form method="post" onSubmit={handleSubmit} className={styles.formContainer}>

          <div className={styles.inputContainer}>
            {/* TODO: add email validation together with others
              (clicking on register and not notifing email) */}
            <Input id="email" type="email" placeholder="Email" wrong={errorMessage.email?.length > 0} />
            <div className={styles.errorMessage}>{errorMessage.email}</div>
          </div>

          <div className={styles.inputContainer}>
            <Input id="username" type="text" placeholder="Username" wrong={errorMessage.username?.length > 0} />
            <div className={styles.errorMessage}>{errorMessage.username}</div>
          </div>

          <div className={styles.inputContainer}>
            <Input id="password" type="password" placeholder='Password' wrong={errorMessage.password?.length > 0} />
            <div className={styles.errorMessage}>{errorMessage.password}</div>
          </div>

          <div className={styles.inputContainer}>
            {/* TODO: add password confirmation */}
            <Input id="password_confirmation" type="password" placeholder='Confirm Password' wrong={errorMessage.password?.length > 0} />
            <div className={styles.errorMessage}>{errorMessage.password}</div>
          </div>

          <Button>Register</Button>
        </form>
        {/* TODO: dont reload page? */}
        <a href="/login" className={styles.login}>
          Click here to login
        </a>
        {/* TODO: add css to success msg */}
        <div className={styles.successMessage}>{successMessage}</div>
      </div>
    </div>
  );
}

export default Register;
