import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Grid, Modal } from "@mui/material";
import { showSnackMessage } from "../../actions/SnackActions";
import { Skeleton, Button, Box, Autocomplete, TextField, Typography, MenuItem, InputLabel, Select, FormControl } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import api from "../../axios";
import { PRIMARY, localeText, styleModal } from "../../shared/utils";
import { useLocation, useNavigate } from "react-router-dom";


const Planilha = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    let id_historico = location?.state?.id || null;
    const data = location?.state?.data || null;
    const hora = location?.state?.hora || null;
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [nomeProduto, setNomeProduto] = useState("");
    const [dataVenda, setDataVenda] = useState("");
    const [dataPagamento, setDataPagamento] = useState("");
    const [valorBruto, setValorBruto] = useState("");
    const [valorLiquido, setValorLiquido] = useState("");
    const [taxa, setTaxa] = useState("");
    const [formaPagamento, setFormaPagamento] = useState("");
    const [categoria, setCategoria] = useState();
    const [idLine, setIdLien] = useState(0);
    
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

    useEffect(() => {
        getPlanilhaDetail()
    }, []);

    const getPlanilhaDetail = async (clear=false) => {
        setLoading(true);
        let dates_formatted = selectedOptions.map((date) => date.value);
        const dataRequest = {
            date_selected: clear ? null : dates_formatted
        };
        if (!clear && id_historico) {
            dataRequest.id_historico = id_historico;
        }
        api.GetPlanilhaDetail(dataRequest).then(response => {
            let data = response.data;
            setRows(data.planilhas);
            let dates = data.dates.map((date) => ({label: date, value: date}));
            let dates_selected = data.date_selected.map((date) => ({label: date, value: date}));
            setOptions(dates);
            setSelectedOptions(dates_selected);
            dispatch(showSnackMessage({message: "Dados carregados com sucesso!", severity: "success"}));
            setLoading(false);
        }).catch(() => {
            setLoading(false);
            dispatch(showSnackMessage({message: "Algo deu errado!", severity: "error"}));
        })
    };

    const updateVenda = async () => {
        const dataRequest = {
            id: idLine,
            nome_produto: nomeProduto,
            data_venda: dataVenda,
            data_pagamento: dataPagamento,
            valor_bruto: valorBruto,
            valor_liquido: valorLiquido,
            taxa: taxa,
            forma_pagamento: formaPagamento,
            categoria_produto: categoria,
        }
        api.UpdateVenda(dataRequest).then(() => {
            setOpen(false);
            getPlanilhaDetail();
            dispatch(showSnackMessage({message: "Dados atualizados com sucesso!", severity: "success"}))
        }).catch(() => {
            dispatch(showSnackMessage({message: "Algo deu errado! Por favor, tente novamente", severity: "error"}))
        })
    }

    const isFormValid = () => {
        const isValorBrutoValid = !isNaN(parseFloat(valorBruto)) && valorBruto !== '';
        const isValorLiquidoValid = !isNaN(parseFloat(valorLiquido)) && valorLiquido !== '';
        const isTaxaValid = !isNaN(parseFloat(taxa)) && taxa !== '';
        const isFormaPagamentoValid = formaPagamento !== '';
        const isCategoriaValid = categoria && categoria.trim()

        return nomeProduto && isCategoriaValid && dataVenda && dataPagamento && isValorBrutoValid && isValorLiquidoValid && isTaxaValid && isFormaPagamentoValid;
    };

    const columns = [
        { 
            field: "data_venda",
            headerName: "Data venda",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "data_pagamento",
            headerName: "Data pagamento",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "valor_bruto",
            headerName: "Valor bruto",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "valor_liquido",
            headerName: "Valor líquido",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "taxa",
            headerName: "Taxa",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "forma_pagamento",
            headerName: "Forma pagamento",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "nome_produto",
            headerName: "Produto",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "categoria_produto",
            headerName: "Categoria",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
    ];

    const handleBack = () => {
        navigate("/planilha", { replace: true });
        getPlanilhaDetail(true);
    };

    const handleCellClick = (params) => {
        let valorLiquido = parseFloat(
            params.row.valor_liquido
                .replace("R$", "")
                .trim()
                .replace(".", "") 
                .replace(",", ".")
        );
        let valorBruto = parseFloat(
            params.row.valor_bruto
                .replace("R$", "")
                .trim()
                .replace(".", "") 
                .replace(",", ".")
        );
        let taxa = parseFloat(
            params.row.taxa
                .replace("R$", "")
                .trim()
                .replace(".", "") 
                .replace(",", ".")
        )
        let dataPagamento = params.row.data_pagamento;
        let dataPagamentoFormatted = dataPagamento.split("/").reverse().join("-");
        let dataVenda = params.row.data_venda;
        let dataVendaFormatted = dataVenda.split("/").reverse().join("-");
        setNomeProduto(params.row.nome_produto);
        setTaxa(taxa);
        setCategoria(params.row.categoria_produto);
        setDataPagamento(dataPagamentoFormatted);
        setDataVenda(dataVendaFormatted);
        setFormaPagamento(params.row.forma_pagamento);
        setValorBruto(valorBruto);
        setValorLiquido(valorLiquido);
        setIdLien(params.row.id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="main">
            <h1>
                Planilha
                {
                    id_historico && (
                        <Typography sx={{fontWeight: "normal", color: PRIMARY}}>
                            Dados do histórico ({data} - {hora})
                        </Typography>
                    )
                }
            </h1>
            {
                loading ? (
                    <React.Fragment>
                        <Box display="flex" flexDirection="row" justifyContent="center" sx={{marginTop: 10}}>
                            <Skeleton variant="rectangular" width="76%" height={600} />
                        </Box>
                    </React.Fragment>
                ) : (
                    <Grid
                        container
                        justifyContent="center" 
                        alignItems="center"
                        sx={{ marginTop: 5 }}
                    >
                        <Modal 
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={styleModal}>
                                <Typography sx={{fontWeight: "bold", fontSize: 22, marginBottom: 4}}>
                                    Alterar dados de venda
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
                                <Box sx={{display: "flex", justifyContent: "end", gap: 2, marginTop: 4}}>
                                    <Button 
                                        variant="contained" 
                                        sx={{backgroundColor: "#FF5E1E", height: "30.75px", paddingX: "20px"}}
                                        size="small" 
                                        onClick={() => setOpen(false)}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button 
                                        variant="contained" 
                                        sx={{backgroundColor: "#FF5E1E", height: "30.75px", paddingX: "20px"}}
                                        size="small"
                                        disabled={!isFormValid()}
                                        onClick={() => updateVenda()}
                                    >
                                        Salvar
                                    </Button>
                                </Box>
                            </Box>
                        </Modal>
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
                            <Box sx={{ width: "40%", marginBottom: 4, display: "flex", gap: 2, alignItems: "center", justifyContent: "center", flex: 1, flexWrap: "wrap"}}>
                                <Autocomplete
                                    multiple
                                    id="size-small-filled"
                                    size="small"
                                    options={options}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, newValue) => {setSelectedOptions(newValue)}}
                                    defaultValue={selectedOptions}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Período" variant="filled" placeholder="Selecione" />
                                    )}
                                    sx={{ width: "500px" }}
                                />
                                <Button 
                                    variant="contained" 
                                    sx={{backgroundColor: "#FF5E1E", height: "30.75px", paddingX: "20px"}}
                                    size="small" 
                                    onClick={() => getPlanilhaDetail()}
                                >
                                    Filtrar
                                </Button>
                                {
                                    id_historico && (
                                        <Button 
                                            variant="contained" 
                                            sx={{backgroundColor: "#FF5E1E", height: "30.75px", paddingX: "20px"}}
                                            size="small" 
                                            onClick={() => handleBack()}
                                        >
                                            Exibir todos os dados
                                        </Button>
                                    )
                                }
                            </Box>
                            <Box sx={{boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.2)", borderRadius: 2, height: "57vh", width: "100%"}}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 10,
                                            },
                                        },
                                    }}
                                    sx={{
                                        borderRadius: 2, border: "1px solid #D3D3D3",
                                        "& .MuiDataGrid-columnHeaderTitle": {
                                            fontWeight: "bold",
                                            color: PRIMARY,
                                        },
                                        "& .MuiDataGrid-columnHeader": {
                                            backgroundColor: "#F5F5F5",
                                        }
                                    }}
                                    pageSizeOptions={[10, 50, 100]}
                                    onCellClick={handleCellClick}
                                    localeText={localeText}
                                    slots={{
                                        toolbar: GridToolbar,
                                    }}
                                    slotProps={{
                                        pagination: {
                                          labelRowsPerPage: "Linhas por página",
                                        },
                                     }}
                                />
                                <Typography sx={{fontWeight: "normal", fontSize: 14,  color: "gray", marginTop: 1}}>
                                    Dica: clique em uma célula para alterar os dados
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                )
            }
        </div>
    );
}

export default Planilha;