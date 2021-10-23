import axios from "axios";

/**
 * Receber code(string)
 * Recuperar o Access_token no github
 * Recuperar infos do user do github
 * Verificar se o user existe no DB
 * ----sim = gera um token
 * ----não = cria no DB, gera um token
 * Retornar o token com as infos do user
 */
interface IAccessTokenResponse {
  access_token: string;
}

interface IUserResponse {
  avatar_url: string,
  login: string,
  name: string
}

class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";

    const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        "Accept": "application/json"
      }
    })
    const response = await axios.get<IUserResponse>("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`,
      },
    });
    const { login, id, avatar_url, name } = response.data
    const user = await
    return response.data;
  }
};

export { AuthenticateUserService };