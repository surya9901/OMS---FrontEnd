import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import './App.css';
import DashBoard from './Components/DashBoard/DashBoard';
import HomePage from './Components/HomePage/HomePage';
import RackDetails from './Components/RackDetails/RackDetails';
import Picker from './Components/Picker/Picker';
import RegisterNewUser from './Components/RegisterNewUser/RegisterNewUser'
import SalesOrder from './Components/SalesOrder/SalesOrder';
import StockDetails from './Components/StockDetails/StockDetails';
import ServerCrash from './Components/ServerCrash/ServerCrash';
import RackCategory from './Components/RackCategory/RackCategory';
import MappedRack_Item from './Components/MappedRack_Item/MappedRack_Item';
import PickerScreenSaleOrder from './Components/PickersScreenSalesOrder/PickerScreenSaleOrder';
import PickerView from './Components/PickerViewOrder/PickerView';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/RegisterNewUser' element={<RegisterNewUser />} />
          <Route exact path='/Dashboard' element={<DashBoard />} />
          <Route exact path='/Picker' element={<Picker />} />
          <Route exact path='/RackCategory' element={<RackCategory />} />
          <Route exact path='/PickerSalesOrder' element={<PickerScreenSaleOrder />} />
          <Route exact path='/SalesOrder' element={<SalesOrder />} />
          <Route exact path='/StockDetails' element={<StockDetails />} />
          <Route exact path='/Crash' element={<ServerCrash />} />
          <Route exact path='/MappedRack' element={<MappedRack_Item />} />
          <Route exact path='/MappedStock' element={<MappedRack_Item />} />
          <Route exact path='/RackCategory/RackDetails/:id' element={<RackDetails />} />
          <Route exact path='/PickerSalesOrder/ViewOrder/:id' element={<PickerView />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
