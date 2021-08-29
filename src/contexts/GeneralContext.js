import React from 'react'
import InitialDataError from '../components/InitialDataError'
import {db} from "../firebase"
import dateFormat from "dateformat"

export const GeneralContext = React.createContext()

const GeneralProvider = ({children}) => {

    // STATIC VARIABLES
    dateFormat.i18n = {
        dayNames: [
          "Dom",
          "Lun",
          "Mar",
          "Mie",
          "Jue",
          "Vie",
          "Sab",
          "Domingo",
          "Lunes",
          "Martes",
          "Miércoles",
          "Jueves",
          "Viernes",
          "Sábado",
        ],
        monthNames: [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Ago",
          "Sep",
          "Oct",
          "Nov",
          "Dic",
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ]
    };

    const [adds, setAdds] = React.useState([])
    const [all_users, set_all_users] = React.useState([])
    const [loadedInitialData, setLoadedInitialData] = React.useState(false)
    const [errorInitialData, setErrorInitialData] = React.useState(false)

    const all_groups = ["1A", "1B", "1C", "1D", "1E","1F", "1G", "1H",
                        "2A", "2B", "2C", "2D", "2E","2F", "2G", "2H",
                        "3A", "3B", "3C", "3D", "3E","3F", "3G", "3H"]

    const groups_to_subjects = {

        // PRIMEROS
        "1A": ["Tutoría", "Artes", "Historia", "Matemáticas", "Español", "FC y E", "Vida Saludable", 
                "Edu Física", "Inglés", "Biología", "Geografía", "Mecánica", "Ind del Vestido", "Robótica", "Carpintería", "Informática"],
        
        "1B": ["Tutoría", "Artes", "Historia", "Matemáticas", "Español", "FC y E", "Vida Saludable", 
                "Edu Física", "Inglés", "Biología", "Geografía", "Mecánica", "Ind del Vestido", "Robótica", "Carpintería", "Informática"],
        
        "1C": ["Tutoría", "Artes", "Historia", "Matemáticas", "Español", "FC y E", "Vida Saludable", 
                "Edu Física", "Inglés", "Biología", "Geografía", "Mecánica", "Ind del Vestido", "Robótica", "Carpintería", "Informática"],

        "1D": ["Tutoría", "Artes", "Historia", "Matemáticas", "Español", "FC y E", "Vida Saludable", 
                "Edu Física", "Inglés", "Biología", "Geografía", "Mecánica", "Ind del Vestido", "Robótica", "Carpintería", "Informática"],
        
        "1E": ["Tutoría", "Artes", "Historia", "Matemáticas", "Español", "FC y E", "Vida Saludable", 
                "Edu Física", "Inglés", "Biología", "Geografía", "Mecánica", "Ind del Vestido", "Robótica", "Carpintería", "Informática"],

        "1F": ["Tutoría", "Artes", "Historia", "Matemáticas", "Español", "FC y E", "Vida Saludable", 
                "Edu Física", "Inglés", "Biología", "Geografía", "Mecánica", "Ind del Vestido", "Robótica", "Carpintería"],
        
        "1G": ["Tutoría", "Artes", "Historia", "Matemáticas", "Español", "FC y E", "Vida Saludable", 
                "Edu Física", "Inglés", "Biología", "Geografía", "Mecánica", "Ind del Vestido", "Robótica", "Carpintería"],
        
        "1H": ["Tutoría", "Artes", "Historia", "Matemáticas", "Español", "FC y E", "Vida Saludable", 
                "Edu Física", "Inglés", "Biología", "Geografía", "Mecánica", "Ind del Vestido", "Robótica", "Carpintería"],

        // SEGUDOS
        "2A": ["Tutoría", "Artes", "Historia", "Matemáticas", "Español", "FC y E", "Vida Saludable", 
                "Edu Física", "Inglés", "Física", "Mecánica", "Ind del Vestido", "Robótica", "Carpintería", "Informática"],
        
        "2B": ["Tutoría", "Artes", "Historia", "Matemáticas", "Español", "FC y E", "Vida Saludable", 
                "Edu Física", "Inglés", "Física", "Mecánica", "Ind del Vestido", "Robótica", "Carpintería", "Informática"],
        
        "2C": ["Tutoría", "Artes", "Historia", "Matemáticas", "Español", "FC y E", "Vida Saludable", 
                "Edu Física", "Inglés", "Física", "Mecánica", "Ind del Vestido", "Robótica", "Carpintería", "Informática"],

        "2D": ["Tutoría", "Artes", "Historia", "Matemáticas", "Español", "FC y E", "Vida Saludable", 
                "Edu Física", "Inglés", "Física", "Mecánica", "Ind del Vestido", "Robótica", "Carpintería", "Informática"],
        
        "2E": ["Tutoría", "Artes", "Historia", "Matemáticas", "Español", "FC y E", "Vida Saludable", 
                "Edu Física", "Inglés", "Física", "Mecánica", "Ind del Vestido", "Robótica", "Carpintería", "Informática"],

        "2F": ["Tutoría", "Artes", "Historia", "Matemáticas", "Español", "FC y E", "Vida Saludable", 
                "Edu Física", "Inglés", "Física", "Mecánica", "Ind del Vestido", "Robótica", "Carpintería"],

        "2G": ["Tutoría", "Artes", "Historia", "Matemáticas", "Español", "FC y E", "Vida Saludable", 
                "Edu Física", "Inglés", "Física", "Mecánica", "Ind del Vestido", "Robótica", "Carpintería"],

        "2H": ["Tutoría", "Artes", "Historia", "Matemáticas", "Español", "FC y E", "Vida Saludable", 
                "Edu Física", "Inglés", "Física", "Mecánica", "Ind del Vestido", "Robótica", "Carpintería"],

        // TERCEROS
        "3A": ["Tutoría", "Artes", "Historia", "Matemáticas", "Español", "FC y E", "Vida Saludable", 
                "Edu Física", "Inglés", "Química", "Mecánica", "Ind del Vestido", "Robótica", "Carpintería", "Informática"],
        
        "3B": ["Tutoría", "Artes", "Historia", "Matemáticas", "Español", "FC y E", "Vida Saludable", 
                "Edu Física", "Inglés", "Química", "Mecánica", "Ind del Vestido", "Robótica", "Carpintería", "Informática"],
        
        "3C": ["Tutoría", "Artes", "Historia", "Matemáticas", "Español", "FC y E", "Vida Saludable", 
                "Edu Física", "Inglés", "Química", "Mecánica", "Ind del Vestido", "Robótica", "Carpintería", "Informática"],

        "3D": ["Tutoría", "Artes", "Historia", "Matemáticas", "Español", "FC y E", "Vida Saludable", 
                "Edu Física", "Inglés", "Química", "Mecánica", "Ind del Vestido", "Robótica", "Carpintería", "Informática"],
        
        "3E": ["Tutoría", "Artes", "Historia", "Matemáticas", "Español", "FC y E", "Vida Saludable", 
                "Edu Física", "Inglés", "Química", "Mecánica", "Ind del Vestido", "Robótica", "Carpintería", "Informática"],

        "3F": ["Tutoría", "Artes", "Historia", "Matemáticas", "Español", "FC y E", "Vida Saludable", 
                "Edu Física", "Inglés", "Química", "Mecánica", "Ind del Vestido", "Robótica", "Carpintería"],

        "3G": ["Tutoría", "Artes", "Historia", "Matemáticas", "Español", "FC y E", "Vida Saludable", 
                "Edu Física", "Inglés", "Química", "Mecánica", "Ind del Vestido", "Robótica", "Carpintería"],

        "3H": ["Tutoría", "Artes", "Historia", "Matemáticas", "Español", "FC y E", "Vida Saludable", 
                "Edu Física", "Inglés", "Química", "Mecánica", "Ind del Vestido", "Robótica", "Carpintería"]
    }

    const weeks = {
        "1er Periodo": ["S1- 30 de Ago al 03 de Sept de 2021",
                        "S2- 06 al 10 de Sept de 2021",
                        "S3- 13 al 17 de Sept de 2021",
                        "S4- 20 al 24 de Sept de 2021",
                        "S5- 27 de Sept al 01 de Oct de 2021",
                        "S6- 04 al 08 de Oct de 2021",
                        "S7- 11 al 15 de Oct de 2021",
                        "S8- 18 al 22 de Oct de 2021",
                        "S9- 25 al 28 de Oct de 2021",
                        "S10- 03 al 05 de Nov de 2021",
                        "S11- 08 al 12 de Nov de 2021",
                        "S12- 16 al 19 de Nov de 2021",
                        "S13- 22 al 25 de Nov de 2021"],

        "2do Periodo": ["S14- 29 de Nov al 03 de Dic de 2021",
                        "S15- 06 al 10 de Dic de 2021",
                        "S16- 13 al 17 de Dic de 2021",
                        "S17- 03 al 07 de Ene de 2022",
                        "S18- 10 al 14 de Ene de 2022",
                        "S19- 17 al 21 de Ene de 2022",
                        "S20- 24 al 27 de Ene de 2022",
                        "S21- 31 de Ene al 04 de Feb de 2022",
                        "S22- 08 al 11 de Feb de 2022",
                        "S23- 14 al 18 de Feb de 2022",
                        "S24- 21 al 24 de Feb de 2022",
                        "S25- 28 de Feb al 04 de Mar de 2022",
                        "S26- 07 al 11 de Mar de 2022",
                        "S27- 14 al 18 de Mar de 2022",
                        "S28- 22 al 24 de Mar de 2022"],

        "3er Periodo": ["S29- 28 de Mar al 01 de Abr de 2022",
                        "S30- 04 al 08 de Abr de 2022",
                        "S31- 25 al 28 de Abr de 2022",
                        "S32- 02 al 06 de May de 2022",
                        "S33- 09 al 13 de May de 2022",
                        "S34- 16 al 20 de May de 2022",
                        "S35- 23 al 26 de May de 2022",
                        "S36- 30 de May al 03 de Jun de 2022",
                        "S37- 06 al 10 de Jun de 2022",
                        "S38- 13 al 17 de Jun de 2022",
                        "S39- 20 al 23 de Jun de 2022",
                        "S40- 27 de Jun al 01 de Jul de 2022",
                        "S41- 04 al 08 de de Jul de 2022",
                        "S42- 11 al 15 de Jul de 2022",
                        "S43- 18 al 22 de Jul de 2022",
                        "S44- 25 al 27 de Jul de 2022"]
    }

    // FIND ACTIVITIES
    async function findActivities(mode, group, subject, period, week){
        // Null data
        const null_activities = {
                act1: "No hay actividad registrada",
                act2: "No hay actividad registrada",
                act3: "No hay actividad registrada",
                maestro: "No disponible",
                grupo: group,
                materia: subject,
                periodo: period,
                semana: week
        }

        try{
            // Search for document in DB    
            const res = await db.collection(group).doc(subject).collection(period).doc(week).get()

            // If document doesnt exists return false and null
            if (!res.exists) return null_activities

            // If mode teacher then create data with the params of the filter
            if (mode === "teacher"){
                const filter_data_activities = {
                    act1: res.data().act1,
                    act2: res.data().act2,
                    act3: res.data().act3,
                    maestro: res.data().maestro,
                    grupo: group,
                    materia: subject,
                    periodo: period,
                    semana: week
                }
                return filter_data_activities
            }

            // If mode student return params from DB
            else if (mode === "student") return res.data()
            else return res.data()
        }
        catch(error){
            console.log("FIND ACTIVITIES ERROR:", error)
            alert("Hubo un error cargando las actividades.")
            return null_activities
        }
    }

    // GET INITIAL DATA
	async function getInitialData(){
        try{
			// Get adds
            const res_adds = await db.collection("Datos Iniciales").doc("Avisos").get()
			const adds = Object.entries(res_adds.data())
			const sorted_adds =  adds.sort((a, b) => {
				// a[0] = id   a[1] = data
				if (a[1].date > b[1].date) return -1
				if (a[1].date < b[1].date) return 1
				return 0
			})
			setAdds(sorted_adds)

			// Get users
			const res_users = await db.collection("Datos Iniciales").doc("Usuarios").get()
			const users = Object.entries(res_users.data())
			const sorted_users =  users.sort((a, b) => {
				// a[0] = nombre   a[1] = data
				if (a[0] > b[0]) return 1
				if (a[0] < b[0]) return -1
				return 0
			})
			set_all_users(sorted_users)

            setErrorInitialData(false)
            setLoadedInitialData(true)
        }
        catch(error){
            console.log("GET INITIAL DATA ERROR:", error)
            setErrorInitialData(true)
            setLoadedInitialData(true)
        }
    }

    // USE EFFECT
    React.useEffect(() => {
		getInitialData()
	}, [])

    return (

        // First load the data
        loadedInitialData ? 

            // If there are not errors
            !errorInitialData ?

            // Then load all the app
            <GeneralContext.Provider 
                value={{ all_groups, groups_to_subjects, weeks, findActivities, adds, setAdds, getInitialData, all_users, set_all_users }}>
                {children}
            </GeneralContext.Provider>

            // Else render error
            : <InitialDataError/>

        // Render loading
        : <p style={{fontFamily: "Roboto", padding: "15px"}}>Loading...</p>
    )
}

export default GeneralProvider
