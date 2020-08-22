import { Component, OnInit } from '@angular/core';

// declare var Tinode: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tinode-angular';
  tinode: any;
  apiKey = 'AQAAAAABAAA8yeUXCkpwsFDuoW3ho-rM';

  base64EncodedJwtToken: string = 'ZXlKaGJHY2lPaUpTVXpJMU5pSXNJbXRwWkNJNklqUTVaVGc0WXpVek56WXhPVGsyWVRjek5qSXpaakU1TVdRMU1USmtNbUkwTjJSbU9EQXlZVEVpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnVZVzFsSWpvaVpHUmtaR1FpTENKd2FXTjBkWEpsSWpvaWFIUjBjSE02THk5dFpXUnBZUzFrWlhabGJHOXdiV1Z1ZEM1emFHVnNkR1Z5TG1sa0x6RTFPVEUyTVRJNE1qWXhNamRmNnJXUTdKYVJMbXB3WldjaUxDSnBjM01pT2lKb2RIUndjem92TDNObFkzVnlaWFJ2YTJWdUxtZHZiMmRzWlM1amIyMHZlbTl0WW1sbGEybHVaeTF6YUdWc2RHVnlJaXdpWVhWa0lqb2llbTl0WW1sbGEybHVaeTF6YUdWc2RHVnlJaXdpWVhWMGFGOTBhVzFsSWpveE5UazJPVFV4TlRZMUxDSjFjMlZ5WDJsa0lqb2lTMkZWYkRKalZFNVdhMVE1YVVwdWFXMURiRGgyVWtabE1saDVNU0lzSW5OMVlpSTZJa3RoVld3eVkxUk9WbXRVT1dsS2JtbHRRMnc0ZGxKR1pUSlllVEVpTENKcFlYUWlPakUxT1RjM05UQTJNRGNzSW1WNGNDSTZNVFU1TnpjMU5ESXdOeXdpWlcxaGFXd2lPaUpyZVdNeE5qZ3lRRzVoZG1WeUxtTnZiU0lzSW1WdFlXbHNYM1psY21sbWFXVmtJanAwY25WbExDSm1hWEpsWW1GelpTSTZleUpwWkdWdWRHbDBhV1Z6SWpwN0ltVnRZV2xzSWpwYkltdDVZekUyT0RKQWJtRjJaWEl1WTI5dElsMTlMQ0p6YVdkdVgybHVYM0J5YjNacFpHVnlJam9pY0dGemMzZHZjbVFpZlgwLnhHN1dYYllwLUtWZDFtenNNYUYtd1VCLVJGaFYwWGpUNE5vbmFCeDc3RzQ0OGhCR25jbi03OGYyb1RaVTlaNVVHY1pLUndYNXI2YnJ0QnBGMkQzT3owQWpDV0pkNjNYZ3NkZXR1ZEVUc3NmRVhHaGg2LUZLWXJ2ZFdnYnRsNVNsZkZocnd2Nnl4VDJoQy1aZ0JSUEhCdDJpTlhIV0xVNW16T2REWXkxUlBmTDhZU0xMdkpubXdrVm9OSUJLOWlDbnV3VXFJNV94WDUxRHpzb1hncTgxU1IwUW5iVTB2ckJJTkhqWnhINFBjallKNndUc0FaanJ4cHpqcDA4bUQxTm5sSTdwTmpWaTI5NkkwejdrSmJ2OVBOc1JvZGdfX0Z3SGQ0ZUpkSjI3anVOUUI4akhBSFhYSHJTSEJMWTYtU3R3SzFUeG5OaWg2eFUzZXZyTXVmTUdMdw==';

  ngOnInit() {
    this.tinode = new Tinode('APP_NAME', 'localhost:6060', this.apiKey, null, false);

    this.tinode.enableLogging(true);
    // Add logic to handle disconnects.
    // this.tinode.onDisconnect = function(err) { console.error(err) };
    // Connect to the server.
    this.tinode.connect().then(() => {
      // Connected. Login now.
      return this.login();
    }).then((ctrl) => {
      console.log(ctrl);
      // Logged in fine, attach callbacks, subscribe to 'me'.
      const me = this.tinode.getMeTopic();
      me.onMetaDesc = function(meta) { console.log(meta) };
      // Subscribe, fetch topic description and the list of contacts.
      me.subscribe({ get: { desc: {}, sub: {} } });

      this.tinode.newTopic();
      return this.createTopic();
    }).then((createTopicResult) => {
      //set tag to topic.
      return this.setTopicTag(createTopicResult.topic, ['wtf', 'creator-user-id'])
    }).then((result) => {
      console.log(result);
    }).catch((err) => {
      console.error(err);
      // Login or subscription failed, do something.
    });
  }

  private getTopic(topicPublicName: string) {
    this.tinode.startMetaQuery();

    return this.tinode.subscribe()
  }

  private setTopicTag(topicName: string, tags: string[]) {
    return this.tinode.setMeta(topicName, { tags: tags })
  }

  private createTopic() {
    // return this.tinode.createAccountBasic(login_, password_,
    //   { public: public_, tags: tags_, cred: Tinode.credential(cred_) });

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

  private createUser() {
    // return this.tinode.createAccountBasic(login_, password_,
    //   { public: public_, tags: tags_, cred: Tinode.credential(cred_) });

    return this.tinode.createAccount(
      'firebase',
      this.base64EncodedJwtToken,
      true,
      // { cred: Tinode.credential('email', 'kyc1682@naver.com') }
    );
  }

  private login() {
    return this.tinode.login(
      'firebase',
      this.base64EncodedJwtToken,
      // { cred: Tinode.credential('email', 'kyc1682@naver.com') }
    );
  }
}
