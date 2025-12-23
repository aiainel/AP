const express = require("express");
const axios = require("axios");
const path = require("path");

require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.get("/api/random-user", async (req, res) => {
  try {
    // Random User API
    const userResponse = await axios.get("https://randomuser.me/api/");
    const user = userResponse.data.results[0];
    const countryName = user.location.country;

    // Countrylayer API
    const countryResponse = await axios.get(
      `http://api.countrylayer.com/v2/name/${countryName}?access_key=${process.env.COUNTRY_API_KEY}`
    );
    const country = countryResponse.data[0];
    const currencyCode = country.currencies
      ? Object.keys(country.currencies)[0]
      : null;

    // Exchange Rate API
    let exchangeRates = null;
    if (currencyCode) {
      try {
        const rateResponse = await axios.get(
          `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API_KEY}/latest/${currencyCode}`
        );
        exchangeRates = {
          base: currencyCode,
          USD: rateResponse.data.conversion_rates.USD,
          KZT: rateResponse.data.conversion_rates.KZT
        };
      } catch (err) {
        console.log("Exchange rate fetch failed:", err.message);
      }
    }

    // News API
    let newsArticles = [];
    try {
      const newsResponse = await axios.get(
        "https://newsapi.org/v2/everything",
        {
          params: {
            q: countryName,
            language: "en",
            pageSize: 5,
            apiKey: process.env.NEWS_API_KEY
          }
        }
      );
      newsArticles = newsResponse.data.articles.map(article => ({
        title: article.title,
        image: article.urlToImage,
        description: article.description,
        url: article.url
      }));
    } catch (err) {
      console.log("News API fetch failed:", err.message);
    }

    // Final response
    res.json({
      user: {
        firstName: user.name.first,
        lastName: user.name.last,
        gender: user.gender,
        age: user.dob.age,
        dob: user.dob.date,
        city: user.location.city,
        country: countryName,
        address: `${user.location.street.name}, ${user.location.street.number}`,
        picture: user.picture.large
      },
      country: {
        name: country.name,
        capital: country.capital || "N/A",
        languages: country.languages
          ? Object.values(country.languages).join(", ")
          : "N/A",
        currency: currencyCode || "N/A",
        flag: country.flag
      },
      exchangeRates,
      news: newsArticles
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});