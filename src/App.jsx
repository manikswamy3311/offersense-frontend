import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/Dashboard.jsx";
import CampaignPerformance from "./pages/CampaignPerformance";
import CustomerSegments from "./pages/CustomerSegments";
import OfferEffectiveness from "./pages/OfferEffectiveness";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/campaign" element={<CampaignPerformance />} />
        <Route path="/segments" element={<CustomerSegments />} />
        <Route path="/offers" element={<OfferEffectiveness />} />
      </Routes>
    </Router>
  );
}

export default App
