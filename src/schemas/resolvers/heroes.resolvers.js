import hero from '../../models/hero.js'

export default {
    Query: {
        heroes: () => hero.all()
    }
}