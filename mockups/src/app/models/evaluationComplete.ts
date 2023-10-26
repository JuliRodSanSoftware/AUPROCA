import { Labor } from "./labor";
import { Professor } from "./professor";

export class EvaluationC {
    id: number = -1;
    periodo = '';
    profesor = new Professor();
    labor = new Labor();
    fechaInicio = '';
    fechaFin = '';
    estado = '';
    resultados = '';
    puntaje = 0;

     
    [key: string]: any;
}
  