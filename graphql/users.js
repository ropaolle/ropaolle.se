const executeQuery = require('./executeQuery');

/* const loadUsers = async name => {
  const { allUsers } = await executeQuery(
    `query {
      allUsers(first: 10) {        
        email
        mobile
        smsNotifications
        emailNotifications
      }      
    }`
  );
  return allUsers;
}; */

const loadNotificationDestinations = async () => {
  const data = await executeQuery(
    `query {
      notificationDestinations {
        emails
        sms        
      }
    }`
  );
  return data;
};

module.exports = {
  // loadUsers,
  loadNotificationDestinations,
};
