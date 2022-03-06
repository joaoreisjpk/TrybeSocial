import Head from 'next/head';
import { useRouter } from 'next/router';
import { MouseEvent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Header from '../../components/Header';
import FormInput from './_formInput';
import * as Validation from '../../helpers/validation';

const INITIAL_CONDITION = {
  valid: false, invalid: false, msg: '',
}

export default function Login() {
  const { push } = useRouter();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [emailCondition, setEmailCondition] = useState(INITIAL_CONDITION);
  const [passwordCondition, setPasswordCondition] = useState(INITIAL_CONDITION);

  const emailValidation = (emailValue: string) => {
    const emailResult = Validation.emailVerifier(emailValue);
    if (emailResult) {
      return setEmailCondition({
        valid: false, invalid: true, msg: emailResult,
      });
    }

    setEmailCondition({ valid: true, invalid: false, msg: '' });
  };

  const passwordValidation = (passwordValue: string) => {
    const passwordResult = Validation.passwordVerifier(passwordValue);
    if (passwordResult) {
      return setPasswordCondition({
        valid: false, invalid: true, msg: passwordResult,
      });
    }

    setPasswordCondition({ valid: true, invalid: false, msg: '' });
  };

  const handleClick = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    const URL = process.env.URL || 'http://localhost:3333';

    const body = JSON.stringify({
      email: user,
      password,
    });

    const response = (await fetch(`${URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    }).then((data) => data.json())) as { acess_token: string } | any;

    if (response.acess_token) return push('/main-page');
    alert('acesso negado');
  };

  return (
    <div>
      <Head>
        <title>Login - Trybe Social</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Container className='d-flex mt-5 justify-content-center'>
        <Form action=''>
          <Form.Group className='mb-3'>
            <h1 className='mb-3'>Login</h1>
            <Form.Label>E-mail</Form.Label>
            <FormInput
              stateCondition={emailCondition}
              value={user}
              setValue={setUser}
              validation={emailValidation}
              name='user'
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Password</Form.Label>
            <FormInput
              stateCondition={passwordCondition}
              value={password}
              setValue={setPassword}
              validation={passwordValidation}
              name='password'
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Button
              variant='outline-dark'
              size='lg'
              onClick={handleClick}
              type='submit'
              disabled={!emailCondition.valid || !passwordCondition.valid}
            >
              Login
            </Button>
            <span className='m-1' />
            <Button
              variant='outline-dark'
              size='lg'
              type='button'
              onClick={() => push('/cadastro')}
            >
              Quero me Cadastrar
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
}
