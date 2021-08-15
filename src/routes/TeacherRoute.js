import React from 'react'
import { UserContext } from "../contexts/UserContext"
import { Redirect } from "react-router-dom"

const TeacherRoute = ({children}) => {

    const {activeUser} = React.useContext(UserContext)

    if (activeUser && activeUser.tipo === "Maestro") return <>{children}</>
    else return <Redirect to="/"/>

}

export default TeacherRoute
