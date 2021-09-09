import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Curso from "App/Models/Curso"

export default class CursoSeederSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const cursos = [
      { nome: "Informática" },
      { nome: "Edificações" },
      { nome: "Mecatrônica" },
    ];
    await Curso.createMany(cursos);
  }
}
