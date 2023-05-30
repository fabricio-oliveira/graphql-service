import hero from '../../models/hero.js'

export default {
    Query: {
        heroes: () => hero.all()
    },
    Mutation: {
        createHero: (_, args) => hero.insert(args)
    }
}