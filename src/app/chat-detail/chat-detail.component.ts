import { Component, OnInit } from '@angular/core';
import { TinodeService } from '../services/tinode.service';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss']
})
export class ChatDetailComponent implements OnInit {
  messageForm: FormGroup;
  topicName: string;
  topic: any;
  messageList: any[] = [];

  page = 1;
  size = 20;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private tinodeService: TinodeService
  ) {
    this.messageForm = this.formBuilder.group({
      message: ['', [
        Validators.required,
      ]],
    });
  }

  ngOnInit(): void {
    this.topicName = this.route.snapshot.paramMap.get('id')
    this.topic = this.tinodeService.getTopic(this.topicName);
    this.topic.onData = (data) => {
      // this.messageList.unshift(data);
      this.messageList.push(data);
      this.messageList.sort((a, b) => a.ts - b.ts) // FIXME: 초기 로딩 시 asc 정렬된 데이터 불러오도록 수정 필요
      // console.log(data);
    };
    // console.log(this.topic.messages());
    setTimeout(() => {
      const getQuery = this.topic
        .startMetaQuery()
        .withTags()
        .withLaterDesc()
        .withLaterSub()
        .withLaterDel()
        .withEarlierData(this.size)
        // .withLaterData(this.size)
        .build()

      this.topic.subscribe(getQuery)
        .then(ctrl => {
          this.topic.subscribers((subscriber) => { console.log(subscriber); });
          // this.loadMore();
        })
        .catch(err => { console.error(err); });
    }, 5000);
  }

  loadMore() {
    this.topic.getMessagesPage(this.size, true)
      .then(() => { })
      .catch(err => {
        console.error(err);
      });
  }

  sendMessage() {
    if (this.messageForm.valid) {
      const messageString = this.messageForm.get('message').value;
      // const message = this.tinodeService.createMessage(this.topicName, messageString, false);

      this.topic.publish(messageString, true).then((result) => {
        this.messageForm.get('message').setValue('');
        // console.log(result);
      })

      // this.tinodeService.publish(this.topicName, messageString, false);

      // this.tinodeService.publishMessage(message).then((result) => {
      //   console.log(result);
      // }).catch(e => {
      //   console.error(e);
      // });
    }
  }
}
