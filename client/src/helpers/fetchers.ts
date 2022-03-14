const URL = process.env.URL || 'http://localhost:3333';

interface IuserTokenResponse {
  acess_token?: string;
  refresh_token?: string;
  error?: string;
  email?: string;
}

export async function fetchLogin(body: string) {
  return fetch(`${URL}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  }).then((data) => data.json()) as IuserTokenResponse;
}

export async function fetchRefreshToken(
  token: string,
  email: string | undefined
) {
  return (await fetch(`${URL}/auth/refresh/${email}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token,
    },
  }).then((data) => data.json())) as IuserTokenResponse;
}

export async function fetchLogout(token: string, email: string | undefined) {
  return fetch(`${URL}/auth/logout/${email}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
    },
  });
}