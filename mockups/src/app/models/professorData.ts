export class ProfessorData {
  constructor(
    public usr_identificacion?: number,
    public usu_nombre?: string,
    public usu_apellido?: string,
    public usu_genero?: string,
    public usu_estudio?: string,
    public login?: any  // Puedes ajustar el tipo según la estructura real del objeto login
  ) {
    // Puedes inicializar propiedades adicionales aquí si es necesario
  }
}
