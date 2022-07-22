import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App ">
      ola amigos
      <Link to="/invoices">Invoices</Link> |{" "}
      <Link to="/expenses">Expenses</Link>
    </div>
  );
}

export default App;
