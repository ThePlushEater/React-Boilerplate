var koa = require('koa');
var app = koa();

app.use(function *(){
    this.body = 'Hello from koajs';
});

app.listen(3030);

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'tree_parent',
    charset  : 'utf8'
  }
});

var bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
  tableName: 'users'
});
