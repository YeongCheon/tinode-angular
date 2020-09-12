import { Component, OnInit } from '@angular/core';
import { CreateTopicFormComponent } from '../create-topic-form/create-topic-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TinodeService } from '../services/tinode.service';

@Component({
  selector: 'app-chat-room-list',
  templateUrl: './chat-room-list.component.html',
  styleUrls: ['./chat-room-list.component.scss']
})
export class ChatRoomListComponent implements OnInit {
  list: any[] = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private tinodeService: TinodeService
  ) { }

  ngOnInit(): void {
    const meTopic: any = this.tinodeService.getMeTopic();
    meTopic.onSubsUpdated = (subsUpdated: any[]) => {
      this.list = subsUpdated;
    };
  }

  addTagsToMeTopic() {
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
