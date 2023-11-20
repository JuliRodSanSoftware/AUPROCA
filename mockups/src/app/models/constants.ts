import { Evaluation } from "./evaluation";
import { Labor } from "./labor";
import { Professor } from "./professor";

export class Constants {
  public static readonly HOST = "http://localhost:8000";
  public static readonly API = Constants.HOST + "/api";


    public static readonly COLUMNS_PROFESSOR  =   ['Número de Identificación', 'Nombre', 'Apellido', 
                                        'Genero', 'Correo Electrónico', 
                                        'Último título académico'];

    public static readonly COLUMNS_LABOR: string[] = ["ID",'Nombre', 'Tipo labor', 'Horas asignadas'];
    public static readonly COLUMNS_LABOR_TYPE: string[] = ["ID",'Código', 'Descripción'];
    public static readonly PROFESSORS_DATA: Professor[] = [
    { identificationNumber: 1, firstName: 'John', lastName: 'Doe', gender: 'M', email: 'john@example.com', lastAcademicTitle: 'Ph.D' },
    { identificationNumber: 2, firstName: 'Patrick', lastName: 'Doe', gender: 'F', email: 'john@example.com', lastAcademicTitle: 'Ph.D' },
  
    ];

    public static readonly LABORS_DATA: Labor[] =  [
      { lab_id: 1, lab_nombre: 'Materia 1', tl_id: 1, lab_horas: 40 },
      { lab_id: 2, lab_nombre: 'Proyecto 1', tl_id: 1, lab_horas: 80 },
      { lab_id: 3, lab_nombre: 'Tesis 1', tl_id: 3, lab_horas: 60 },
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

