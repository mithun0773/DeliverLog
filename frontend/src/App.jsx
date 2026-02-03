import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StoreSelect from "./pages/StoreSelect";
import Scan from "./pages/Scan";
import DriverSubmission from "./pages/DriverSubmission";
import Summary from "./pages/Summary";
import Status from "./pages/StatusPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<StoreSelect />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/driver" element={<DriverSubmission />} />
        <Route path="/status" element={<Status />} />

        <Route path="/summary" element={<Summary />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
