import { Service, ServiceContext } from '@vtex/api'

import { Clients } from './clients'
import { restResolver } from './resolvers/restResolver'

const MEDIUM_TIMEOUT_MS = 5 * 1000

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients>
}

// Export a service that defines resolvers and clients' options

export default new Service<Clients>({
  clients: {
    implementation: Clients,
    options: {
      default: {
        timeout: MEDIUM_TIMEOUT_MS,
      },
    },
  },
  graphql: {
    resolvers: {
      Query: {
        restResolver,
      },
    },
  },
})
