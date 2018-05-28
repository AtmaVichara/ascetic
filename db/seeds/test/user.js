
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE users RESTART IDENTITY')
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'joe',
          password_digest: "$2b$10$BPKnhh3w2Fyf5EpG9W1wKuAWBy4k324tHfk6khENApPToWivCdRqq",
          email: 'jmrjobes@yahmail.biznis'
        }
      ]);
    });
};
