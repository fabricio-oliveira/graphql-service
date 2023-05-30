import company from "../../models/company.js";
import channel from "../../channels/index.js";

export default {
  Query: {
    companies: () => company.all(),
  },
  Mutation: {
    createCompany: (_, args, { pubSub }) => {
      const newComapny = company.insert(args);
      pubSub.publish(channel.companyAdded, {
        companyAdded: {
          companyAdded: newComapny,
        },
      });
      return newComapny;
    },
  },
  Subscription: {
    companyAdded: {
      subscribe: (_, __, { pubSub }) =>
        pubSub.asyncIterator([channel.companyAdded]),
    },
  },
};
