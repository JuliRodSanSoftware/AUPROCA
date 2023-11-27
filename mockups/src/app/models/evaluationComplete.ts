
export class EvaluationC {
    constructor(
        public eva_estado?: string,
        public eva_puntaje?: string,
        public eva_resultado?: string,
        public eva_sugerencias?: string,
        public lab_id?: number,
        public per_id?: number,
        public usr_identificacion?: number,
        public rol_id?: number  // Puedes ajustar el tipo según la estructura real del objeto login
      ) {
        // Puedes inicializar propiedades adicionales aquí si es necesario
      }
}



export class EvaluationOnlyGet {
  constructor(
      public id?: number,
      public eva_estado?: string,
      public eva_puntaje?: string,
      public eva_resultado?: string,
      public eva_sugerencias?: string,
      public lab_id?: number,
      public per_id?: number,
      public usr_identificacion?: number,
      public rol_id?: number  // Puedes ajustar el tipo según la estructura real del objeto login
    ) {
      // Puedes inicializar propiedades adicionales aquí si es necesario
    }
}
