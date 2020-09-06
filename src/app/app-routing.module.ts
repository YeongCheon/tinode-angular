import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { ChatRoomListComponent } from './chat-room-list/chat-room-list.component';
import { ChatDetailComponent } from './chat-detail/chat-detail.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'signin', pathMatch: 'full',
  },
  { path: 'signin', component: SignInComponent },
  { path: 'chat-list', component: ChatRoomListComponent },
  { path: 'chat-detail', component: ChatDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
