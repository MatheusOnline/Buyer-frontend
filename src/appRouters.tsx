import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import { RequireAuth } from "./features/auth/components/RequireAuth";
import { Home } from "./Pages/Home/Index";
const Product = lazy(() => import("./Pages/Announcement/index"));
const CartPage = lazy(() => import("./Pages/Cart"));
const Favorites = lazy(() => import("./Pages/Favorites"));
const Search = lazy(() => import("./Pages/Search"));
const Checkout = lazy(() => import("./Pages/Checkout"));
const Payment = lazy(() => import("./Pages/Payment"));
const Card = lazy(() => import("./Pages/Payment/Card"));

const Login = lazy(() => import("./Pages/auth/login"));
const SocialAuth = lazy(() => import("./features/auth/pages/SocialAuthPage"));
const Register = lazy(() => import("./Pages/auth/register"));
const ForgotPassword = lazy(() => import("./Pages/auth/forgotPassword"));


const ProfileLayout = lazy(() => import("./Pages/Profile/profileLayout"))
const ProfileHome = lazy(() => import("./Pages/Profile/home"))
const ProfileOrders = lazy(() => import("./Pages/Profile/orders"))
const ProfileAnddress = lazy(() => import("./Pages/Profile/address"))

export const AppRoutes = () => (
  <BrowserRouter>
    <Suspense fallback={<div role="status">Carregando...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:slug/:id" element={<Product />} />
        <Route path="/search" element={<Search />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/social" element={<SocialAuth />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />

        <Route element={<RequireAuth />}>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/payment/checkout/:checkoutId" element={<Checkout />} />
          <Route path="/payment/pix/:checkoutId" element={<Payment />} />
          <Route path="/payment/card/:checkoutId" element={<Card />} />
          <Route path="/profile" element={<ProfileLayout />}>
            <Route index element={<ProfileHome />} />
            <Route path="orders" element={<ProfileOrders />} />
            <Route path="address" element={<ProfileAnddress />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  </BrowserRouter>
);
