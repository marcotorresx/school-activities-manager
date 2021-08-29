import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core';

// STYLES
const useStyles = makeStyles({
    container: {
        display: "flex",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center"
    },
    alert: {
        width: "500px"
    }
})

const InitialDataError = () => {

    const classes = useStyles();
    
    return (
        <div className={classes.container}>
            <Alert severity="error" className={classes.alert}>
                <AlertTitle>Error al cargar datos iniciales</AlertTitle>
                La página ha llegado al límite de busquedas diarias, por favor intentalo mañana.
            </Alert>
        </div>
    )
}

export default InitialDataError
