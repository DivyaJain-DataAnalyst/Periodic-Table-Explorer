import PeriodicTable from "./Components/PeriodicTable";
import Trends from "./Components/Trends/Trends";

function App() {
  return (
    <div className="app">
      <h1 className="text-center">Periodic Table Explorer</h1>
      <PeriodicTable />
      <Trends />
    </div>
  );
}

export default App;
