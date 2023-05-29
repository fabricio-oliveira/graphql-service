const companies = [
    {id: 1, name: "DC comics" },
    {id: 2, name: "Marvel Comics"}
]

export default {
    Query: {
        getAllCompanies: () => companies 
    }
}