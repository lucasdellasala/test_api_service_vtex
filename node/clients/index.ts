import { IOClients } from '@vtex/api'

import { UrlClient } from './urlclient'

export class Clients extends IOClients {

  get urlclient() {
    return this.getOrSet('urlclient', UrlClient)
  }
}
