// Create Vue 3 app
const app = Vue.createApp({
    data() {
      // All variables used in the app
      return {
        user: {
          first_name: '',
          last_name: '',
          age: '',
          profile_picture: ''
        },
        city: 'London',      // Default city
        province: 'Ontario', // Default province
        country: 'Canada',   // Default country
        weather: {
          temperature: '',
          wind: '',
          description: ''
        },
        word: '', // word input for dictionary
        dictionary: {
          word: '',
          phonetic: '',
          definition: ''
        }
      };
    },
  
    // Code to run when the page loads
    mounted() {
      this.fetchUser();     // Load a random profile
      this.fetchWeather();  // Load default weather (London, ON)
    },
  
    methods: {
      // Get a random user profile from API
      fetchUser() {
        fetch('https://comp6062.liamstewart.ca/random-user-profile')
          .then(res => res.json())
          .then(data => {
            // Update user object with API response
            this.user.first_name = data.first_name;
            this.user.last_name = data.last_name;
            this.user.age = data.age;
            this.user.profile_picture = data.profile_picture;
          })
          .catch(error => {
            console.error('Error fetching user:', error);
          });
      },
  
      // Get weather data from API
      fetchWeather() {
        const { city, province, country } = this;
  
        // Build API URL using inputs
        const url = `https://comp6062.liamstewart.ca/weather-information?city=${city}&province=${province}&country=${country}`;
        
        fetch(url)
          .then(res => res.json())
          .then(data => {
            // Save the returned weather details
            this.weather.temperature = data.temperature;
            this.weather.wind = data.wind_speed;
            this.weather.description = data.weather_description;
          })
          .catch(error => {
            console.error('Error fetching weather:', error);
          });
      },
  
      // Get word definition from dictionary API
      fetchDefinition() {
        // Skip if input is empty
        if (!this.word.trim()) return;
  
        const url = `https://comp6062.liamstewart.ca/define?word=${this.word}`;
        
        fetch(url)
          .then(res => res.json())
          .then(data => {
            // Extract word info from the first result
            this.dictionary.word = data[0].word;
            this.dictionary.phonetic = data[0].phonetic;
            this.dictionary.definition = data[0].meanings[0].definitions[0].definition;
          })
          .catch(error => {
            console.error('Error fetching definition:', error);
          });
      }
    }
  }).mount("#app"); // Attach Vue app to the div with id="app"