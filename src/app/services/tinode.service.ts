import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

declare var Tinode: any;

@Injectable({
  providedIn: 'root'
})
export class TinodeService {
  private tinode: any;
  private apiKey = 'AQAAAAABAAA8yeUXCkpwsFDuoW3ho-rM';

  private tinodeConnect: Promise<any>;

  constructor() {
    this.tinode = new Tinode(`${environment.tinode.appName}`, `${environment.tinode.addr}:${environment.tinode.port}`, `${environment.tinode.apiKey}`, null, false);
    this.tinode.enableLogging(true);
    // this.tinodeConnect = this.tinode.connect();
  }

  getMeTopic(): Promise<any> {
    return this.tinode.getMeTopic();
  }

  searchUser(email: string) {
    // this.tinode.connect().then(() => {
    //   // Connected. Login now.
    //   return this.login();
    // }).then((ctrl) => {
    //   console.log(ctrl);
    //   // Logged in fine, attach callbacks, subscribe to 'me'.
    //   const me = this.tinode.getMeTopic();
    //   me.onMetaDesc = function(meta) { console.log(meta) };
    //   // Subscribe, fetch topic description and the list of contacts.
    //   me.subscribe({ get: { desc: {}, sub: {} } });
    //   this.tinode.newTopic();
    //   return this.createTopic();
    // }).then((createTopicResult) => {
    //   //set tag to topic.
    //   return this.setTopicTag(createTopicResult.topic, ['wtf', 'creator-user-id'])
    // }).then((result) => {
    //   console.log(result);
    // }).catch((err) => {
    //   console.error(err);
    //   // Login or subscription failed, do something.
    // });
  }

  login(jwtToken: string): Promise<any> {
    return this.tinode.connect().then(() => {
      return this.tinode.login('firebase', btoa(jwtToken))
    });

    // return this.tinode.login(
    //   'firebase',
    //   btoa(jwtToken),
    //   // { cred: Tinode.credential('email', 'kyc1682@naver.com') }
    // );
  }

  getTopic(topicPublicName: string) {
    this.tinode.startMetaQuery();
    return this.tinode.subscribe()
  }

  setTopicTag(topicName: string, tags: string[]) {
    return this.tinode.setMeta(topicName, { tags: tags })
  }

  createTopic() {
    return this.tinode.subscribe(
      'new', // Tinode.TOPIC_NEW
      null,
      {
        desc: {
          public: {
            name: 'create-user-id-GRP',
          },
          tags: ['wtf']
        },
        sub: {
          info: {
          }
        }
      }
    );
  }

  createUser(jwtToken: string) {
    return this.tinode.connect().then(() => {
      return this.tinode.createAccount('firebase', btoa(jwtToken), true)
    });
  }
}
