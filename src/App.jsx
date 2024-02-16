import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

// import Homepage from "./pages/Homepage";
// import Pricing from "./pages/Pricingpage";
// import Product from "./pages/Productpage";
// import Login from "./pages/Loginpage";
// import AppLayout from "./pages/AppLayout";

import CityLists from "./components/CityLists";
import CountryLists from "./components/CountryLists";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";



const Homepage = lazy(() => import('./pages/Homepage'))
const Pricing = lazy(() => import('./pages/Pricingpage'))
const Product = lazy(() => import('./pages/Productpage'))
const Login = lazy(() => import('./pages/Loginpage'))
const AppLayout = lazy(() => import('./pages/AppLayout'))

const App = () => {





  return <>
    <BrowserRouter>

      <Suspense fallback={<SpinnerFullPage />}>
        <Routes>

          <Route index element={<Homepage />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/product' element={<Product />} />
          <Route path='/login' element={<Login />} />
          <Route path='/app' element={<AppLayout />}>

            <Route index element={<Navigate replace to={'cities'} />} />
            <Route path='cities' element={<CityLists />} />
            <Route path='cities/:id' element={<City />} />
            <Route path='form' element={<Form />} />
            <Route path='countries' element={<CountryLists />} />


          </Route>


        </Routes>
      </Suspense>
    </BrowserRouter>
  </>;
};

export default App;

