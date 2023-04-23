// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    project: 'tgestiona',

   //Localhost
   apiBaseSeguridad: 'https://localhost:7042',
   //apiBase: 'https://localhost:7083/api',


   production: true,
   //DESA
   /*apiBase: 'https://localhost:7083/api',
   loginUrl:'https://localhost:7083/Autenticacion',*/
   //QA
   //  apiBase: 'https://qaapi.sistemaedi.com.pe/ApiTerceros/api',
   //  loginUrl:'https://qaapi.sistemaedi.com.pe/ApiTerceros/Autenticacion',
   // production: true,

    //DESA
    apiBase: 'https://desaapi.sistemaedi.com.pe/rrhh/api',
    //loginUrl: 'https://desaapi.sistemaedi.com.pe/rrhh/Autenticacion',
    //apiBaseSeguridad: 'https://desaapi.sistemaedi.com.pe/youManager',
   // urlSistema: 'http://localhost:4200', //https://rrhh.sistemaedi.com.pe

    //apiBaseSeguridad: 'https://localhost:7042',
    //QA
    //  apiBase: 'https://qaapi.sistemaedi.com.pe/ApiTerceros/api',
    //  loginUrl:'https://qaapi.sistemaedi.com.pe/ApiTerceros/Autenticacion',

    //PROD
    //apiBase: 'https://api.sistemaedi.com.pe/ApiTerceros/api',
    //loginUrl: 'https://api.sistemaedi.com.pe/ApiTerceros/Autenticacion',

    //LOCALHOST
    /*apiBase: 'https://localhost:7083/api',
    loginUrl: 'https://localhost:7083/Autenticacion',*/

    //    apiBase: 'https://desaapi.sistemaedi.com.pe/Microservicio/api',
    //   loginUrl: 'https://desaapi.sistemaedi.com.pe/Microservicio/Autenticacion',


    //apiUrl: 'https://api.sistemaedi.com.pe/Microserviciorrhh',
    signalUrl: 'https://api.sistemaedi.com.pe/Microserviciorrhh/AutenticacionPlanificacion',
    azureAccountName: "edidesastorage",
    azureContaineName: "rrhh",
    azureSas: "sp=rcwd&st=2023-01-04T15:10:47Z&se=2023-12-31T23:10:47Z&spr=https&sv=2021-06-08&sr=c&sig=4wc8xC%2B2YY8b%2BBKpGX%2BDuYx4N6tJTfRb0TQQjkHFpt4%3D",


};
