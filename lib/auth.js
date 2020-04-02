const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin);

const userOwnsItem = ({ authentication: { item: user } }) => {
  if (!user) {
    return false;
  }
  return { id: user.id };
};

const userIsAdminOrOwner = (auth) => {
  const isAdmin = access.userIsAdmin(auth);
  const isOwner = access.userOwnsItem(auth);
  return isAdmin || isOwner;
};

const isAuthenticated = ({ authentication: { item: user } }) => !!user;

const access = { isAuthenticated, userIsAdmin, userOwnsItem, userIsAdminOrOwner };

module.exports = access;
