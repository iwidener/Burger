const connection = require("./connection.js");

function printQmarks(num) {

    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

function objToSql(ob) {

    var arr = [];

    for (var key in ob) {
        var value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
        return arr.toString();
}

const orm = {

    selectAll: function (tableInput, cb) {
        const queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    insertOne: function (tableInput, cols, vals, cb) {
        const queryString = "INSERT INTO " + tableInput + " (" + cols.toString() + ") " + "VALUES (" + printQmarks(vals.length) + ") ";

        console.log(queryString);
        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    updateOne: function (tableInput, objColVals, condition, cb) {
        const queryString = "UPDATE " + tableInput + " SET " + objToSql(objColVals) + " WHERE " + condition;

        console.log(queryString);
        connection.query(queryString, objColVals, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    }
};

module.exports = orm;