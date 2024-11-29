import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography, Button, Box, List, ListItem, ListItemText, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import FormIcon from "@mui/icons-material/Description";
import planilha from "../../assets/files/planilha_syncdash_atualizado.xlsx";
import api from "../../axios";
import { showSnackMessage } from "../../actions/SnackActions";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useNavigate } from "react-router-dom";
import { GRAY_BG_UX } from "../../shared/utils";


const Inicial = () => {

    const formRef = useRef(null);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const hiddenFileInput = React.useRef(null); 
    const name = useSelector(state => state.AuthReducer.name);

    const [showForm, setShowForm] = useState(false);

    const [dataVenda, setDataVenda] = useState('');
    const [dataPagamento, setDataPagamento] = useState('');
    const [valorBruto, setValorBruto] = useState('');
    const [valorLiquido, setValorLiquido] = useState('');
    const [taxa, setTaxa] = useState('');
    const [formaPagamento, setFormaPagamento] = useState('');
    const [nomeProduto, setNomeProduto] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);

    const [categoria, setCategoria] = useState();

    useEffect(() => {
        if (showForm) {
            formRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [showForm]);

    const openForm = () => {
        setShowForm(!showForm);
    };

    const isFormValid = () => {
        const isValorBrutoValid = !isNaN(parseFloat(valorBruto.replace(',', '.'))) && valorBruto.trim() !== '';
        const isValorLiquidoValid = !isNaN(parseFloat(valorLiquido.replace(',', '.'))) && valorLiquido.trim() !== '';
        const isTaxaValid = !isNaN(parseFloat(taxa.replace(',', '.'))) && taxa.trim() !== '';
        const isFormaPagamentoValid = formaPagamento.trim() !== '';
        const isNomeProdutoValid = /^[A-Za-zÀ-ÿ\s]+$/.test(nomeProduto.trim());
        const isCategoriaValid = categoria && categoria.trim()

        return isNomeProdutoValid && isCategoriaValid && dataVenda && dataPagamento && isValorBrutoValid && isValorLiquidoValid && isTaxaValid && isFormaPagamentoValid;
    };

    const postFormulario = () => {
        const dataResquest = {
            nome_produto: nomeProduto,
            data_venda: dataVenda,
            data_pagamento: dataPagamento,
            valor_bruto: valorBruto,
            valor_liquido: valorLiquido,
            taxa: taxa,
            forma_pagamento: formaPagamento,
            categoria: categoria
        };
        api.PostPlanilha(dataResquest).then(() => {
            dispatch(showSnackMessage({message: "Dados inseridos com sucesso!", severity: "success"}));
            setDataVenda('');
            setDataPagamento('');
            setValorBruto('');
            setValorLiquido('');
            setTaxa('');
            setFormaPagamento('');
            nav("/dashboard");
        }).catch(() => {
            setDataVenda('');
            setDataPagamento('');
            setValorBruto('');
            setValorLiquido('');
            setTaxa('');
            setFormaPagamento('');
            dispatch(showSnackMessage({message: "Erro ao enviar os dados! Por favor tente novamente", severity: "error"}));
        });
    }

    const formaPagamentoOptions = [
        { value: "Crédito", label: "Crédito" },
        { value: "Débito", label: "Débito" },
        { value: "Pix", label: "Pix" },
        { value: "Boleto", label: "Boleto" },
    ];

    const categorias = [
        { value: "Alimentos e Bebidas", label: "Alimentos e Bebidas" },
        { value: "Roupas e Acessórios", label: "Roupas e Acessórios" },
        { value: "Eletrônicos", label: "Eletrônicos" },
        { value: "Móveis e Decoração", label: "Móveis e Decoração" },
        { value: "Beleza e Cuidados Pessoais", label: "Beleza e Cuidados Pessoais" },
        { value: "Saúde e Bem-Estar", label: "Saúde e Bem-Estar" },
        { value: "Brinquedos e Jogos", label: "Brinquedos e Jogos" },
        { value: "Serviços", label: "Serviços" },
    ];

    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    const changeHandler = (event) => {
        let file = event.target.files[0];
        setSelectedFile(file);
        setIsSelected(true);
    };

    const sendPlanilha = () => {
        const formData = new FormData();
        formData.append("selected_file", selectedFile);        

        api.SendUploadPlanilha(formData).then(() => {
            dispatch(showSnackMessage({ message: "Sua planilha foi carregada com sucesso!" }));
            setSelectedFile(null);
            setIsSelected(false);
            nav("/dashboard");
        }).catch((error) => {
            if (error.response.status === 400 && error.response.data) {
                dispatch(showSnackMessage({ message: `Error encontrado: ${error.response.data}`, severity: "error" }));
            }
            else {
                dispatch(showSnackMessage({ message: "Algo deu errado! Tente novamente mais tarde", severity: "error" }));
            }
        });
    }

    return (
        <div className="main">
            <h1>Início</h1>
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
                        paddingX: "50px"
                    }}
                >
                    <Typography variant="h4" gutterBottom color="black" sx={{ fontWeight: '600' }}>
                        Olá, {name} 👋 Seja bem-vindo ao nosso sistema!
                    </Typography>

                    <Typography variant="body1" color="gray" paragraph sx={{marginBottom: 4}}>
                        Para que possamos gerar gráficos e explorar todas as funcionalidades, 
                        faça o download da planilha abaixo e preencha com os dados de vendas do mês desejado.
                        Ou, se preferir, preencha o formulário com os dados de venda diária.
                    </Typography>
                    {
                        isSelected &&
                            <Grid container xs={12} sx={{display: "flex",flexWrap: "nowrap", alignItems: "center", justifyContent: "center", marginBottom: 5}}>
                                <Grid item xs={12} style={{...styles.styleFieldImport, display: "flex", flexDirection: "column", gap: 5, marginBottom: "20px"}}>
                                    <span style={{fontWeight: "bold"}}>Nome do arquivo selecionado:</span>
                                    <span>{selectedFile.name}</span>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button 
                                        variant="contained"
                                        size="small" 
                                        startIcon={<FileUploadIcon />} 
                                        sx={{ marginBottom: 2, width: "250px", backgroundColor: "#FF5E1E" }}
                                        onClick={() => sendPlanilha()}
                                    >
                                        ENVIAR PLANILHA
                                    </Button>
                                </Grid>
                            </Grid>
                    }
                    <Grid container xs={8} sx={{display: "flex", gap: 10}}>
                        <Grid item xs={12} sx={{boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.2)", borderRadius: 2, padding: "30px 15px",   backgroundColor: GRAY_BG_UX, border: "1px solid #D3D3D3"}}>
                            <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: "500", fontStyle: "italic" }} color="#FF5E1E">
                                Como devo preencher a planilha?
                            </Typography>
                            <List dense sx={{padding: 0, color: "black"}} >
                                <ListItem>
                                    <ListItemText primary="Nome do Produto ➔ nome dado ao produto vendido" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Data Venda ➔ Data da venda do produto." />
                                </ListItem>
                                <ListItem>
                                <   ListItemText primary="Data Pagamento ➔ Data na qual o pagamento foi realizado." />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Valor Bruto ➔ Valor bruto da venda." />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Valor Líquido ➔ Valor bruto - taxas." />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Taxa ➔ Taxa de comissões, taxa de entrega..." />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Forma de Pagamento ➔ Método usado para realizar o pagamento." />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Categoria ➔ Classificação usada para o produto" />
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 2}}>
                                <Button 
                                    variant="contained"
                                    size="small" 
                                    startIcon={<DownloadIcon />} 
                                    sx={{ width: "200px", backgroundColor: "#FF5E1E" }}
                                    href={planilha}
                                    download="planilha_syncdash.xlsx"
                                >
                                    Baixar Planilha
                                </Button>
                                <Button 
                                    variant="contained"
                                    size="small" 
                                    startIcon={<FormIcon />} 
                                    sx={{ width: "200px", backgroundColor: "#FF5E1E" }}
                                    onClick={() => openForm()}
                                >
                                    Formulário
                                </Button>
                                <Button 
                                    variant="contained"
                                    size="small" 
                                    startIcon={<AttachFileIcon />} 
                                    sx={{ width: "200px", backgroundColor: "#FF5E1E" }}
                                    onClick={() => handleClick()}
                                >
                                    Anexar
                                </Button>
                                <input 
                                    type="file"
                                    accept=".xls, .xlsx, .csv"
                                    ref={hiddenFileInput}
                                    onChange={changeHandler}
                                    style={{display: "none"}} 
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    {/* Formulário */}
                    {showForm && (
                        <Box ref={formRef} sx={{ marginTop: 11, textAlign: "left", boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.2)", borderRadius: 2, padding: "30px", backgroundColor: GRAY_BG_UX, width: "62%", border: "1px solid #D3D3D3" }}>
                            <Typography variant="h5" gutterBottom sx={{marginBottom: 3}} color="black">
                                Preencha os dados de vendas
                            </Typography>
                            <TextField
                                variant="filled"
                                label="Nome do produto"
                                fullWidth
                                sx={{ 
                                    marginBottom: 2,
                                    "& .MuiInputLabel-root": {
                                        color: "gray"
                                    }
                                }}
                                size="small"
                                required
                                value={nomeProduto}
                                onChange={(e) => setNomeProduto(e.target.value)}
                                inputProps={{ maxLength: 25 }}
                            />
                            <TextField 
                                label="Data Venda" 
                                type="date" 
                                fullWidth 
                                variant="filled" 
                                sx={{ 
                                    marginBottom: 2,
                                    "& .MuiInputLabel-root": {
                                        color: "gray"
                                    }
                                }}
                                InputLabelProps={{ shrink: true }}
                                size="small"
                                required
                                value={dataVenda}
                                onChange={(e) => setDataVenda(e.target.value)}
                            />
                            <TextField 
                                label="Data Pagamento" 
                                type="date" 
                                fullWidth 
                                variant="filled" 
                                sx={{ 
                                    marginBottom: 2,
                                    "& .MuiInputLabel-root": {
                                        color: "gray"
                                    }
                                }}
                                InputLabelProps={{ shrink: true }} 
                                size="small"
                                required
                                value={dataPagamento}
                                onChange={(e) => setDataPagamento(e.target.value)}
                            />
                            <TextField 
                                label="Valor Bruto" 
                                type="number" 
                                fullWidth 
                                variant="filled" 
                                sx={{ 
                                    marginBottom: 2,
                                    "& .MuiInputLabel-root": {
                                        color: "gray"
                                    }
                                }}
                                size="small"
                                required
                                value={valorBruto}
                                onChange={(e) => setValorBruto(e.target.value)}
                            />
                            <TextField 
                                label="Valor Líquido" 
                                type="number" 
                                fullWidth 
                                variant="filled" 
                                sx={{ 
                                    marginBottom: 2,
                                    "& .MuiInputLabel-root": {
                                        color: "gray"
                                    }
                                }}
                                size="small"
                                required
                                value={valorLiquido}
                                onChange={(e) => setValorLiquido(e.target.value)}
                            />
                            <TextField 
                                label="Taxa" 
                                type="number" 
                                fullWidth 
                                variant="filled" 
                                sx={{ 
                                    marginBottom: 2,
                                    "& .MuiInputLabel-root": {
                                        color: "gray"
                                    }
                                }}
                                size="small"
                                required
                                value={taxa}
                                onChange={(e) => setTaxa(e.target.value)}
                            />
                            <FormControl fullWidth variant="filled" sx={{ marginBottom: 2 }} size="small" required>
                                <InputLabel id="forma-pagamento-label" sx={{color: "gray"}}>Forma de Pagamento</InputLabel>
                                <Select
                                    labelId="forma-pagamento-label"
                                    value={formaPagamento}
                                    onChange={(e) => setFormaPagamento(e.target.value)}
                                    label="Forma de Pagamento"
                                >
                                    {formaPagamentoOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth variant="filled" sx={{ marginBottom: 2 }} size="small" required>
                                <InputLabel id="forma-pagamento-label" sx={{color: "gray"}}>Categoria do produto</InputLabel>
                                <Select
                                    labelId="forma-pagamento-label"
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                    label="Categoria do produto"
                                >
                                    {categorias.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button 
                                variant="contained" 
                                sx={{backgroundColor: "#FF5E1E"}}
                                size="small" 
                                disabled={!isFormValid()}
                                onClick={postFormulario}
                            >
                                Enviar
                            </Button>
                        </Box>
                    )}
                </Grid>
            </Grid>
        </div>
    );
}

export default Inicial;

const styles = {
    styleFieldImport: {
        color : "gray",
    },
};