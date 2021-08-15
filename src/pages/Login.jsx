import React from 'react'
import {Avatar, Button, TextField, Typography} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'
import { UserContext } from '../contexts/UserContext'

// STYLES
const useStyles = makeStyles((theme) => ({
  paper: {
    width: "400px",
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "black",
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
      margin: "15px 0px 10px 0px"
  }
}));

// COMPONENT
const Login = () => {

    // VARIBALES
    const classes = useStyles()
    const {login} = React.useContext(UserContext)
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [error, setError] = React.useState(null)

    // CLICK HANDLER
    async function clickHandler(){
      
      // Validations
      if (email === "" || !email.trim() || password === "" || !password.trim()){
        setError("Debes llenar todos los campos.")
        return
      }
      if (!(email.includes("@") && email.includes("."))){
        setError("Tu correo no es válido.")
        return
      }
      setError(null)

      // login
      const error = await login(email, password)
      if (error){
        setError(error)
        return
      }

      // Clean
      setEmail("")
      setPassword("")
      setError(null)
    }

    return (
        <div className={classes.paper}>
            {/* HEADER */}
            <Avatar className={classes.avatar}><LockOutlinedIcon/></Avatar>
            <Typography component="h1" variant="h5">Ingresar</Typography>

            {/* FORM */}
            <form className={classes.form}>

                {/* ERROR */}
                {error && <Alert severity="error" className={classes.alert}>{error}</Alert>}

                {/* EMAIL */}
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Correo Electrónico"
                    name="email"
                    autoComplete="email"
                    type="email"
                    autoFocus
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                {/* PASSWORD */}
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                {/* BUTTON */}
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={clickHandler}
                >
                    Ingresar
                </Button>
            </form>
        </div>
    )
}

export default Login
