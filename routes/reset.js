// In your routes/api/index.js file, add:
const seedData = require("../seeds/seed");

router.post("/reset", async (req, res) => {
  try {
    await seedData();
    res.json({ message: "Database reset successful" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Modify your seeds/seed.js to export a function:
module.exports = async function seedData() {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Create users
    const users = await User.insertMany([
      { username: "alice", email: "alice@example.com" },
      { username: "bob", email: "bob@example.com" },
      { username: "charlie", email: "charlie@example.com" },
    ]);

    // ... rest of your seeding logic ...

    console.log("Database reset complete");
  } catch (err) {
    console.error(err);
  }
};


