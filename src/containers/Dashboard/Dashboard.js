import React, {useEffect, useState} from "react";
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { Grid, Box, Typography } from "@mui/material";
import { PRIMARY, styleCard, styleKPI, format } from "../../shared/utils";
import api from "../../axios";
import { useDispatch } from "react-redux";
import { showSnackMessage } from "../../actions/SnackActions";
import { Skeleton, Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useLocation, useNavigate } from 'react-router-dom';


const Dashboard = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    let id_historico = location?.state?.id || null;
    const data = location?.state?.data || null;
    const hora = location?.state?.hora || null;
    const [loading, setLoading] = useState(false);
    const [faturamentoSeries, setFaturamentoSeries] = useState([
        {
            name: 'Bruto',  
            color: "#FF5E1E",
            label: "Valor Bruto",
            data: [],
        },
        {
            name: 'Líquido',
            color: PRIMARY,
            label: "Valor Líquido",
            data: [],
        },
    ]);
    const [vendasFormaPagamento, setVendasFormaPagamento] = useState([
        { data: [], label: 'Pix' },
        { data: [], label: 'Crédito' },
        { data: [], label: 'Débito' },
        { data: [], label: 'Boleto' }
    ]);
    const [vendasCategoria, setVendasCategoria] = useState([
        {
            data: [],
            cx: 150,
            outerRadius: 80,
            cornerRadius: 5,
            arcLabel: (item) => `${item.value}%`,
            arcLabelMinAngle: 30,
            arcLabelRadius: '70%',
        },
    ]);
    const [vendasTotais, setVendasTotais] = useState([
        {
            curve: "linear",
            data: [],
            name: 'Vendas',
            color: "#FF5E1E",
            label: "Vendas",
        },
    ]);
    const [produtosServicosMaisVendidos, setProdutosServicosMaisVendidos] = useState([
        {
            data: [],
            cx: 150,
            outerRadius: 80,
            cornerRadius: 5,
            arcLabel: (item) => `${item.value}%`,
            arcLabelMinAngle: 30,
            arcLabelRadius: '70%',
        },
    ]);
    const [diaComMaisVendas, setDiaComMaisVendas] = useState([
        { data: [], label: 'Qtd. vendas' },
    ])
    const [datesWeek, setDatesWeek] = useState([]);
    const [faturamentoDates, setFaturamentoDates] = useState([]);
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [fatLiquidoTotal, setFatLiquidoTotal] = useState(0);
    const [fatBrutoTotal, setFatBrutoTotal] = useState(0);
    const [qtdVendasTotal, setQtdVendasTotal] = useState(0);
    const [produtoMaisVendido, setProdutoMaisVendido] = useState("-");

    useEffect(() => {
        getDashboard();
    }, []);

    const getDashboard = async (clear=false) => {
        setLoading(true);
        let dates_formatted = selectedOptions.map((date) => date.value);
        const dataRequest = {
            date_selected: dates_formatted
        };
        if (!clear && id_historico) {
            dataRequest.id_historico = id_historico;
        };
        api.GetDashboard(dataRequest).then((response) => {
            let data = response.data;
            const brutoValues = data.faturamento[0].bruto;
            const liquidoValues = data.faturamento[1].liquido;
            setFaturamentoSeries(prevSeries => prevSeries.map(series => {
                if (series.name === 'Bruto') {
                    return { ...series, data: brutoValues };
                } else if (series.name === 'Líquido') {
                    return { ...series, data: liquidoValues };
                }
                return series;
            }));
            const pagamentoData = data.vendas_por_forma_pagamento;
            setVendasFormaPagamento((prevVendasFormaPagamento) =>
                prevVendasFormaPagamento.map((forma) => ({
                    ...forma,
                    data: pagamentoData[forma.label] || [],
                }))
            );
            const diasVenda = data.dias_com_mais_venda;
            setDiaComMaisVendas((prevDiaComMaisVendas) =>
                prevDiaComMaisVendas.map((item) => ({
                    ...item,
                    data: diasVenda.map((dia) => dia.total_vendas),
                }))
            );
            setDatesWeek(diasVenda.map((dia) => dia.dia));
            const categoriaData = data.vendas_por_categoria;
            setVendasCategoria((prevVendasCategoria) =>
                prevVendasCategoria.map((categoria) => ({
                    ...categoria,
                    data: categoriaData.map((item) => ({
                        id: item.id,
                        value: item.value,
                        label: item.label,
                    })),
                }))
            );
            const vendasTotais = data.vendas_por_mes;
            setVendasTotais((prevVendasTotais) => [{
                ...prevVendasTotais[0],
                data: vendasTotais,
            }]);
            const produtosServicosMaisVendidos = data.produtos_servicos;
            setProdutosServicosMaisVendidos((prevProdutosServicosMaisVendidos) =>
                prevProdutosServicosMaisVendidos.map((categoria) => ({
                    ...categoria,
                    data: produtosServicosMaisVendidos.map((item) => ({
                        id: item.id,
                        value: item.value,
                        label: item.label,
                    })),
                }))
            );
            setFatLiquidoTotal(data.faturamento_liquido_total);
            setFatBrutoTotal(data.faturamento_bruto_total);
            setQtdVendasTotal(data.vendas_total);
            setProdutoMaisVendido(data.produto_mais_vendido);
            let dates = data.dates.map((date) => ({label: date, value: date}));
            let dates_selected = data.date_selected.map((date) => ({label: date, value: date}));
            setFaturamentoDates(data.date_selected);
            setOptions(dates);
            setSelectedOptions(dates_selected);
            setLoading(false);
            dispatch(showSnackMessage({message: "Dados carregados com sucesso!", severity: "success"}));
        }).catch(() => {
            setLoading(false);
            dispatch(showSnackMessage({message: "Algo deu errado!", severity: "error"}));
        })
    };

    const handleBack = () => {
        navigate("/dashboard", { replace: true });
        getDashboard(true);
    };

    return (
        <div className="main">
			<h1>
                Dashboard
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
                            <Skeleton variant="rectangular" width="76%" height={300} />
                        </Box>
                        <Box display="flex" flexDirection="row" gap={2} pt={2} width="100%" justifyContent="center">
                            <Skeleton variant="rectangular" width="37.6%" height={300} />
                            <Skeleton variant="rectangular" width="37.7%" height={300} />
                        </Box>
                        <Box display="flex" flexDirection="row" justifyContent="center" pt={2}>
                            <Skeleton variant="rectangular" width="76%" height={300} />
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
                            <Box sx={{width: "40%", marginBottom: 4, display: "flex", gap: 2, alignItems: "center", justifyContent: "center", flex: 1, flexWrap: "wrap"}}>
                                <Autocomplete
                                    multiple
                                    id="size-small-filled"
                                    size="small"
                                    options={options}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, newValue) => {setSelectedOptions(newValue)}}
                                    defaultValue={selectedOptions}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Período"
                                            variant="filled"
                                            placeholder="Selecione"
                                        />
                                    )}
                                    sx={{ width: '500px' }}
                                />
                                <Button 
                                    variant="contained" 
                                    sx={{backgroundColor: "#FF5E1E", height: "30.75px", paddingX: "20px"}}
                                    size="small" 
                                    onClick={() => getDashboard()}
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
                            <Box sx={{width: "100%", display: "flex", gap: 2, alignItems: "center", justifyContent: "center"}}>
                                <Box sx={{...styleKPI}}>
                                    <Typography sx={{fontWeight: "bold", color: PRIMARY}}>
                                        Fat. Bruto Total
                                    </Typography>
                                    <Typography sx={{fontWeight: "bold", fontSize: "22px"}}>
                                        R$ {format(fatBrutoTotal)}
                                    </Typography>
                                </Box>
                                <Box sx={{...styleKPI}}>
                                    <Typography sx={{fontWeight: "bold", color: PRIMARY}}>
                                        Fat. Líquido Total
                                    </Typography>
                                    <Typography sx={{fontWeight: "bold", fontSize: "22px"}}>
                                        R$ {format(fatLiquidoTotal)}
                                    </Typography>
                                </Box>
                                <Box sx={{...styleKPI}}>
                                    <Typography sx={{fontWeight: "bold", color: PRIMARY}}>
                                        Qtd. Vendas Total
                                    </Typography>
                                    <Typography sx={{fontWeight: "bold", fontSize: "22px",}}>
                                        {qtdVendasTotal}
                                    </Typography>
                                </Box>
                                <Box sx={{...styleKPI}}>
                                    <Typography sx={{fontWeight: "bold", color: PRIMARY}}>
                                        Produto mais Vendido
                                    </Typography>
                                    <Typography sx={{fontWeight: "bold", fontSize: "22px"}}>
                                        {produtoMaisVendido}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{...styleCard, width: "100%"}}>
                                <Typography sx={{fontWeight: "bold", color: PRIMARY}}>
                                    Faturamento Bruto x Líquido (R$)
                                </Typography>
                                <LineChart
                                    xAxis={[{ scaleType: 'point', data: faturamentoDates }]}
                                    series={faturamentoSeries}
                                    height={300}
                                    grid={{ vertical: true, horizontal: true }}
                                    sx={{
                                        marginLeft: faturamentoSeries.some((data) => data.data.some((value) => value > 1000)) ? 4 : 0,
                                        "& .MuiChartsLegend-series text": { fontSize: "0.8em !important" },
                                    }}
                                    slotProps={{
                                        legend: {
                                            direction: 'row',
                                            position: { vertical: 'bottom', horizontal: 'middle' },
                                            padding: -5,
                                        },
                                        noDataOverlay: {
                                            message: "Sem dados para exibir",
                                        }
                                    }}
                                />
                            </Box>
                            <Box sx={{...styleCard, flex: 1}}>
                                <Typography sx={{fontWeight: "bold", color: PRIMARY}}>
                                    Vendas por forma de pagamento (%)
                                </Typography>
                                <BarChart
                                    colors={["#FF5E1E", PRIMARY, "#FFD700", "#1ABC9C"]}
                                    xAxis={[{ scaleType: 'band', data: faturamentoDates }]}
                                    series={vendasFormaPagamento}
                                    height={300}
                                    sx={{
                                        "& .MuiChartsLegend-series text": { fontSize: "0.8em !important" },
                                    }}
                                    grid={{ vertical: true, horizontal: true }}
                                    slotProps={{
                                        legend: {
                                            direction: 'row',
                                            position: { vertical: 'bottom', horizontal: 'middle' },
                                            padding: -5,
                                        },
                                        noDataOverlay: {
                                            message: "Sem dados para exibir",
                                        }
                                    }}
                                />
                            </Box>
                            <Box sx={{...styleCard, flex: 1}}>
                                <Typography sx={{fontWeight: "bold", color: PRIMARY}}>
                                    Vendas por categoria (%)
                                </Typography>
                                <PieChart
                                    colors={["#FF5E1E", PRIMARY, "#FFD700", "#1ABC9C", "#5C6BC0", "#FF6F61", "#4CAF50", "#9C27B0"]}
                                    series={vendasCategoria}
                                    sx={{
                                        "& .MuiChartsLegend-series text": { fontSize: "0.8em !important" },
                                    }}
                                    height={300}
                                    slotProps={{
                                        noDataOverlay: {
                                            message: "Sem dados para exibir",
                                        }
                                    }}
                                />
                            </Box>
                            <Box sx={{...styleCard, width: "100%"}}>
                                <Typography sx={{fontWeight: "bold", color: PRIMARY}}>
                                    Quantidade de vendas
                                </Typography>
                                <LineChart
                                    xAxis={[{ scaleType: 'point', data: faturamentoDates }]}
                                    series={vendasTotais}
                                    height={300}
                                    grid={{ vertical: true, horizontal: true }}
                                    sx={{
                                        marginLeft: vendasTotais.some((data) => data.data.some((value) => value > 1000)) ? 4 : 0,
                                        "& .MuiChartsLegend-series text": { fontSize: "0.8em !important" },
                                    }}
                                    slotProps={{
                                        legend: {
                                            direction: 'row',
                                            position: { vertical: 'bottom', horizontal: 'middle' },
                                            padding: -5,
                                        },
                                        noDataOverlay: {
                                            message: "Sem dados para exibir",
                                        }
                                    }}
                                />
                            </Box>
                            <Box sx={{...styleCard, flex: 1}}>
                                <Typography sx={{fontWeight: "bold", color: PRIMARY}}>
                                    Produtos/Serviços mais vendidos (%)
                                </Typography>
                                <PieChart
                                    colors={["#FF5E1E", PRIMARY, "#FFD700", "#1ABC9C", "#5C6BC0", "#FF6F61", "#4CAF50", "#9C27B0"]}
                                    series={produtosServicosMaisVendidos}
                                    sx={{
                                        "& .MuiChartsLegend-series text": { fontSize: "0.8em !important" },
                                    }}
                                    height={300}
                                    slotProps={{
                                        noDataOverlay: {
                                            message: "Sem dados para exibir",
                                        }
                                    }}
                                />
                            </Box>
                            <Box sx={{...styleCard, flex: 1}}>
                                <Typography sx={{fontWeight: "bold", color: PRIMARY}}>
                                    Quantidade de vendas por dia
                                </Typography>
                                <BarChart
                                    colors={[PRIMARY]}
                                    xAxis={[{ scaleType: 'band', data: datesWeek }]}
                                    series={diaComMaisVendas}
                                    height={300}
                                    sx={{
                                        "& .MuiChartsLegend-series text": { fontSize: "0.8em !important" },
                                    }}
                                    grid={{ vertical: true, horizontal: true }}
                                    slotProps={{
                                        legend: {
                                            direction: 'row',
                                            position: { vertical: 'bottom', horizontal: 'middle' },
                                            padding: -5,
                                        },
                                        noDataOverlay: {
                                            message: "Sem dados para exibir",
                                        }
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                )
            }
        </div>
    );
};

export default Dashboard;