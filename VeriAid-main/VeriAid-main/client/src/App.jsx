import { Route, Routes } from "react-router-dom"
import Homepage from "./pages/User/Home"
import NeedPage from "./pages/User/Need"
import AdminPanel from "./pages/admin/AdminHome"
import MerchantVoucherRedemption from "./pages/user/redeem"



function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/new" element={<NeedPage/>}/>
        <Route path="/redeem" element={<MerchantVoucherRedemption/>} />
        <Route path="/admin" element={<AdminPanel/>} />
      </Routes>
    </div>
  )
}

export default App
