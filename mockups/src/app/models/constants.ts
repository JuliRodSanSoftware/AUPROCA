import { Professor } from "./professor";

export class Constants {
    public static readonly columns  =   ['ID','Número de Identificación', 'Nombre', 'Apellido', 
                                        'Tipo de Identificación', 'Tipo Docente', 'Correo Electrónico', 
                                        'Último título académico'];
    public static readonly PROFESSORS_DATA: Professor[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', identificationType: 'CC', identificationNumber: '12345', teacherType: 'C', email: 'john@example.com', lastAcademicTitle: 'Ph.D' },
  
    ];
  }

