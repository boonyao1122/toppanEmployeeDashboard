const { parse } = require("csv-parse");

const parseCsv = (data) => {
  return new Promise((resolve, reject) => {
    parse(data, (err, records) => {
      console.log("errxx", err);
      if (err) reject(err);
      else resolve(records);
    });
  });
};

const validateHeaders = (header, expectedHeaders) => {
  return expectedHeaders.every((expectedHeader) => {
    return header.includes(expectedHeader);
  });
};

const validateRow = (row, index) => {
  const obj = {};
  const [id, login, name, salary] = row;
  obj.id = id;
  obj.login = login;
  obj.name = name;
  obj.salary = salary;

  if (!obj.id || !obj.login || !obj.name || !obj.salary) {
    throw new Error(`Missing data for id ${obj.id}`);
  }
  if (isNaN(parseFloat(obj.salary))) {
    throw new Error(`Invalid salary for id: ${obj.id}`);
  }
  if (obj.salary < 0) {
    throw new Error(`Salary cannot be negative for id: ${obj.id}`);
  }

  return obj;
};

module.exports = {
  parseCsv,
  validateHeaders,
  validateRow,
};
