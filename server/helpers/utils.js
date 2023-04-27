function validateParams(query) {
  // Check if all compulsory fields are present in query
  for (const field of ["minSalary", "maxSalary", "offset", "limit", "sort"]) {
    if (!query[field]) {
      throw new Error(`${field} is missing from query parameters`);
    }
  }

  // Check if sort is valid
  const validSortColumns = ["id", "name", "login", "salary"];
  if (query.sort && !validSortColumns.includes(query.sort.substring(1))) {
    throw new Error("sort column is invalid");
  }

  // Check if offset and limit are integers
  if (
    (query.offset && !Number.isInteger(parseInt(query.offset))) ||
    (query.limit && !Number.isInteger(parseInt(query.limit)))
  ) {
    throw new Error("offset and limit should be integers");
  }

  // Check if minSalary and maxSalary are numbers
  if (
    (query.minSalary && isNaN(parseFloat(query.minSalary))) ||
    (query.maxSalary && isNaN(parseFloat(query.maxSalary)))
  ) {
    throw new Error("minSalary and maxSalary should be numbers");
  }
}

module.exports = { validateParams };
