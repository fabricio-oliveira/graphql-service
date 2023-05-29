import company from "./company.js"

const heroes = [
    {id: 1, name: "Batman",  commicBook: company.index(0)},
    {id: 2, name: "Spider man", commicBook: 2, commicBook: company.index(1)}
]


export default { all: () => (heroes), }