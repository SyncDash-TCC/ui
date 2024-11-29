import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Skeleton } from '@mui/material';
import { PRIMARY, WHITE_ESCRITA_THEME, BORDER_BUTTON } from '../../shared/utils';
import DescriptionIcon from '@mui/icons-material/Description';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import api from "../../axios";
import { useDispatch } from "react-redux";
import { showSnackMessage } from "../../actions/SnackActions";
import { useNavigate } from 'react-router-dom';


const Historico = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [historico, setHistorico] = useState([]);

    useEffect(() => {
        getHistorico();
    }, []);

    const getHistorico = async () => {
        setLoading(true);
        api.GetHistorico().then(response => {
            let data = response.data;
            setHistorico(data);
            setLoading(false);
            dispatch(showSnackMessage({message: "Dados carregados com sucesso!", severity: "success"}));
        }).catch(() => {
            setLoading(false);
            dispatch(showSnackMessage({message: "Algo deu errado!", severity: "error"}));
        })
    };

    const goPlanilha = (id, data, hora) => {
        navigate("/planilha", { state: { id, data, hora } });
    };

    const goDashboard = (id, data, hora) => {
        navigate("/dashboard", { state: { id, data, hora } });
    };

    return (
        <div className="main">
            <h1>Histórico</h1>
            {
                loading ? (
                    <React.Fragment>
                        <Box display="flex" flexDirection="row" gap={2} pt={2} width="100%" justifyContent="center">
                            <Skeleton variant="rectangular" width="20%" height={100} />
                            <Skeleton variant="rectangular" width="20%" height={100} />
                            <Skeleton variant="rectangular" width="20%" height={100} />
                        </Box>
                        <Box display="flex" flexDirection="row" gap={2} pt={2} width="100%" justifyContent="center">
                            <Skeleton variant="rectangular" width="20%" height={100} />
                            <Skeleton variant="rectangular" width="20%" height={100} />
                            <Skeleton variant="rectangular" width="20%" height={100} />
                        </Box>
                        <Box display="flex" flexDirection="row" gap={2} pt={2} width="100%" justifyContent="center">
                            <Skeleton variant="rectangular" width="20%" height={100} />
                            <Skeleton variant="rectangular" width="20%" height={100} />
                            <Skeleton variant="rectangular" width="20%" height={100} />
                        </Box>
                    </React.Fragment>
                ) : (
                    <Grid
                        container
                        justifyContent="center" 
                        alignItems="center"
                        sx={{ marginTop: 5 }}
                    >
                        <Grid 
                            item 
                            xs={12}
                            sx={{ 
                                textAlign: "center",
                                display: "flex",
                                gap: 2,
                                flexWrap: "wrap",
                                justifyContent: "center",
                                paddingX: "12%",
                                paddingY: "10px",
                            }}
                        >
                            <Typography variant="body1" color="gray" paragraph sx={{marginBottom: 4}}>
                                Listagem de planilhas enviadas, ordenadas por data de upload. Selecione uma planilha para visualizar os dados.
                            </Typography>
                            <Box sx={{display: "flex", gap: 2, width: "100%", flexWrap: "wrap", alignItems: "center", justifyContent: "center"}}>
                                {
                                    historico.map((item, index) => (
                                        <Box 
                                            key={index}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                flexDirection: "row",
                                                boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.2)",
                                                borderRadius: 2,
                                                border: "1px solid #D3D3D3",
                                                padding: 2,
                                                gap: 10
                                            }}
                                        >
                                            <Box>
                                                <Typography sx={{fontWeight: "normal", color: "black", fontSize: 13}}>
                                                    Data de upload:
                                                </Typography>
                                                <Typography sx={{fontWeight: "bold", color: PRIMARY, fontSize: 18}}>
                                                    {item.data}
                                                </Typography>
                                                <Typography sx={{fontWeight: "normal", color: "black", fontSize: 13}}>
                                                    {item.hora}
                                                </Typography>
                                            </Box>
                                            <Box item xs={12} sx={{ display: "flex", gap: 1 }}>
                                                <Box
                                                    sx={{
                                                        backgroundColor: WHITE_ESCRITA_THEME,
                                                        padding: 2,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        width: 10,
                                                        height: 10,
                                                        borderRadius: 1,
                                                        cursor: "pointer",
                                                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                                                        "&:hover": {
                                                            transform: "scale(1.1)",
                                                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                                                            backgroundColor: "#FF5E1E",
                                                        },
                                                    }}
                                                    onClick={() => goPlanilha(item.id, item.data, item.hora)}
                                                >
                                                    <DescriptionIcon style={{ color: PRIMARY }} />
                                                </Box>
                                                <Box
                                                    sx={{
                                                        backgroundColor: WHITE_ESCRITA_THEME,
                                                        padding: 2,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        width: 10,
                                                        height: 10,
                                                        borderRadius: 1,
                                                        cursor: "pointer",
                                                        transition: "all 0.2s ease",
                                                        "&:hover": {
                                                            transform: "scale(1.1)",
                                                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                                                            backgroundColor: "#FF5E1E",
                                                        },
                                                    }}
                                                    onClick={() => goDashboard(item.id, item.data, item.hora)}
                                                >
                                                    <LeaderboardIcon sx={{ color: PRIMARY }} />
                                                </Box>
                                            </Box>
                                        </Box>
                                    ))
                                }
                            </Box>
                        </Grid>
                    </Grid>
                )
            }
        </div>
    )
};

export default Historico;