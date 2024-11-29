import React, {useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {Link as LinkRouter} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {useDispatch} from "react-redux";
import api from "../../axios";
import {loginUser} from "../../actions/AuthActions";
import Loading from "../../components/Loading/Loading";
import InputPassword from "../../components/Input/InputPassword";
import { GRAY_LABEL_UX, PRIMARY, RED_ERROR_UX, styleYellowButton } from "../../shared/utils";
import "./Login.css";
import { showSnackMessage } from "../../actions/SnackActions";
import logo from "../../assets/files/logo.png";


const Login = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);


    const handleSubmit = () => {
        const data = {
            username: name,
            password,
        };
        setLoading(true);
        api.GetLogin(data).then(response => {
            let token = response.data.access_token;
            setLoading(false);
            dispatch(loginUser(token));
            window.location.reload();
        }).catch(error => {
            setLoading(false);
            if (error.response.status === 401 || error.response.status === 422) {
                setPasswordError(true);
                dispatch(showSnackMessage({message: "O nome ou a senha informados estão incorretos!", severity: "error"}));
            }
        });
    };

    return (
        <Box
            sx={{
                backgroundColor: PRIMARY,
                height: "100vh",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                paddingTop: "150px",
            }}
        >
            <Box sx={{display: "flex", alignItems: "center", gap: 2, paddingY: 4}}>
                <img src={logo} alt="Logo" style={{height: "60px"}} />
            </Box>
			<Grid container sx={{backgroundColor: "#ffffff", width: "500px", borderRadius: 2, padding: 2, 
                boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.2)"}}>
                <Grid item xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <p style={styles.header}>Entre em sua conta</p>
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <h1 style={styles.text}>Insira as credenciais fornecidas para realizar o acesso ao sistema</h1>
                </Grid>
                <Grid item xs={12}>
                    <Box component="form" sx={{ marginTop: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            size="small"
                            label="Nome"
                            autoComplete="nome"
                            autoFocus
                            onChange={(e) => {setName(e.target.value.trim());}}
                            value={name}
                            variant="filled"
                            sx={{ 
                                width: "80%",
                                "& .MuiFilledInput-root": {
                                    color: "black",
                                },
                                "& .MuiInputLabel-root": {
                                    color: "gray"
                                }
                            }}
                        />
                        <InputPassword label="Senha" password={password} error={passwordError} handleChange={(e) => setPassword(e.target.value)} />
                        {
                            passwordError && (
                                <p style={{color: RED_ERROR_UX, fontSize: "14px"}}>O email ou senha informados estão incorretos!</p>
                            )
                        }
                        <Grid container sx={{marginTop: 2, marginBottom: 2}}>
                            <Grid item xs={12} sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <LinkRouter to='/create_account' variant="body2" style={{textDecoration: "none", color: GRAY_LABEL_UX, fontWeight: "600", fontSize: "14px"}}>
                                    Criar uma conta
                                </LinkRouter>
                            </Grid>
                        </Grid>
                        {
                            loading ? (
                                <Loading />
                            ) : (
                                <React.Fragment>
                                    { ((name === "") || (password === "")) ? (
                                        <Button
                                            disabled
                                            data-testid="unabled-submit-button"
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ ...styles.buttonSubmit }}
                                            style={{fontWeight: "600", color: "gray"}}
                                        >
                                            Entrar
                                        </Button>
                                    ) : (
                                        <Button
                                            data-testid="submit-button"
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ ...styles.buttonSubmit }}
                                            onClick={() => handleSubmit()}
                                            style={styleYellowButton}
                                        >
                                            Entrar
                                        </Button>
                                    )
                                    }
                                </React.Fragment>
                            )
                        }
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Login;

const styles = {
    center: {
        width: "60%",
        marginLeft: "auto",
        marginRight: "auto",
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    logo: {
        userDrag: "none",
        userSelect: "none",
        pointerEvents: "none",
        width: "191px",
        height: "36px"
    },
    header: {
        width: "398px",
        height: "15px",
        fontWeight: "bold",
        fontSize: "36px",
        lineHeight: "32px",
        color: "black",
        textAlign: "center",
    },
    text: {
        width: "411px",
        height: "50px",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "16px",
        lineHeight: "20px",
        color: "gray",
        textAlign: "center",
    },
    copyright: {
        textAlign: "center",
        display: "flex",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "end",
        paddingBottom: "40px"
    },
    buttonSubmit: {
        marginTop: 3,
        marginBottom: 2,
        width: "80%",
    }
};