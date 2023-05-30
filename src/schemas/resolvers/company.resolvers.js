import company from "../../models/company.js";
import channel from "../../channels/index.js";

export default {
  Query: {
    companies: () => company.all(),
  },
  Mutation: {
    createCompany: (_, args, { pubsub }) => {
      const company = company.insert(args);
      pubsub.publish(channel.companyAdded, {
        companyAdded: company,
      });
      return company;
    },
  },
  Subscription: {
    companyAdded: {
      subscribe: (_, __, {pubSub}) => pubSub.asyncIterator([channel.companyAdded]),
    },
  },
};
