let sequence = 3

let companies = [
    {id: 1, name: "DC comics" },
    {id: 2, name: "Marvel Comics"}
]

const all = () => (companies)
const index = (id) => companies[id]
const find = (id) => companies.find((el) => el.id === id)

function insert(args){
    const company = {id: sequence++, ...args}
    companies.push(company)
    return company
}


export default { all, index, find, insert }