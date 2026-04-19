import PeriodicTable from "./Components/PeriodicTable";
import Trends from "./Components/Trends/Trends";
import CompareElements from "./Components/compareElements";

function App() {
  return (
    <div className="app">
      <h1 className="text-center">Periodic Table Explorer</h1>
      <PeriodicTable />
      <Trends />
      <CompareElements />
    </div>
  );
}

export default App;
