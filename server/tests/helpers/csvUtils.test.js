const { validateHeaders, validateRow } = require("../../helpers/csvUtils");

describe("validateHeaders function", () => {
  test("good param", () => {
    const header = ["Name", "Age", "Email"];
    const expectedHeaders = ["Name", "Age"];

    const result = validateHeaders(header, expectedHeaders);

    expect(result).toBe(true);
  });

  test("bad param", () => {
    const header = ["First Name", "Last Name", "Age", "Email"];
    const expectedHeaders = ["Name", "Age"];

    const result = validateHeaders(header, expectedHeaders);

    expect(result).toBe(false);
  });
});

describe("validateRow function", () => {
  test("return a valid object", () => {
    const row = ["e001", "john", "John Doe", 5000];
    const expectedObj = {
      id: "e001",
      login: "john",
      name: "John Doe",
      salary: 5000,
    };

    const result = validateRow(row);
    expect(result).toEqual(expectedObj);
  });

  test("throw error for a missing data", () => {
    const row = ["e002", "jane", "Jane Smith"];

    expect(() => {
      validateRow(row);
    }).toThrow(new Error("Missing data for id e002"));
  });

  test("throw error for an invalid salary", () => {
    const row = ["e003", "jim", "Jim Johnson", "Bad salary"];

    expect(() => {
      validateRow(row);
    }).toThrow(new Error("Invalid salary for id: e003"));
  });

  test("throw error for negative salary", () => {
    const row = ["e004", "jenny", "Jenny Lee", -50];
    expect(() => {
      validateRow(row);
    }).toThrow(new Error("Salary cannot be negative for id: e004"));
  });
});
