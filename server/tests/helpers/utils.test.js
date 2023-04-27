const { validateParams } = require("../../helpers/utils");

describe("validateParams", () => {
  test("throws an error if minSalary is missing", () => {
    const query = {
      maxSalary: 50000,
      offset: 0,
      limit: 10,
      sort: "-name",
    };
    expect(() => validateParams(query)).toThrow("minSalary is missing");
  });

  test("throws an error if maxSalary is missing", () => {
    const query = {
      minSalary: 30000,
      offset: 0,
      limit: 10,
      sort: "id",
    };
    expect(() => validateParams(query)).toThrow("maxSalary is missing");
  });

  test("throws an error if offset is missing", () => {
    const query = {
      minSalary: 30000,
      maxSalary: 50000,
      limit: 10,
      sort: "-login",
    };
    expect(() => validateParams(query)).toThrow("offset is missing");
  });

  test("throws an error if limit is missing", () => {
    const query = {
      minSalary: 30000,
      maxSalary: 50000,
      offset: 1,
      sort: "salary",
    };
    expect(() => validateParams(query)).toThrow("limit is missing");
  });

  test("throws an error if sort column is invalid", () => {
    const query = {
      minSalary: 30000,
      maxSalary: 50000,
      offset: 1,
      limit: 10,
      sort: "-invalidColumn",
    };
    expect(() => validateParams(query)).toThrow("sort column is invalid");
  });

  test("throws an error if offset or limit are not integers", () => {
    const query = {
      minSalary: 30000,
      maxSalary: 50000,
      offset: "invalid",
      limit: 10,
      sort: "+id",
    };
    expect(() => validateParams(query)).toThrow("offset and limit should be integers");
  });

  test("throws an error if minSalary or maxSalary are not numbers", () => {
    const query = {
      minSalary: "invalid",
      maxSalary: 50000,
      offset: 1,
      limit: 10,
      sort: "+salary",
    };
    expect(() => validateParams(query)).toThrow("minSalary and maxSalary should be numbers");
  });

  test("does not throw an error if all parameters are valid", () => {
    const query = {
      minSalary: 30000,
      maxSalary: 50000,
      offset: 1,
      limit: 10,
      sort: "+salary",
    };
    expect(() => validateParams(query)).not.toThrow();
  });
});
