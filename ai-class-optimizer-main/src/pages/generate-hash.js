const bcrypt = require('bcryptjs');

// Hash the password
const password = 'password123';
bcrypt.hash(password, 10, (err, hashedPassword) => {
  if (err) throw err;
  console.log(hashedPassword); // Print the hashed password to the console
});
