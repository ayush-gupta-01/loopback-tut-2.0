"use strict";

const app = require("../server/server");
const ds = app.dataSources.ds;

const models = ["book"];

ds.autoupdate("book", (err) => {
    if (err) {
        console.log("Something went wrong");
    }
    ds.disconnect();
    process.exit();
})