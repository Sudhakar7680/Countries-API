// Fetching country data from the API
fetch("https://restcountries.com/v3.1/all")
  .then(function (res) {
    res.json().then(function (data) {
      console.log(data);
      renderUi(data); // Initial rendering of all countries

      const searchInput = document.getElementById('searchInput');

      // Adding event listener for search functionality
      searchInput.addEventListener('input', function () {
        const searchValue = searchInput.value.toLowerCase(); // Corrected from ariaValueMax to value
        const filteredCountries = data.filter(country =>
          country.name.common.toLowerCase().includes(searchValue) // Filter countries by search value
        );

        if (filteredCountries.length > 0) {
          renderUi(filteredCountries); // Re-render the filtered results
        } else {
          showError('No results found');
        }
      });
    });
   
  });



// Function to render the country cards
var html = '';
function renderUi(data) {
  html = ''; // Reset HTML before rendering new data
  data.forEach(function (country) {
    html += `
      <div class="col-md-3">
        <div class="card-inner-container">
        <a href = "country.html?name=${encodeURIComponent(country.name.common)}" class =" country-card text-decoration-none text-dark">
          <img src="${country.flags.png}" alt="${country.name.common} flag" class="image-logo text-center">
          <h5 class="country-title mt-4">Country: ${country.name.common}</h5>
          <p class="country-capital"><b>Capital:</b> ${country.capital ? country.capital[0] : 'N/A'}</p>
          <p class="country-population"><b>Population:</b> ${country.population}</p>
          <p class="country-region"><b>Region:</b> ${country.region}</p>
          </a>
        </div>
      </div>`;
  });

  document.getElementById("post-data").innerHTML = html; // Insert the generated HTML into the DOM
}

// Function to display an error message
function showError(message) {
  document.getElementById("post-data").innerHTML = `<p>${message}</p>`;
}


// JavaScript for dark mode toggle

// Check for saved user preference in localStorage and apply it
const darkModeToggle = document.getElementById('darkModeToggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = 'Light Mode';
}

// Add event listener for toggle button
darkModeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    
    // Update button text
    if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = 'Light Mode';
        localStorage.setItem('theme', 'dark'); // Save the preference
    } else {
        darkModeToggle.textContent = 'Dark Mode';
        localStorage.setItem('theme', 'light'); // Save the preference
    }
});

