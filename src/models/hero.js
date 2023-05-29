import company from "./company.js"

let sequence = 3

let  heroes = [
    {id: 1, name: "Batman",  company: company.index(0)},
    {id: 2, name: "Spider man", company: 2, company: company.index(1)}
]

const all = () =>  heroes

function insert({company:companyId, ...args}) {
    const inc = company.find(companyId)
    
    const hero = {id: sequence++, ...args, company: inc }
    heroes.push(hero)
    
    return hero
}

export default { all, insert }