export class Evaluation {
    constructor(
        public id?: number,
        public periodo?: string,
        public nombreDocente?: string,
        public apellidoDocente?: string,
        public identificacionDocente?: string,
        public nombreLabor?: string,
        public tipoLabor?: string,
        public horas?: number,
        public descripcion?: string,
        public fechaInicio?: string,
        public fechaFin?: string,
        public estado?: string,
        public resultados?: string,
        public puntaje?: number,

    ){}

    [key: string]: any;

}
