import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const httpUri = 'https://fast-cove-16213.herokuapp.com/v1alpha1/graphql';
const wsUri = 'wss://fast-cove-16213.herokuapp.com/v1alpha1/graphql';

export function createApollo(httpLink: HttpLink) {
    // Create an http link:
    const http = httpLink.create({
      uri: httpUri
    });
    
    // Create a WebSocket link:
    const ws = new WebSocketLink({
      uri: wsUri,
      options: {
        reconnect: true
      }
    });
    
    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    const link = split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      ws,
      http,
    );
    return {
        link: link,
        cache: new InMemoryCache(),
    };
}

@NgModule({
    exports: [ApolloModule, HttpLinkModule],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink],
        },
    ],
})
export class GraphQLModule { }
