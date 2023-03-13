import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  Homepage,
  Categoriespage,
  Searchpage,
  Favoritespage,
  Productpage,
  Cartpage,
  Checkoutpage,
  Placeorderpage,
  Orderpage,
  Profilepage,
  Loginpage,
  Registerpage,
  Userslistpage,
  Usereditpage,
  Productslistpage,
  Producteditpage,
  Orderslistpage,
  Notfoundpage,
} from "./pages/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";
import { useState, useEffect } from "react";

const App = () => {
  const [clientID, setClientID] = useState("");

  useEffect(() => {
    const getClientId = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");

      setClientID(clientId);
    };

    if (!window.paypal) {
      getClientId();
    }
  }, []);

  return (
    <>
      {clientID && (
        <PayPalScriptProvider options={{ "client-id": clientID }}>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1 rounded-sm bg-stone-50 w-full lg:w-8/12 mx-auto mt-28 md:mt-20 mb-4">
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route
                    path="/search/category/:category"
                    element={<Searchpage />}
                  />
                  <Route path="/search/order/:order" element={<Searchpage />} />
                  <Route
                    path="/search/category/:category/order/:order"
                    element={<Searchpage />}
                  />
                  <Route path="/categories" element={<Categoriespage />} />
                  <Route path="/favorites" element={<Favoritespage />} />
                  <Route path="/product/:id" element={<Productpage />} />
                  <Route path="/cart" element={<Cartpage />} />
                  <Route path="/checkout" element={<Checkoutpage />} />
                  <Route path="/place-order" element={<Placeorderpage />} />
                  <Route path="/orders/:id" element={<Orderpage />} />
                  <Route path="/profile" element={<Profilepage />} />
                  <Route path="/login" element={<Loginpage />} />
                  <Route path="/register" element={<Registerpage />} />
                  <Route path="/admin/users" element={<Userslistpage />} />
                  <Route
                    path="/admin/users/:id/edit"
                    element={<Usereditpage />}
                  />
                  <Route
                    path="/admin/products"
                    element={<Productslistpage />}
                  />
                  <Route
                    path="/admin/products/:id/edit"
                    element={<Producteditpage />}
                  />
                  <Route path="/admin/orders" element={<Orderslistpage />} />
                  <Route path="*" element={<Notfoundpage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </PayPalScriptProvider>
      )}
      <ToastContainer
        toastStyle={{
          backgroundColor: "#fff",
        }}
        hideProgressBar="false"
      />
    </>
  );
};

export default App;
