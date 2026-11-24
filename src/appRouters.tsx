import {CookieNotice} from "./features/privacy/components/CookieNotice.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import { RequireAuth } from "./features/auth/components/RequireAuth.tsx";
import { Home } from "./Pages/Home/Index.tsx";
const NotFoundPage = lazy(() => import("./features/errors/pages/NotFoundPage.tsx"));
const LegalPage = lazy(() => import("./features/legal/pages/LegalPage.tsx"));
const Product = lazy(() => import("./Pages/Announcement/index.tsx"));
const CartPage = lazy(() => import("./Pages/Cart/index.tsx"));
const Favorites = lazy(() => import("./Pages/Favorites/index.tsx"));
const Search = lazy(() => import("./Pages/Search/index.tsx"));
const Checkout = lazy(() => import("./Pages/Checkout/index.tsx"));
const Payment = lazy(() => import("./Pages/Payment/index.tsx"));
const Card = lazy(() => import("./Pages/Payment/Card.tsx"));

const Login = lazy(() => import("./Pages/auth/login/index.tsx"));
const SocialAuth = lazy(() => import("./features/auth/pages/SocialAuthPage.tsx"));
const Register = lazy(() => import("./Pages/auth/register/index.tsx"));
const ForgotPassword = lazy(() => import("./Pages/auth/forgotPassword/index.tsx"));


const ProfileLayout = lazy(() => import("./Pages/Profile/profileLayout.tsx"))
const ProfileHome = lazy(() => import("./Pages/Profile/home.tsx"))
const ProfileOrders = lazy(() => import("./Pages/Profile/orders.tsx"))
const ProfileAnddress = lazy(() => import("./Pages/Profile/address.tsx"))

export const AppRoutes = () => (
  <BrowserRouter>
    <Suspense fallback={<div role="status">Carregando...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:slug/:id" element={<Product />} />
        <Route path="/termos-de-uso" element={<LegalPage kind="terms" />} />
        <Route path="/politica-de-privacidade" element={<LegalPage kind="privacy" />} />
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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
    <CookieNotice />
  </BrowserRouter>
);
