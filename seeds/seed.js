const mongoose = require("mongoose");
const db = require("../config/connection");
const { User, Thought } = require("../models");

async function seedData() {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    console.log("connected to database");

    // Create users
    const users = await User.insertMany([
      { username: "alice", email: "alice@example.com" },
      { username: "bob", email: "bob@example.com" },
      { username: "charlie", email: "charlie@example.com" },
    ]);

    console.log("Users seeded");

    // Create thoughts
    const thoughts = await Thought.insertMany([
      {
        thoughtText: "Here's a cool thought...",
        username: "alice",
        userId: users[0]._id,
      },
      {
        thoughtText: "Here's another cool thought...",
        username: "bob",
        userId: users[1]._id,
      },
      {
        thoughtText: "Here's a third cool thought...",
        username: "charlie",
        userId: users[2]._id,
      },
    ]);

    console.log("Thoughts seeded");

    // Add thoughts to users
    await User.findByIdAndUpdate(users[0]._id, {
      $push: { thoughts: thoughts[0]._id },
    });
    await User.findByIdAndUpdate(users[1]._id, {
      $push: { thoughts: thoughts[1]._id },
    });
    await User.findByIdAndUpdate(users[2]._id, {
      $push: { thoughts: thoughts[2]._id },
    });

    console.log("Thoughts added to users");

    // Add friends
    await User.findByIdAndUpdate(users[0]._id, {
      $push: { friends: users[1]._id },
    });
    await User.findByIdAndUpdate(users[1]._id, {
      $push: { friends: users[2]._id },
    });

    console.log("Friends added");

    console.log("all done!");
  } catch (err) {
    console.error(err);
  }
}

module.exports = seedData;


if (require.main === module) {
  db.once("open", async () => {
    await seedData();
    process.exit(0);
  });
}
