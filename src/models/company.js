let companies = [
    {id: 1, name: "DC comics" },
    {id: 2, name: "Marvel Comics"}
]

const all = () => (companies)
const index = (id) => companies[id]
const find = (id) => companies.find((el) => el.id === id )


export default { all, index, find }