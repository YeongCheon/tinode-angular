// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDPacVcs8ZpiTYBO8dctJ5k5839IR0j7GM",
    authDomain: "tinode-angular.firebaseapp.com",
    databaseURL: "https://tinode-angular.firebaseio.com",
    projectId: "tinode-angular",
    storageBucket: "tinode-angular.appspot.com",
    messagingSenderId: "821100263170",
    appId: "1:821100263170:web:bc65f5b583a589ef41f41b"
  },
  tinode: {
    appName: 'tinode-angular',
    apiKey: 'AQAAAAABAAA8yeUXCkpwsFDuoW3ho-rM',
    addr: 'localhost',
    port: '6060'
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
