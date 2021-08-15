import React from 'react'
import { UserContext } from '../contexts/UserContext'
import { Redirect } from "react-router-dom"

const AdminRoute = ({children}) => {

    const {activeUser} = React.useContext(UserContext)

    if (activeUser && activeUser.tipo === "Admin") return <>{children}</>
    else return <Redirect to="/"/>
}

export default AdminRoute
