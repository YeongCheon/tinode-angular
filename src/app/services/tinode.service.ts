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
    this.tinode.enableLogging(false);
    // this.tinodeConnect = this.tinode.connect();
  }

  getMeTopic(): any { // return MeTopic Object
    return this.tinode.getMeTopic();
  }

  getCurrentUserID(): string {
    return this.tinode.getCurrentUserID();
  }

  getCurrentLogin(): string {
    return this.tinode.getCurrentLogin();
  }

  newGroupTopicName(): string {
    return this.tinode.newGroupTopicName();
  }

  getAuthToken(): string { // for keep login
    return this.tinode.getAuthToken();
  }

  newTopic(): any {
    return this.tinode.newTopic((result) => { console.log(result); });
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

  createUser(jwtToken: string) {
    return this.tinode.connect().then(() => {
      return this.tinode.createAccount('firebase', btoa(jwtToken), true)
    });
  }

  async login(jwtToken: string): Promise<any> {
    await this.tinode.connect();
    return this.tinode.login('firebase', btoa(jwtToken));

    // return .then(() => {
    //   this.tinodeConnect = this.tinode.login('firebase', btoa(jwtToken));
    //   return this.tinodeConnect;
    // });

    // return this.tinode.login(
    //   'firebase',
    //   btoa(jwtToken),
    //   // { cred: Tinode.credential('email', 'kyc1682@naver.com') }
    // );
  }

  getTopic(topicName: string) {
    return this.tinode.getTopic(topicName);
  }

  setTopicTag(topicName: string, tags: string[]) {
    return this.tinode.setMeta(topicName, { tags: tags })
  }

  createMessage(topic: any, data: any, noEcho: boolean): any {
    return this.tinode.createMessage(topic, data, noEcho);
  }

  publish(topic: string, data: any, noEcho: boolean): Promise<any> {
    return this.tinode.publish(topic, data, noEcho);
  }

  publishMessage(pub: any): Promise<any> {
    return this.tinode.publishMessage(pub);
  }



  createNewGroupTopic() {
    return this.tinode.subscribe(
      this.newGroupTopicName(),
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
}
