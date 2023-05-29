export default {
    Query: {
        hello: (_, {name = 'world'}) => `hello ${name}`
    }
}