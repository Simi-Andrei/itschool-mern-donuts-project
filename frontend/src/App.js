import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Productspage from "./pages/Productspage";
import Favoritespage from "./pages/Favoritespage";
import Productpage from "./pages/Productpage";
import Cartpage from "./pages/Cartpage";
import Deliverypage from "./pages/Deliverypage";
import Paymentpage from "./pages/Paymentpage";
import Placeorderpage from "./pages/Placeorderpage";
import Orderpage from "./pages/Orderpage";
import Profilepage from "./pages/Profilepage";
import Loginpage from "./pages/Loginpage";
import Registerpage from "./pages/Registerpage";
import Userslistpage from "./pages/Userslistpage";
import Usereditpage from "./pages/Usereditpage";
import Productslistpage from "./pages/Productslistpage";
import Producteditpage from "./pages/Producteditpage";
import Orderslistpage from "./pages/Orderslistpage";
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
              <main className="flex-1 w-full md:container mx-auto py-4 md:p-4 mt-20 md:mt-14">
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/products" element={<Productspage />} />
                  <Route path="/favorites" element={<Favoritespage />} />
                  <Route path="/products/:id" element={<Productpage />} />
                  <Route path="/cart" element={<Cartpage />} />
                  <Route path="/delivery" element={<Deliverypage />} />
                  <Route path="/payment" element={<Paymentpage />} />
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
