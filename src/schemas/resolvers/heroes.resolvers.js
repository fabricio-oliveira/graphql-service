const heroes = [
    {id: 1, name: "Batman",  commicBook: 1},
    {id: 2, name: "Spider man", commicBook: 2}
]

export default {
    Query: {
        heroes: () => heroes 
    }
}