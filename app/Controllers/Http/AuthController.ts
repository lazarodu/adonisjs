import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User"

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    try {
      const data = request.only(["email", "password"])
      const user = await User.create(data)
      return user
    } catch (error) {
      response.status(500).send("Erro ao cadastrar usuário!")
    }
  }
  public async authenticate({ request, auth, response }: HttpContextContract) {
    try {
      const { email, password } = request.all()
      const token = await auth.use('api').attempt(email, password)
      const user = await User.findByOrFail("email", email);
      return { token, user }
    } catch (error) {
      response.status(500).send("Login ou senha incorretos!")
    }
  }
}
