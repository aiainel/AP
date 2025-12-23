const btn = document.getElementById("getUserBtn");
const userCard = document.getElementById("userCard");

btn.addEventListener("click", async () => {
  try {
    const response = await fetch("/api/random-user");
    const data = await response.json();

    const user = data.user;
    const country = data.country;
    const rates = data.exchangeRates;
    const newsArticles = data.news;

    userCard.innerHTML = `
      <div class="card">
        <img src="${user.picture}" alt="Profile Picture">
        <h2>${user.firstName} ${user.lastName}</h2>

        <p><strong>Gender:</strong> ${user.gender}</p>
        <p><strong>Age:</strong> ${user.age}</p>
        <p><strong>Date of Birth:</strong> ${new Date(user.dob).toDateString()}</p>

        <hr>
        <h3>Country Info</h3>
        <p><strong>Country:</strong> ${country.name}</p>
        <p><strong>Capital:</strong> ${country.capital}</p>
        <p><strong>Language(s):</strong> ${country.languages}</p>
        <p><strong>Currency:</strong> ${country.currency}</p>

        <hr>
        <h3>Exchange Rates</h3>
        ${
          rates
            ? `<p>1 ${rates.base} = ${rates.USD} USD</p>
               <p>1 ${rates.base} = ${rates.KZT} KZT</p>`
            : "<p>Exchange rates not available</p>"
        }

        <hr>
        <h3>Latest News from ${country.name}</h3>
        ${
          newsArticles.length > 0
            ? newsArticles
                .map(article => `
                  <div class="news-card">
                    ${article.image ? `<img src="${article.image}" width="150">` : ""}
                    <h4>${article.title}</h4>
                    <p>${article.description || "No description available"}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                  </div>
                `)
                .join("")
            : "<p>No news available</p>"
        }
      </div>
    `;
  } catch (err) {
    console.error(err);
    userCard.innerHTML = "<p>Error loading data</p>";
  }
});