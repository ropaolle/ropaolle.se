require('dotenv').config();
const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { NextApp } = require('@keystonejs/app-next');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
const { extendGraphQLSchema } = require('./graphql/extendGraphQLSchema');
const initialiseData = require('./initial-data');

const keystone = new Keystone({
  name: 'RopaOlle.se',
  adapter: new Adapter({ mongoUri: process.env.MONGO_URI }),
  onConnect: initialiseData,
  sessionStore: !process.env.BUILD_STAGE ? new MongoStore({ url: process.env.MONGO_URI }) : null,
  // TODO: Production
  // cookieSecret: process.env.COOKIE_SECRET,
  // cookieSameSite: true,
  // cookie: {
  //   secret: process.env.COOKIE_SECRET,
  //   sameSite: true,
  // },
});

const UsersSchema = require('./lists/Users.js');
keystone.createList('User', UsersSchema);
const LogsSchema = require('./lists/Logs.js');
keystone.createList('Log', LogsSchema);
const ResetPasswordsSchema = require('./lists/ResetPasswords.js');
keystone.createList('ResetPassword', ResetPasswordsSchema);

keystone.extendGraphQLSchema(extendGraphQLSchema);

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      enableDefaultRoute: false,
      authStrategy,
    }),
    new NextApp({ dir: 'app' }),
  ],
};
