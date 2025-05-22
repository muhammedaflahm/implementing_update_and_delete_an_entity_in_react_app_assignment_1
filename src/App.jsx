import UpdateItem from "./components/UpdateItem";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  return <UpdateItem id={1} apiUri={API_URI} />;
}

export default App;