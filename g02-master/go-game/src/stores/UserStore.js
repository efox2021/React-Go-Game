import { extendObservable } from 'mobx';

/**
*UserStore
*/
class UserStore {
  constructor() {
    extendObservable(this,{
      loading:true,
      isloggedIn: false,
      username: '',
      win: 0,
      lose: 0
    })
  }
}

export default new UserStore();
