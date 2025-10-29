import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Landpage from 'screens/Landpage'
import NotFound from 'screens/NotFound'

import Login from 'screens/Authentication/Login'
import Register from 'screens/Authentication/Register'
import Forgot from 'screens/Authentication/Forgot'
import CreatePassword from 'screens/Authentication/CreatePassword'

import DashboardHome from 'screens/Home'
import DashboardMe from 'screens/Dashboard/Me'
import GeneralLetter from "screens/GeneralLetter";

export default function AppRouter() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={<DashboardHome />} />

          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/forgot" exact element={<Forgot />} />
          <Route path="/create-password" exact element={<CreatePassword />} />

          <Route path="/dashboard" exact element={<DashboardHome />} />

          <Route path="/cg" exact element={<GeneralLetter />} />

          <Route path="/dashboard/Me" exact element={<DashboardMe />} />

          <Route path="*" exact element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}