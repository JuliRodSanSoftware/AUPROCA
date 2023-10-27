import { Evaluation } from "./evaluation";
import { Labor } from "./labor";
import { Professor } from "./professor";

export class Constants {
    public static readonly columns  =   ['ID','Número de Identificación', 'Nombre', 'Apellido', 
                                        'Tipo de Identificación', 'Tipo Docente', 'Correo Electrónico', 
                                        'Último título académico'];
    public static readonly PROFESSORS_DATA: Professor[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', identificationType: 'CC', identificationNumber: '12345', teacherType: 'C', email: 'john@example.com', lastAcademicTitle: 'Ph.D' },
    { id: 2, firstName: 'Patrick', lastName: 'Doe', identificationType: 'CC', identificationNumber: '12345', teacherType: 'C', email: 'john@example.com', lastAcademicTitle: 'Ph.D' },
  
    ];

    public static readonly LABORS_DATA: Labor[] =  [
      { id: 1, nombre: 'Materia 1', tipoLabor: 'Docencia', horasAsignadas: 40 },
      { id: 2, nombre: 'Proyecto 1', tipoLabor: 'Proyectos Investigación', horasAsignadas: 80 },
      { id: 3, nombre: 'Tesis 1', tipoLabor: 'Trabajos Investigación', horasAsignadas: 60 },
    ]


    public static readonly EVALUATIONS_DATA: Evaluation[] = [
      {
        id: 1,
        periodo: 'Periodo 1',
        nombreDocente: 'Juan Pérez',
        identificacionDocente: '12345',
        nombreLabor: 'Labor 1',
        tipoLabor: 'Docencia',
        horas: 20,
        descripcion: 'Descripción de la labor 1',
        fechaInicio: '2023-01-10',
        fechaFin: '2023-02-15',
        estado: 'Aprobado',
        resultados: 'Buenos resultados',
        puntaje: 90
      },
      {
        id: 2,
        periodo: 'Periodo 2',
        nombreDocente: 'María González',
        identificacionDocente: '67890',
        nombreLabor: 'Labor 2',
        tipoLabor: 'Trabajos Docencia',
        horas: 15,
        descripcion: 'Descripción de la labor 2',
        fechaInicio: '2023-02-20',
        fechaFin: '2023-03-30',
        estado: 'Pendiente',
        resultados: 'Resultados pendientes',
        puntaje: 0
      },
      // Agrega más evaluaciones según tus necesidades
    ];
  }

