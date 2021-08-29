import React from 'react'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import {Switch, Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import MyAccount from './pages/MyAccount';
import TeacherRoute from './routes/TeacherRoute';
import Adds from './pages/Adds';
import AdminRoute from './routes/AdminRoute';
import Groups from './pages/Groups';
import EditSubjectTeacher from './pages/EditSubjectTeacher';
import Users from './pages/Users';
import CreateUser from './pages/CreateUser';
import AdminProvider from './contexts/AdminContext';
import SeeUser from './pages/SeeUser';
import MyActivities from './pages/MyActivities';
import EditActivities from './pages/EditActivities';
import GroupActivities from './pages/GroupActivities';
import Emails from './pages/Emails';
import './App.css'

function App() {
  return (
    <div className="App">
      
      {/* NAVBAR */}
      <Navbar/>

      {/* CONTAINER */}
      <div className="container">
        <Switch>

          {/* -------------- NO AUTH -------------- */}
          <Route path="/" exact component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/adds" component={Adds}/>
          <Route path="/emails" component={Emails}/>
          <Route path="/myaccount" component={MyAccount}/>

          {/* -------------- TEACHERS ROUTE -------------- */}
          <Route path="/teacher">
            <TeacherRoute>

              {/* MY ACTIVITIES */}
              <Route path="/teacher/myactivities">
                <MyActivities/>
              </Route>

              {/* EDIT ACTIVITIES */}
              <Route path="/teacher/editactivities/:group/:subject/:period/:week">
                <EditActivities/>
              </Route>

            </TeacherRoute> 
          </Route>

          {/* -------------- ADMIN ROUTE -------------- */}
          <Route path="/admin">
            <AdminRoute>
              <AdminProvider>

                {/* GROUPS */}
                <Route path="/admin/groups">
                  <Groups/>
                </Route>

                {/* EDIT SUBJECT TEACHER */}
                <Route path="/admin/editsubjectteacher/:group/:subject/:teacher">
                  <EditSubjectTeacher/>
                </Route>

                {/* USERS */}
                <Route path="/admin/users">
                  <Users/>
                </Route>

                {/* CREATE USER */}
                <Route path="/admin/createuser">
                  <CreateUser/>
                </Route>

                {/* SEE USER */}
                <Route path="/admin/user/:username">
                  <SeeUser/>
                </Route>

                {/* GROUP ACTIVITIES */}
                <Route path="/admin/groupactivities">
                  <GroupActivities/>
                </Route>

              </AdminProvider>
            </AdminRoute> 
          </Route>

        </Switch>
      </div>

      {/* FOOTER */}
      <Footer/>
    </div>
  );
}

export default App;