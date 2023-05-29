import hero from '../../models/hero.js'

export default {
    Query: {
        heroes: () => hero.all()
    },
    Mutation: {
        hero: (_, args) => hero.insert(args)
    }
}