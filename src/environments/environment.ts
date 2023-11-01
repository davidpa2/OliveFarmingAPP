// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  endpoint: 'http://[::1]:3000',
  authToken: 'RUNTIME',
  firebaseConfig: {
    apiKey: "AIzaSyAfYEQ0E1Ka8coz0Rp0tiV0SGBWCmae8mE",
    authDomain: "olive-farming.firebaseapp.com",
    projectId: "olive-farming",
    storageBucket: "olive-farming.appspot.com",
    messagingSenderId: "1098410346742",
    appId: "1:1098410346742:web:43d26f6117f65520d204d7",
    measurementId: "G-LB1DEN08Y3"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
