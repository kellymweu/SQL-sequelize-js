const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize("student", "root", "1234", {
  host: "localhost",
  port: "3306",
  dialect: "mysql",
});

const Student = sequelize.define("student", {
  student_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.CHAR,
    allowNull: false,
    validate: {
      len: 4,
    },
  },
  favourite_class: {
    type: DataTypes.CHAR,
    defaultValue: "computer science",
  },
  school_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subscribed_to_yt: {
    type: DataTypes.TINYINT,
    defaultValue: true,
  },
});

Student.sync({ alter: true }).then(() => {
  return Student.bulkCreate([
    {
      name: "John",
      favourite_class: "math",
      school_year: "2023",
      subscribed_to_yt: "1",
    },
    {
      name: "Kelly",
      favourite_class: "phyc",
      school_year: "10",
      subscribed_to_yt: "0",
    },
    {
      name: "Ashley",
      favourite_class: "english",
      school_year: "2017",
      subscribed_to_yt: "3",
    },
    {
      name: "Jason",
      favourite_class: "Kiswahili",
      school_year: "2020",
      subscribed_to_yt: "1",
    },
    {
      name: "Mike",
      favourite_class: "",
      school_year: "7",
      subscribed_to_yt: "1",
    },
  ]);
});
