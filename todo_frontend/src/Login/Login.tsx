import styles from './Login.module.css';
import api from '../services/api';
import { useState } from 'react';
import { JwtToken } from '../hooks/types';
import Header from './Header';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigate } from "react-router-dom";

type errorList = {
  username: string[],
  password: string[],
  detail: string[],
}

type loginParams = {
  setToken: (userToken: JwtToken) => void
}

function Login({ setToken }: loginParams) {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<errorList>({
    username: [],
    password: [],
    detail: [],
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const username = e.target['username'].value
    const password = e.target['password'].value

    await api.post(
      '/token/',
      { username, password },
    ).then(e => {
      setToken(e.data)
      navigate("/");
      window.location.reload();
    }).catch(e => {
      setErrorMsg(e.response.data)
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
            {/* TODO: add icon and email login possibility */}
            <Input id="username" type="text" placeholder="Username" wrong={errorMsg.username?.length > 0} />
            <p className={styles.errorMsg}>{errorMsg.username}</p>
          </div>


          <div className={styles.inputContainer}>
            {/* TODO: add icon and show/hide pass */}
            <Input id="password" type="password" placeholder='Password' wrong={errorMsg.password?.length > 0} />
            <p className={styles.errorMsg}>{errorMsg.password}</p>
          </div>

          {/* TODO: get list button doesnt work after first page enter */}
          <Button>Login</Button>

        </form>
        {/* TODO: recover user password by email */}
        {/* TODO: dont reload page? */}
        <a href="/register" className={styles.register}>
          Click here to register
        </a>
        <p className={styles.errorMsg}>{errorMsg.detail}</p>
      </div>
    </div>
  );
}

export default Login;
