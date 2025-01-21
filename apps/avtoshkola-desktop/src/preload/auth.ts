// Это структура, представляющая данные пользователя, которые можно безопасно отдавать клиенту
type PublicUser = {
  name: string
  surname: string
  login: string
  category: string
  avatar: string
}

// Этот тип включает дополнительное поле `password`, но не будет передаваться клиенту
type User = PublicUser & {
  password: string
}

// Массив пользователей, хранящий данные типа User
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

// Функция для выполнения логина
// Принимает объект с полями `login` и `password` и возвращает Promise с PublicUser
const login = (params: { login: string; password: string }): Promise<PublicUser> => {
  const user = users.find((user) => user.login == params.login)

  // Если пользователь найден
  if (user) {
    // Проверяем пароль
    if (user.password != params.password)
      // Если пароль неправильный, возвращаем ошибку с ключом `password`
      return Promise.reject({ key: 'password', message: 'Password incorrect' })

    // Если логин и пароль верны, возвращаем данные PublicUser
    return Promise.resolve({
      name: user.name,
      surname: user.surname,
      login: user.login,
      category: user.category,
      avatar: user.avatar
    })
  }

  // Если пользователь не найден, возвращаем ошибку с ключом `login`
  return Promise.reject({ key: 'login', message: 'Login not found' })
}

// Экспорт объекта с функцией login
export default {
  login
}
