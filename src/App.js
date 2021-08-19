import React from 'react'
import './App.css'
import { makeStyles } from '@material-ui/core/styles';
import { Container } from "@material-ui/core"
import Navbar from "./components/Navbar"
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

// STYLES
const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "Top",
    alignItems: "center",
    padding: "20px 40px"
  }
});

// COMPONENT
function App() {

  const classes = useStyles()

  return (
    <div className="App">
      {/* NAVBAR */}
      <Navbar/>

      {/* CONTAINER */}
      <Container className={classes.container}>
        <Switch>

          {/* -------------- NO AUTH -------------- */}
          <Route path="/" exact component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/adds" component={Adds}/>
          <Route path="/myaccount" component={MyAccount}/>

          {/* -------------- TEACHERS ROUTE -------------- */}
          <Route path="/teacher">
            <TeacherRoute>

              {/* MY ACTIVITIES */}
              <Route path="/teacher/myactivities">
                <MyActivities/>
              </Route>

              {/* EDIT ACTIVITIES */}
              <Route path="/teacher/editactivities/:group/:sub/:per/:wk">
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
                <Route path="/admin/editsubjectteacher/:group/:sub/:teach">
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

              </AdminProvider>
            </AdminRoute> 
          </Route>

        </Switch>
      </Container>
    </div>
  );
}

export default App;