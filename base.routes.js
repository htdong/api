const chalk = require('chalk');
console.log('%s 4. Routes Initialized!', chalk.green('✓'));

// EXTERNAL
var express = require("express");
var path = require('path');
var serveStatic = require('serve-static');

const app = express();

// INTERNAL
// Alphabet order
// const ChatRoutes = require('./modules/chat/chat.route');
// const DashboardRoutes = require('./modules/dashboard/dashboard.route');
// const GkClientsRoutes = require('./modules/gkClients/gkClients.route');
// const GkRequestsRoutes = require('./modules/gkRequests/gkRequests.route');
// const MessagesRoutes = require('./modules/message/messages.route');
// const NotificationsRoutes = require('./modules/notification/notifications.route');
// const RequestApproval = require('./modules/requestApproval/requestApproval.route');
// const RequestFile = require('./modules/requestFiles/requestFiles.route');
// const RequestComment = require('./modules/requestComments/requestComments.route');
// const RequestHistory = require('./modules/requestHistories/requestHistories.route');
//
const SessionRoutes = require('./_modules/_session/session.route');
const UsersRoutes = require('./_modules/_users/users.route');


/**
* @description Map second level routes (https:/server/secondRoutes) with module routes
*/
const routes = function() {

  // API restful introduction
  let router = express.Router();
  router.get('/', (req, res, next) => {
    res.json({ message: 'Hello World. I am the API Restful server for GKSBS!' });
  });
  app.use('/api', router);

  // API restful services in Alphabet order
  // app.use("/chat", ChatRoutes);
  // app.use("/dashboard", DashboardRoutes);
  // app.use("/gkClients", GkClientsRoutes);
  // app.use("/gkRequests", GkRequestsRoutes);
  // app.use("/messages", MessagesRoutes);
  // app.use("/notifications", NotificationsRoutes);
  // app.use("/requestApproval", RequestApproval);
  // app.use("/requestFiles", RequestFile);
  // app.use("/requestComments", RequestComment);
  // app.use("/requestHistories", RequestHistory);
  //
  app.use("/api/settings", SessionRoutes);
  app.use("/api/users", UsersRoutes);

  // Static files
  // app.use(serveStatic(path.join('/Users/donghoang/node/gk')));
  app.use(serveStatic(path.join('/var/www/repo')));

  console.log('__dirname:', __dirname);

  return app;
}

module.exports = {
  routes: routes
}
