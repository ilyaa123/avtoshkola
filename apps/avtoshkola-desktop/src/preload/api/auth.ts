type PublicUser = {
  name: string
  surname: string
  login: string
  category: 'A_B' | 'C_D'
  avatar: string
}

type User = PublicUser & {
  password: string
}

const users: User[] = [
  {
    name: 'test',
    surname: 'test',
    login: 'test',
    category: 'A_B',
    avatar: '/avatar.jpg',
    password: '123456'
  }
]

const login = (params: { login: string; password: string }): Promise<{ data: PublicUser }> => {
  const user = users.find((user) => user.login == params.login)

  if (user) {
    if (user.password != params.password)
      return Promise.reject({ error: { key: 'password', message: 'Password incorrect' } })

    return Promise.resolve({
      data: {
        name: user.name,
        surname: user.surname,
        login: user.login,
        category: user.category,
        avatar: user.avatar
      }
    })
  }

  return Promise.reject({ error: { key: 'login', message: 'Login not found' } })
}

export default {
  login
}
