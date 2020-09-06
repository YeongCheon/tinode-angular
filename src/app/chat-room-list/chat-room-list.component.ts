import { Component, OnInit } from '@angular/core';
import { CreateTopicFormComponent } from '../create-topic-form/create-topic-form.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-room-list',
  templateUrl: './chat-room-list.component.html',
  styleUrls: ['./chat-room-list.component.scss']
})
export class ChatRoomListComponent implements OnInit {
  list: any[] = [];

  constructor(
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openCreateTopicFormDialog() {
    const dialogRef = this.dialog.open(CreateTopicFormComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/chat-detail');
      }
    });
  }
}
