import React from 'react';
import WeatherApp from '.'; // Import the WeatherApp component

function App() {
  return (
    <html lang="en">
      <head>
        {/* ... */}
      </head>
      <body>
        <div className="container">
          <h1>Weather App</h1>
          {/* Include the WeatherApp component */}
          <WeatherApp />
        </div>
        <script src="index.jsx"></script>
      </body>
    </html>
  );
}

export default App;
