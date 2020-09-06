import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { TinodeService } from '../services/tinode.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private tinodeService: TinodeService
  ) { }

  ngOnInit(): void {
  }

  signInWithGoogle() {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(async result => {
        const jwtToken: string = (await result.user.getIdToken()).toString();
        const createUserResult = this.tinodeService.createUser(jwtToken);

        this.router.navigateByUrl('/chat-list');
      })
      .catch(e => {
        console.error(e);
      });
  }
}
