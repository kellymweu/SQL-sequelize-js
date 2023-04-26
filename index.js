const { Sequelize, DataTypes, Op } = require("sequelize");

// ........DB MYSQL SEQUELIZE CONNECT...........
// Option 3: Passing parameters separately (other dialects)
/* users is the db name, root is my username, 1234 is the password */
const sequelize = new Sequelize("users", "root", "1234", {
  host: "localhost", // 127.0.0.1
  port: "3306",
  dialect: "mysql",
  dialectOptions: {
    //enable support for BigInt in MySQL 8 as it is automatically disabled in sequelize
    bigNumberStrings: true,
  },
  /*
  define: {
    freezeTableName: true,
  },
  */
});

// CHECKING IF THE DB CONNECTION IS SUCCESSFUL METHOD 1
/* 
Writing promises
async function myFunction() {
  await sequelize.authenticate();
  console.log("Db connection successful");
}
myFunction();
console.log("Another task done"); 
*/

// CHECKING IF THE DB CONNECTION IS SUCCESSFUL METHOD 2
/* 
sequelize
  .authenticate()
  .then(() => {
    console.log("Db connection successful");
  })
  .catch((err) => {
    console.log("Db connection unsuccessful");
  });
console.log("aaaaaaa");
*/

//...........MODEL DEFINITION...........
const User = sequelize.define(
  "user",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      //unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    freezeTableName: true, // move this line to after the fields object
    timestamps: false, //created at and updated at times disabled
  },
  {
    paranoid: true,
  }
);

//console.log(sequelize.models.user);

// ......SYNCING TABLES/MODELS........
/* sequelize.sync(), sequelize.sync({ force: true}), sequelize.sync({ alter: true}) 
will work for the whole database tables */

/* sync(), syncy({ force: true}), sync({ alter: true}) */
/*
User.sync({ force: true })
  .then(() => {
    console.log("Table and model synced successfully");
  })
  .catch((err) => {
    console.log("Error, Table and Model did not sync properly");
  });
  */

// ......DROPPING A TABLE(S)......
/* 
using Regular expression (REGEXP)
sequelize.drop({ match: /_test$/ })
  .then(() => {
    console.log("Table and model dropped successfully");
  })
  .catch((err) => {
    console.log("Error, Table and Model not dropped properly");
  });

*/

/* .......CREATING RECORDS....... */
/*

User.sync({ alter: true }).then(() => {
  //working with the updated table.
  const user = User.create({
    username: "Kelly Mweu",
    password: "Abcd1234!",
    email: "mweukelly@bla.com",
  });
  return user
    .then((user) => {
      console.log(user.toJSON()); //make in JSON reduce clutter
      console.log("User updated successfully");
      console.log({ user_id });
    })
    .catch((err) => {
      console.log("Unsuccessful User ADD");
    });
});

*/

/*......BULK CREATION OF RECORDS.......*/
/*
User.sync({ alter: true })
  .then(() => {
    return User.bulkCreate(
      [
        {
          username: "John Doe",
          password: "gvfhbdnj",
          email: "somebody@fjn.com",
        },
        {
          username: "Jane Doe",
          password: "sjnjamks",
          email: "herehhe@pwie.com",
        },
      ],
      { validate: true } //using this on bulk create could make the app slower
    );
  })
  .then((data) => {
    data.forEach((element) => {
      //use forEach to loop through each record.
      console.log(element.toJSON());
    });
  })
  .catch((err) => {
    console.log(err);
  });
*/

/* ........DELETING RECORDS....... */
/*
User.destroy({
  where: {
    user_id: [2, 3, 4],
  },
})
  .then(() => {
    console.log("User(s) deleted successfully");
  })
  .catch((err) => {
    console.log("Unsuccessful user(s) deletion");
  });
*/

/*.......QUERYING THE DB......... */
/*
User.sync({ alter: true })
  .then(() => {
    return User.findAll({ attributes: ["username", "email"] });
  })
  .then((data) => {
    data.forEach((element) => {
      console.log(element.toJSON());
    });
  })
  .catch((err) => {
    console.log(err);
  });
*/

/* 
attributes [[sequelize.fn("SUM", sequelize.col("user_id")), "idSum"]]
attributes: ({ attributes: { exclude: ['password']}}),
*/
User.sync({ alter: true })
  .then(() => {
    return User.findAll({ attributes: ["username"] });
  })
  .then((data) => {
    data.forEach((element) => {
      console.log(element.toJSON());
    });
  })
  .catch((err) => {
    console.log(err);
  });
