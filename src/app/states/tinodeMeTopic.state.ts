import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';

export class TinodeMeTopicStateModel {
  metaDesc?: any;
  contact?: any;
  subs?: any[];

  constructor(metaDesc: any, contact: any, subs: any[]) {
    this.metaDesc = metaDesc;
    this.contact = contact;
    this.subs = subs;
  }
}

// 상태 값
@State<TinodeMeTopicStateModel>({
  name: 'community',
  defaults: {
    metaDesc: null,
    contact: null,
    subs: null,
  }
})
@Injectable()
export class TinodeMeTopicState {

  @Selector()
  static getSubs(state: TinodeMeTopicStateModel): any {
    return state.subs;
  }

  // @Action(ActionCommunityUpdate)
  public setSubs(ctx: StateContext<TinodeMeTopicStateModel>, action: any) {
    ctx.patchState({
      subs: action.subs,
    });
  }

}
