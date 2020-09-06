import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TinodeService } from './services/tinode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tinode-angular';

  constructor(
    public auth: AngularFireAuth,
    private router: Router,
    private tinodeService: TinodeService
  ) {
  }

  ngOnInit() {
    // this.auth.authState.pipe(take(1)).subscribe(result => {
    //   if (result) {
    //     result.getIdToken(true).then((idToken) => {
    //       this.tinodeService.login(idToken).then(tinodeLoginResult => {
    //         console.log(tinodeLoginResult);
    //       });
    //     });

    //     // this.router.navigateByUrl('/chat-list');
    //   } else {
    //     this.router.navigateByUrl('/signin');
    //   }
    // })
  }

  logout() {
    this.auth.signOut().then(() => {
      this.router.navigateByUrl('/signin');
    });
  }
}
