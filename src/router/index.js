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
import AssemblyLetter from "screens/AssemblyLetter";
import AssemblyProgram from "screens/AssemblyProgram";
import AssemblyAssignment from "screens/AssemblyAssignment";
import AssemblyTransition from "screens/AssemblyTransition";

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

          <Route path="/cg" exact element={<AssemblyLetter documentId="cg" />} />
          <Route path="/dm" exact element={<AssemblyLetter documentId="dm" />} />
          <Route path="/pio" exact element={<AssemblyProgram documentId="pio" />} />
          <Route path="/ass-co" exact element={<AssemblyProgram documentId="ass-co" />} />
          <Route path="/ass-br" exact element={<AssemblyProgram documentId="ass-br" />} />

          <Route path="/disc-co" exact element={<AssemblyAssignment documentId="disc-co" />} />
          <Route path="/discb-co" exact element={<AssemblyAssignment documentId="discb-co" />} />
          <Route path="/pr-or-co" exact element={<AssemblyAssignment documentId="pr-or-co" />} />
          <Route path="/pr-or-b-co" exact element={<AssemblyAssignment documentId="pr-or-b-co" />} />
          <Route path="/disc-br" exact element={<AssemblyAssignment documentId="disc-br" />} />
          <Route path="/discb-br" exact element={<AssemblyAssignment documentId="discb-br" />} />
          <Route path="/pr-or-br" exact element={<AssemblyAssignment documentId="pr-or-br" />} />
          <Route path="/pr-or-b-br" exact element={<AssemblyAssignment documentId="pr-or-b-br" />} />

          <Route path="/t-m" exact element={<AssemblyTransition documentId="t-m" />} />
          <Route path="/t-t" exact element={<AssemblyTransition documentId="t-t" />} />
          <Route path="/t-m-br" exact element={<AssemblyTransition documentId="t-m-br" />} />
          <Route path="/t-t-br" exact element={<AssemblyTransition documentId="t-t-br" />} />

          <Route path="/dashboard/Me" exact element={<DashboardMe />} />

          <Route path="*" exact element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}
