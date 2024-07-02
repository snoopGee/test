db = db.getSiblingDB("docker-mern-mongo");

db.createCollection("users");

db.createUser({
    user: "dbadmin",
    pwd: "P1ssw0rd",
    roles: [
      {
        role: "readWrite",
        db: "docker-mern-mongo",
      },
    ],
});


const totalUsers = 100;

let accounts = [];
for (idx = 0; idx < totalUsers; idx++) {
  accounts.push(
    (Math.floor(Math.random() * 9000000000) + 1000000000).toString()
  );
}

let histories = [];
accounts.map((account, idx) => {
  const loop = Math.floor(Math.random() * 20) + 1;
  let _histories = [];
  for (i = 0; i < loop; i++) {
    const amount = Math.floor(Math.random() * 99) + 1;
    const dstIdx = Math.floor(Math.random() * 10);
    _histories.push({
      timestamps: Date.now(),
      source: account,
      destination: accounts[dstIdx],
      amount,
      accountName: `Tony_${idx + dstIdx} Chopper_${idx + dstIdx}`
    });
  }
  histories.push(_histories);
});

db.users.insertOne({
  accountId: (Math.floor(Math.random() * 9000000000) + 1000000000).toString(),
  firstname: "Luffy",
  lastname: "Monkey D",
  username: "admin",
  email: "admin@test.com",
  password: "admin",
  role: "admin",
  balance: 100000,
  histories: [],
});

for (idx = 0; idx < totalUsers; idx++) {
  db.users.insertOne({
    accountId: accounts[idx],
    firstname: `Tony_${idx + 1}`,
    lastname: `Chopper_${idx + 1}`,
    username: `user${idx + 1}`,
    email: `user${idx + 1}@test.com`,
    password: "P@ssw0rd",
    role: "user",
    balance: Math.floor(Math.random() * 9000000) + 1000000,
    histories: histories[idx],
  });
}