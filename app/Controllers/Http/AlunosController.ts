import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aluno from 'App/Models/Aluno'

export default class AlunosController {
  public async index({ }: HttpContextContract) {
    const alunos = await Aluno.query().preload('curso')
    return alunos
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = request.only(["curso_id", "nome", "descricao"]);
      const aluno = await Aluno.create(data);
      return aluno
    } catch (error) {
      response.status(500).send("Erro ao cadastrar o aluno!")
    }
  }

  public async show({ params }: HttpContextContract) {
    const aluno = await Aluno.findOrFail(params.id);
    return aluno;
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const aluno = await Aluno.findOrFail(params.id)
      const { curso_id, nome, descricao } = request.only(["curso_id", "nome", "descricao"])
      aluno.cursoId = curso_id
      aluno.nome = nome
      aluno.descricao = descricao
      await aluno.save()
      return aluno
    } catch (error) {
      response.status(500).send("Erro ao atualizar o curso!")
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const curso = await Aluno.findOrFail(params.id)
      await curso.delete()
      return curso
    } catch (error) {
      response.status(500).send("Erro ao apagar o curso!")
    }
  }
}
