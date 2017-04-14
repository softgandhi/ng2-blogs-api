"use strict";
var express = require("express");
var sql = require("mssql");
var router = express.Router();
router.get('/', function (req, res) {
    var request = new sql.Request();
    request.query('select * from Blog where isActive = 1').then(function (err, recordset) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(recordset);
        }
    });
});
router.get('/:id', function (req, res) {
    var id = req.params['id'];
    var request = new sql.Request();
    var query = 'select * from Blog where id =' + id;
    request.query(query).then(function (recordset, err) {
        if (err) {
            res.json('err');
        }
        else {
            res.send(recordset[0]);
        }
    });
});
router.post('/', function (req, res) {
    var name = req.body.name;
    var desc = req.body.description;
    var image = req.body.image;
    var authorName = req.body.authorName;
    // res.send(name + ' ' + desc);
    var request = new sql.Request();
    var query = "insert Blog values('" + name + "', '" + image + "', '" + authorName + "', '" + desc + "', getdate(), null, 1)";
    request.query(query).then(function (recordset, err) {
        if (err) {
            res.json('err');
        }
        else {
            res.send(req.body);
        }
    });
});
router.put('/:id', function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var desc = req.body.description;
    var image = req.body.image;
    var authorName = req.body.authorName;
    // res.send(name + ' ' + desc);
    var request = new sql.Request();
    var query = "SaveBlog " + id + ", '" + name + "', '" + image + "', '" + authorName + "', '" + desc + "'";
    request.query(query).then(function (recordset, err) {
        if (err) {
            res.json('err');
        }
        else {
            res.send(req.body);
        }
    });
});
router.delete('/:id', function (req, res) {
    var id = req.params.id;
    // res.send(name + ' ' + desc);
    var request = new sql.Request();
    var query = "update Blog set isActive = 0 where id = " + id;
    request.query(query).then(function (recordset, err) {
        if (err) {
            res.json('err');
        }
        else {
            res.send(id);
        }
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
//# sourceMappingURL=blog.js.map