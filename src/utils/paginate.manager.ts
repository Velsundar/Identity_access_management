import { escapeRegExp } from "lodash";
import { Model } from "mongoose";

function getAllFields(model: Model<any>): string[] {
  const searchFields: string[] = [];
  const schema = model.schema;
  for (const key of Object.keys(schema.paths) as string[]) {
    if (schema.paths[key].instance === "String") {
      searchFields.push(key);
    }
  }
  return searchFields;
}

var paginate = (schema: any) => {
  schema.static(
    "paginate",
    async function (this: any, filter: any, options: any) {
      let sort = "";
      if (options.sortBy) {
        const sortingCriteria: any = [];
        options.sortBy.split(",").forEach((sortOption: any) => {
          const [key, order] = sortOption.split(":");
          sortingCriteria.push((order === "desc" ? "-" : "") + key);
        });
        sort = sortingCriteria.join(" ");
      } else {
        sort = "-createdAt";
      }

      let project = "";
      if (options.projectBy) {
        const projectionCriteria: any = [];
        options.projectBy.split(",").forEach((projectOption: any) => {
          const [key, include] = projectOption.split(":");
          projectionCriteria.push((include === "hide" ? "-" : "") + key);
        });
        project = projectionCriteria.join(" ");
      }
      let countAggregate = this?.aggregate();
      let aggregate = this?.aggregate();
      if (options.customAggregation) {
        aggregate = options.customAggregation(aggregate);
        countAggregate = options.customAggregation(countAggregate);
      }

      
      // const countPromise = await this?.countDocuments(filter).exec();

      const limit =
        options.limit && parseInt(options.limit.toString(), 10) > 0
          ? parseInt(options.limit.toString(), 10)
          : 10;

      // const totalPages = Math.ceil(countPromise / limit);

      let page =
        options.page && parseInt(options.page.toString(), 10) > 0
          ? parseInt(options.page.toString(), 10)
          : 1;

      // if (page > totalPages) {
      //   page = totalPages;
      // }

      let skip = (page - 1) * limit;

      // if (skip < 0) {
      //   skip = 0;
      // }

     

    

      if (options?.lookup?.length > 0) {
        options.lookup?.map(
          (lookupOptions: any) => (aggregate = aggregate.lookup(lookupOptions)),
        );
      }

      options.addFields && (aggregate = aggregate.addFields(options.addFields));
      
      options.addFields && countAggregate.addFields(options.countAggregate);
      for (const field in filter) {
        if (filter.hasOwnProperty(field) && typeof filter[field] === "string") {
          filter[field] = { $regex: new RegExp(escapeRegExp(filter[field]), "i") };
        }
      }
      aggregate = aggregate.match(filter);
      countAggregate = countAggregate.match(filter);
  

      if (options.search) {
        // gets the filds in the modal
        const searchFields = getAllFields(this).concat(options?.additionalSearchField);
        //global search filter
        if (searchFields.length > 0) {
          const regexPattern = new RegExp(escapeRegExp(options.search), 'i');
          const searchFileds = searchFields.map((field) => ({
            [field]: { $regex: regexPattern },
          }));
          aggregate = aggregate.match({
            $or: searchFileds,
          });
          countAggregate = countAggregate.match({
            $or: searchFileds,
          });
        }
      }

      aggregate = aggregate.sort(sort);
      aggregate = aggregate.skip(skip);


      if (!options.isAll) {
        aggregate = aggregate.limit(limit);
      }

      // note postFilterAggregate will not be part of count aggregate, 
      // use it only for adding additional fields after all filter has been executed
      if (options.postFilterAggregate) {
        aggregate = options.postFilterAggregate(aggregate);
      }

      if (project) {
        aggregate = aggregate.project(project);
      }


      // Execute the aggregate pipeline
      const countPromise = countAggregate.count("count").exec();
      const docsPromise = aggregate.exec();

      return Promise.all([countPromise, docsPromise]).then((values) => {
        const [totalResultsData, results] = values;
        const totalResults = totalResultsData?.[0]?.count || 0;
        const totalPages = Math.ceil(totalResults / limit);
        const result = {
          results: results,
          page,
          limit,
          totalPages,
          totalResults,
        };
        return Promise.resolve(result);
      });
    },
  );
};

export { paginate };