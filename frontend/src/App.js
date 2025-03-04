import UrlShortener from "./components/UrlShortener";
import config from './config';

// Example API request
fetch(`${config.apiUrl}/url`)
  .then(response => response.json())
  .then(data => console.log(data));

function App() {
  return (
    <div>
      <UrlShortener />
    </div>
  );
}

export default App;
