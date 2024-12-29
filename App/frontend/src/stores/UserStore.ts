// stores/userStore.ts
import { makeAutoObservable } from 'mobx';

class UserStore {
  user: { username: string } | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(username: string) {
    this.user = { username };
  }

  clearUser() {
    this.user = null;
  }
}

export const userStore = new UserStore();