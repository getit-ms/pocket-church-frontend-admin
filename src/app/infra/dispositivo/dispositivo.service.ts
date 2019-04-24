import { Injectable } from '@angular/core';

export const UUID_POCKET_CHURCH = 'uuid-pocket-church';

@Injectable()
export class DispositivoService {

  constructor() {
    if (!this.uuid) {
      localStorage.setItem(UUID_POCKET_CHURCH, 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      }));
    }
  }

  get uuid(): string {
    return localStorage.getItem(UUID_POCKET_CHURCH);
  }
}
