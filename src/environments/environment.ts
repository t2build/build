// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDS-Revbc8G39H42bZe-GNkfhE8msn819w',
    authDomain: 't2buildd.firebaseapp.com',
    databaseURL: 'https://t2buildd.firebaseio.com',
    projectId: 't2buildd',
    storageBucket: 't2buildd.appspot.com',
    messagingSenderId: '777183195286'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
