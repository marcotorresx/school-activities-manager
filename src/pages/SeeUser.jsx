import React from 'react'
import { GeneralContext } from '../contexts/GeneralContext'
import {useParams} from "react-router-dom"

const SeeUser = () => {

    const {username} = useParams()
    const {all_users} = React.useContext(GeneralContext)
    const [user, setUser] = React.useState("")

    // USE EFFECT
    React.useEffect(() => {
        console.log("ALL", all_users)
        const cleaned_username = username.replace("%20", " ")
        all_users.forEach(user_item => {
            if (user_item.nombre === cleaned_username) console.log(user_item)
        })
    }, [])

    return (
        <div>
            SEE USER
        </div>
    )
}

export default SeeUser
