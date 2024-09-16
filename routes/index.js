const router = require("express").Router();
const apiRoutes = require("./api");
const seedData = require("../seeds/seed");

router.use("/api", apiRoutes);

router.post("/reset", async (req, res) => {
  try {
    await seedData();
    res.json({ message: "Database reset successful" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.use((req, res) => {
  res.status(404).send("<h1>404 Error!</h1>");
});

module.exports = router;
