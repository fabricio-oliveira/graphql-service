import BuilderServer from './server/builder.js'

const builder = new BuilderServer()

await builder
    .setGraphqlRoot('/graphql')
    .setGraphql()
    .setGraphqlSubscriber()
    .setCors()
    .setPort(4000)
    .setBodyParser()
    .setHealthCheck('/healthcheck')
    .build()