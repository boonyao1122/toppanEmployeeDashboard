const model = require("../../sequelize/models/index.js");

const fs = require("fs");

const { User } = model;

const { parseCsv, validateHeaders, validateRow } = require("../../helpers/csvUtils.js");
const { validateParams } = require("../../helpers/utils.js");
const { Op } = require("sequelize");

// Create users via upload csv
const uploadCsv = async (req, res) => {
  let transaction, file;
  try {
    // Check if a file was uploaded
    file = req.files?.[0];
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Check if the file is a CSV
    if (file.mimetype !== "text/csv") {
      return res.status(400).json({ error: "Invalid file type, only CSV files are allowed" });
    }

    // Read and parse the CSV data
    const data = fs.readFileSync(file.path, "utf8");
    const [header, ...rows] = await parseCsv(data);

    // Check if the CSV has the expected headers
    const expectedHeaders = ["id", "login", "name", "salary"];
    const hasExpectedHeaders = validateHeaders(header, expectedHeaders);
    if (!hasExpectedHeaders) {
      return res.status(400).json({ error: "CSV headers do not match expected format" });
    }

    // Convert the data into an array of objects and validate each row
    const employees = [];
    let errorMsg = null;

    rows
      .filter((row) => !row[0].startsWith("#"))
      .map((row, index) => {
        try {
          const obj = validateRow(row, index);
          employees.push(obj);
        } catch (error) {
          errorMsg = error.message;
        }
      });

    if (errorMsg) {
      return res.status(400).json({ error: errorMsg });
    }

    // Start a database transaction
    transaction = await User.sequelize.transaction();

    // Process each employee in the array
    for (let employee of employees) {
      const existingEmployee = await User.findOne({ where: { id: employee.id } });

      if (existingEmployee) {
        // Update the existing employee in the database
        if (existingEmployee.login !== employee.login) {
          // Check if the new login already exists for another employee
          const employeeWithNewLogin = await User.findOne({ where: { login: employee.login } });
          if (employeeWithNewLogin) {
            throw new Error(`Login "${employee.login}" already exists for another employee`);
          }

          // Swap logins between the two employees
          const tempLogin = `temp_login_${existingEmployee.id}`;
          await User.update({ login: tempLogin }, { where: { id: employee.id }, transaction });
          await User.update({ login: employee.login }, { where: { id: existingEmployee.id }, transaction });
          await User.update({ login: existingEmployee.login }, { where: { id: employee.id }, transaction });
        } else {
          await existingEmployee.update(employee, { transaction });
        }
      } else {
        // Create a new employee in the database
        await User.create(employee, { transaction });
      }
    }

    // Commit the transaction
    await transaction.commit();
    res.status(200).json({ message: `${employees.length} employees uploaded successfully.` });
  } catch (error) {
    console.error(error);
    if (transaction) {
      await transaction.rollback();
    }
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Delete the uploaded file
    fs.unlinkSync(file.path);
  }
};

// Get users for dashboard
const getUsers = async (req, res) => {
  try {
    validateParams(req.query);

    const { minSalary, maxSalary, offset, sort, limit } = req.query;

    const order = sort.charAt(0) === "+" ? "ASC" : "DESC";
    const column = sort.slice(1);

    const { count, rows: users } = await User.findAndCountAll({
      where: {
        salary: {
          [Op.between]: [minSalary, maxSalary],
        },
      },
      offset: parseInt(offset),
      limit: parseInt(limit),
      order: [[column, order]],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    res.status(200).json({ results: users, total: count });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const createUser = async (req, res) => {
  try {
    const { id, login } = req.body;

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ id }, { login }],
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = await User.create(req.body);
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Invalid input" });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { attributes: { exclude: ["createdAt", "updatedAt"] } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.update(req.body);
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Invalid input" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.destroy();
    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { uploadCsv, getUsers, getUser, createUser, updateUser, deleteUser };
