import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TinodeService } from '../services/tinode.service';

@Component({
  selector: 'app-create-topic-form',
  templateUrl: './create-topic-form.component.html',
  styleUrls: ['./create-topic-form.component.scss']
})
export class CreateTopicFormComponent implements OnInit {
  userSearchForm: FormGroup;
  tinode: any;
  apiKey = 'AQAAAAABAAA8yeUXCkpwsFDuoW3ho-rM';

  constructor(
    private formBuilder: FormBuilder,
    private tinodeService: TinodeService,
  ) {
    this.userSearchForm = this.formBuilder.group({
      email: ['', [
        Validators.email,
        Validators.required,
      ]],
    });
  }

  ngOnInit(): void {

  }

  search() {
    this.tinodeService.login
  }

}
