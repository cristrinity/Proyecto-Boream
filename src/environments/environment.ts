// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  //apiUrl: 'http://5cff8739d691540014b0dd80.mockapi.io',
  //apiClient: 'http://www.mocky.io/v2/5d08f3193400005300d82c9b'
  apiClient: 'http://www.mocky.io/v2/5d21cd472f00002101c4633f',
   
  firebase: {
    apiKey: "AIzaSyA_d3gP-DURX81v9O_6Q87GiPZmp7w32L0",
    authDomain: "mi-proyect-f5708.firebaseapp.com",
    databaseURL: "https://mi-proyect-f5708.firebaseio.com",
    projectId: "mi-proyect-f5708",
    storageBucket: "mi-proyect-f5708.appspot.com",
    messagingSenderId: "794170836017",
    appId: "1:794170836017:web:888a3159f4089349"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
