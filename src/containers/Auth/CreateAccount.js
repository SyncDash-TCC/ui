import React, {useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {Link as LinkRouter} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {useDispatch} from "react-redux";
import api from "../../axios";
import InputPassword from "../../components/Input/InputPassword";
import { GRAY_LABEL_UX, RED_ERROR_UX, styleYellowButton, GRAY_BORDER_TABLE, SECONDARY, PRIMARY } from "../../shared/utils";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { showSnackMessage } from "../../actions/SnackActions";
import logo from "../../assets/files/logo.png";


const CreateAccount = () => {

    const nav = useNavigate();

    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [userWithSameName, setUserWithSameName] = useState(false);


    const handleSubmit = () => {
        if (password !== confirmPassword) {
            setPasswordMatchError(true);
            return;
        }
        const data = {
            username: name,
            password,
        };
        api.CreateAccount(data).then(() => {
            dispatch(showSnackMessage({message: "Conta criada com sucesso!", severity: "success"}));
            nav("/login");
        }).catch(error => {
            if (error.response.status === 409) {
                setUserWithSameName(true);
                dispatch(showSnackMessage({message: "Já existe uma conta com esse nome!", severity: "error"}));
            } else if (error.response.status === 422) {
                dispatch(showSnackMessage({message: "Por favor, crie um nome sem caracteres especiais", severity: "error"}));
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
                paddingTop: "150px",
                flexDirection: "column",
            }}
        >
            <Box sx={{display: "flex", alignItems: "center", gap: 2, paddingY: 4}}>
                <img src={logo} alt="Logo" style={{height: "60px"}} />
            </Box>
            <Grid container sx={{backgroundColor: "white", width: "500px", borderRadius: 2, border: `1px solid ${GRAY_BORDER_TABLE}`, padding: 2, boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.2)"}}>
                <Grid item xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <p style={styles.header}>Crie uma conta</p>
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <h1 style={styles.text}>Insira um nome desejado e uma senha para realizar o acesso ao sistema</h1>
                </Grid>
                <Grid item xs={12}>
                    <Box component="form" sx={{ marginTop: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Nome"
                            autoComplete="nome"
                            autoFocus
                            onChange={(e) => {setName(e.target.value.trim());}}
                            value={name}
                            variant="filled"
                            size="small"
                            sx={{ width: "80%" }}
                        />
                        <InputPassword label="Senha" password={password} error={passwordError} handleChange={(e) => setPassword(e.target.value)} />
                        
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Confirme a Senha"
                            type="password"
                            variant="filled"
                            size="small"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setPasswordMatchError(false);
                            }}
                            sx={{ width: "80%" }}
                            error={passwordMatchError}
                        />
                        {passwordMatchError && (
                            <p style={{color: RED_ERROR_UX, fontSize: "14px"}}>
                                As senhas não coincidem!
                            </p>
                        )}
                        {passwordError && (
                            <p style={{color: RED_ERROR_UX, fontSize: "14px"}}>
                                O email ou senha informados estão incorretos!
                            </p>
                        )}
                        {userWithSameName && (
                            <p style={{color: RED_ERROR_UX, fontSize: "14px"}}>
                                Já existe uma conta com esse nome!
                            </p>
                        )}
                        <Grid container sx={{marginTop: 2, marginBottom: 2}}>
                            <Grid item xs={12} sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <LinkRouter to='/login' variant="body2" style={{textDecoration: "none", color: GRAY_LABEL_UX, fontWeight: "600", fontSize: "14px"}}>
                                    Já possui uma conta
                                </LinkRouter>
                            </Grid>
                        </Grid>
                        <React.Fragment>
                            {((name === "") || (password === "") || (confirmPassword === "")) ? (
                                <Button
                                    disabled
                                    data-testid="unabled-submit-button"
                                    fullWidth
                                    variant="contained"
                                    sx={{ ...styles.buttonSubmit }}
                                    style={{fontWeight: "600"}}
                                >
                                    Confirmar
                                </Button>
                            ) : (
                                <Button
                                    data-testid="submit-button"
                                    fullWidth
                                    variant="contained"
                                    sx={{ ...styles.buttonSubmit }}
                                    onClick={handleSubmit}
                                    style={styleYellowButton}
                                >
                                    Confirmar
                                </Button>
                            )}
                        </React.Fragment>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CreateAccount;

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
        color: "black",
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