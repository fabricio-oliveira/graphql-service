import company from '../../models/company.js' 

export default {
    Query: {
        companies: () => company.all() 
    }
}