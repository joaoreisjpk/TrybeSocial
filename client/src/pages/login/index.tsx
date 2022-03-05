import Head from 'next/head';
import { useRouter } from 'next/router';
import { MouseEvent, useState } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import Header from '../../components/Header';

export default function Login() {
  const { push } = useRouter();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

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
      <Container className='d-flex flex-row flex justify-content-center mt-5'>
        <Form action=''>
          <Form.Group className='mb-3'>
            <h1 className='mb-3'>Login</h1>
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type='text'
              name='user'
              className=''
              value={user}
              onChange={({ target }) => setUser(target.value)}
              id='user'
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              className=''
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              id='password'
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Button
              variant='outline-dark'
              size='lg'
              onClick={handleClick}
              type='submit'
            >
              Login
            </Button>
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
