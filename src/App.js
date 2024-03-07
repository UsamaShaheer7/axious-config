import logo from "./logo.svg";
import "./App.css";
import { getRequest } from "./config/axiosConfig";

function App() {
  getRequest("https://jsonplaceholder.typicode.com/posts")
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
  return (<></>);
}

export default App;
