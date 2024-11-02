
function getQueryParams(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get the country name from the query parameters
const countryName = getQueryParams('name');

if (countryName) {
    // Fetch the specific country data by its name
    fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`)
        .then(res => res.json())
        .then(data => {
            if (data.length > 0) {
                const country = data[0];
                displayCountryDetails(country);
            } else {
                document.getElementById('country-details').innerHTML = '<p>Country not found</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching country data:', error);
            // document.getElementById('country-details').innerHTML = '<p>Error loading country data</p>';
        });
} else {
    document.getElementById('country-details').innerHTML = '<p>No country selected</p>';
}

// Function to display country details
function displayCountryDetails(country) {
     // Get currencies and join them properly
     const currencies = country.currencies
     ? Object.values(country.currencies).map(currency => currency.name).join(', ')
     : 'N/A';

     // Get border countries and generate their links
    const borderCountries = country.borders
    ? country.borders.map(border => `<a href="country.html?name=${border}">${border}</a>`).join(', ')
    : 'None';
    const detailsHtml = `
        <img src="${country.flags.png}" alt="${country.name.common} flag" class="logo">
   
<div class="details-text-container">
   <h2>${country.name.common}</h2>
   <div class="details-text">
       <p><b>Native Name :</b><span class="native-name">${Object.values(country.name.nativeName)[0].common}</span></p>
       <p><b>Population :</b><span class="native-name">${country.population.toLocaleString()}</span></p>
       <p><b>Region :</b><span class="native-name">${country.region}</span></p>
       <p><b>Sub Region :</b><span class="native-name">${country.subregion}</span></p>
       <p><b>Capital :</b><span class="native-name">${country.capital ? country.capital[0] : 'N/A'}</span></p>
       <p><b>Top Level Domain :</b><span class="native-name">${country.tld.join(', ')}</span></p>
       <p><b>Currencies: </b><span class="native-name">${currencies}</span></p>
       <p><b>Languages:</b><span class="native-name"> ${Object.values(country.languages).join(', ')}</span></p>
   </div>
   <div class="border-countries">
       <p> <b>Border Countries:</b>${borderCountries}</p>
   </div>
 </div>
    `;

    document.getElementById('country-details').innerHTML = detailsHtml;
    
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