const Holinfo = require("../models/holinfo");
const axios = require("axios");

const router = require("express").Router();

// GET ALL
router.get("/", async (req, res) => {
  try {
    console.log("You are in GET route holinfo");
    // Fetch data from the external API
    const apiResponse = await axios.get("https://api.wazirx.com/api/v2/tickers");

    // Log the API response to inspect its structure

    // Extract an array of symbol objects
    const symbolObjects = Object.values(apiResponse.data);

    // Transform symbol objects into the format expected by your Holingo model
    const top10Entries = symbolObjects.slice(0, 10);

    console.log(top10Entries);
    const dataToStore = top10Entries.map(apiEntry => ({
      name: apiEntry.name,
      lastT: apiEntry.last,
      buy: parseFloat(apiEntry.buy),
      sell: parseFloat(apiEntry.sell),
      volume: parseFloat(apiEntry.volume),
      base_unit: apiEntry.base_unit,
    }));

    if (dataToStore.length === 0) {
      throw new Error("No data found in the API response.");
    }

    // Clear existing data in the database
    await Holinfo.deleteMany({});
    // Store new data in the database
    await Holinfo.insertMany(dataToStore);
    console.log("data fetched and stored successfully");

    // Declare Data outside the if block
    let Data;
    if (dataToStore) {
      Data = await Holinfo.find();
    }

    res.status(200).json(Data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
