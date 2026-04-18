import PeriodicTable from "./Components/PeriodicTable";
import CompareElements from "./Components/compareElements";

function App() {
  return (
    <div className="app">
      <h1 className="text-center">Periodic Table Explorer</h1>
      <PeriodicTable />
      <CompareElements />
    </div>
  );
}

export default App;
