import React  from "react";

export const TITLE_SIZE = 22;
export const TITLE_MARGIN = 1;
export const GRID_BUTTONS_SPACING = 2;
export const TAB_SIZE = 50;

export const BLACK_BUTTON = "#111315"; //RESUMO = ESCRITA DO GUIA VERMELHA
export const BLACK_TABLE = "#3c3c3c"; // PAINEL = Frente de Caixa Cliente
export const WHITE_TABLE = "#ffffff"; // DRE = ESCRITA DO FATURAMENTO BRUTO (CONTINUA A MESMA) E ABAS DEBAIXO, EXEMPLO: (-) DEVOLUÇÕES 
export const YELLOW_TABLE = "#f6dd3d";
export const YELLOW_WEAK_TABLE = "#fbe39b";
export const BLUE_LIGHT_UX = "#3182CE"; // PLANO DE CONTAS = CATEGORIA (C0NTA AZUL) CONTINUA A MESMA
export const GRAY_STRONG_TABLE = "#595959";
export const GRAY_WEAK_TABLE = "#dbdbda";
export const PINK_WEAK_TABLE = "#f7caac";
export const COMMENT_TABLE = "#bc67c8";
export const GRAY_TABLE = "#848484";
export const GRAY_TEXT_TABLE = "#848484";
export const RED_TABLE = "#C53030"; // DFC = ESCRITA (-) COMISSÕES SOBRE VENDA #D8D8D8
export const GRAY_LABEL_UX = "#4A5568"; // ESCRITA NAVBAR E BOTÕES EM GERAL DAS GUIAS
export const BLACK_LABEL_UX = "#000";
export const YELLOW_BG_UX = "#3A848C";
export const GRAY_BG_UX = "#FFFFFF"; //COR BRANCA DAS TABLES SELEÇÃO DO AUTOCOMPLETE ESCRITA
export const RED_ERROR_UX = "#E53E3E";
export const GRAY_HEADER_UX = "#4F4E48";
export const GREEN_SUCCESS_UX = "#25855A";
export const GRAY_DATE_UX = "#2D3748";
export const GRAY_BORDER_UX = "#E2E8F0";
export const GRAY_BG_BODY = "#D9D8D0";
export const GRAY_STRONG_UX = "#2D3748";
export const PURPLE_PATH_UX = "#805AD5";
export const GRAY_WEAK_UX = "#718096";
export const GRAY_BORDER_IMPORT = "#B3B3B3";
export const GRAY_TEXT_INPUT = "#A0AEC0";
export const YELLOW_INFO_UX = "#ECC94B";
export const BLUE_INFO_UX = "#4299E1";
export const PURPLE_INFO_UX = "#9F7AEA";
export const GRAY_BG_HEADER = "#EDF2F7";
export const GRAY_BORDER_TABLE = "#CBD5E0";
export const BLUE_LIGHTER_UX = "#EDF2F7";
export const RED_NEGATIVE_UX = "#D05959";

export const DIVIDER_COLOR = "#F2F4F6";
export const borderHeader = "1px solid #a39e9e";

export const DASH_LINESTYLE_COLOR = "#E5E6EB";
export const DASH_BAR_COLOR = "#38B2AC";
export const DASH_STACKED_COLOR = "#4299E1";
export const DASH_AXIS_COLOR = "#8B8B92";
export const DASH_LABEL_COLOR = "#72737A";
export const DASH_KPI_COLOR = "#595A63";
export const DASH_KPI_DATA_COLOR = "#454550";
export const DASH_KPI_POSITIVE_COLOR = "#65A300";
export const DASH_KPI_NEGATIVE_COLOR = "#DF285F";
export const DASH_TREEMAP = "#d5d5d5";
export const GRAY_LABEL_UX_THEME = "rgb(245, 245, 245)"; // FUNDO DAS TELAS
export const CIRCLE_COLOR_LIGHT_PINK = "#F89B9C";
export const CIRCLE_COLOR_GREEN = "#82FA91";

// CRIEI

export const WHITE_SUBITEM_NAVBAR = "#F2F4F6";
export const BLACK_SUBITEM_NAVBAR = "#1D2029";
export const BLACK_TABLE_THEME = "#383D45";
export const BLUE_LIGHT_UX_THEME = "#3182CE";
export const GRAY_LABEL_UX_TEMA = "#4B4B4B";
export const BLACK_TABLE_PERFIL = "#383844";
export const BACK_PERFIL = "#353540";
export const DIVIDER_COLOR_THEME = "#4B4B4B";
export const INFO_THEME = "#505050";
export const BORDER_LOGIN_THEME = "rgba(80, 80, 80, 1)";
export const ROW_MAIN = "#4A5568";
export const PAPER_PADDING_THEME = "#31313C";
export const WALPAPPER_THEME = "#31313C";
export const TITLE_REUNIAO = "#9B9B9B";
export const ITENS_PAINEL = "#383D45";
export const LIST_THEME = "#383D45";
export const LINE_TABLE = "#FFF";
export const WHITE_ESCRITA_THEME = "#D8D8D8";
export const RED_INFO = "#C53030";
export const RED_TABLE_THEME = "#D8D8D8";
export const WHITE_THEME_BLACK = "#D8D8D8";
export const PERFIL_THEME = "rgba(74, 85, 104, 1)";
export const BLUE_THEME = "#242831";
export const BORDER_TABLE ="#505050";
export const PAPER_THEME = "#383844";
export const BORDER_BUTTON = "#A0A0A0";
export const COLOR_THEME = "#4D4D4D";
export const TEXT_THEME = "#454545";
export const BLUEISH_PURPLE = "#5470C6";
export const VERY_WEAK_GREEN_COMPARATIVO = "#ADFFE6";
export const VERY_WEAK_YELLOW_COMPARATIVO = "#FFF9B0";
export const VERY_WEAK_BROWN_COMPARATIVO = "#9E887A";
export const WEAK_ORANGE_COMPARATIVO = "#FAA66E";
export const VERY_WEAK_GRAY_COMPARATIVO = "#B3C3D0";
export const EXM_SUBTITLE_GRAY = "#9E9E9E";
export const DRE_PRE_SALVA_GRAY = "#7D7D7D";
export const BORDER_BLACK_THEME_CARD = "#434343";
export const BORDER_PAPER = "#D8D8D8";
export const COLOR_CONTAS1 = "#00A7CF30";
export const COLOR_CONTAS2 = "#00A7CF";
export const COLOR_CONTAS3 = "#FAA66630";
export const COLOR_CONTAS4 = "#FAA666";
export const PRIMARY = "#0A3D62";
export const SECONDARY = "#D3D3D3";
export const PRIMARY_DARK = "#2C3E50"

//NAVBAR

export const format = (value) =>{
	try{
		if (value < 0){
			value *= -1;
		}
		return (value).toLocaleString("pt-br", {minimumFractionDigits: 2, maximumFractionDigits: 2});
	}catch (error){
		return value;
	}
};

const labels = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

export const convertLabelToNumber = (label) => {
	let splitLabel = label.split("/");
	let month = labels.indexOf(splitLabel[0]) + 1;
	if(month < 10){
		month = `0${month}`;
	}
	return `${month}/${splitLabel[1]}`;
};

export const negativeEl = (data) =>{
	if(data != null){
		if(data.value < 0){
			return (
				<span>
                    -
				</span>
			);
		}
	}
};

export const negativeElItem = (item) =>{
	if(item < 0){
		return (
			<span style={{marginRight: "4px"}}>
				-
			</span>
		);
	}
};

export const getClassName = (data, periodo, column) => {
	let className = "";
	if (periodo != null) {
		if (periodo.value.includes("(-) 13º") && column !== "periodo" && column !== "total" && (!window.location.href.includes("dfc"))) {
			className += "table-provisioned ";
			return className;
		}
	}
	if (data?.is_fixed === true  ){
		className += "table-fixed ";
	}
	if (data?.is_provisioned === true) {
		className += "table-provisioned ";
	}
	if (data && Object.hasOwn(data, "comments") && data?.comments?.length) {
		className += "table-comment ";
	}
	return className;
};

export const convertMonthToStr = (month) =>{
	if (month < 10){
		return `0${month}`;
	}
	return `${month}`;
};

export const getCurrentDate = () => {
	return Date.now();
};

export const getFullMonthDate = () => {
	const date = new Date();
	return date.setDate(1);
};

export const getLastMonth = () =>{
	const now = new Date();
	const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
	return previousMonth.getMonth() + 1;
};

export const getCurrentMonth = () =>{
	const now = new Date();
	const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
	return currentMonth.getMonth() + 1;
};

export const getLastMonthYear = () =>{
	const now = new Date();
	const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
	return previousMonth.getFullYear();
};

export const getCurrentMonthYear = () =>{
	const now = new Date();
	const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
	return currentMonth.getFullYear();
};

export const getLastDate = () =>{
	const mes = getLastMonth();
	const ano = getLastMonthYear();
	return `${mes}/${ano}`;
};

export function waitForElm(selector) {
	return new Promise(resolve => {
		if (document.querySelector(selector)) {
			return resolve(document.querySelector(selector));
		}

		const observer = new MutationObserver(() => {
			if (document.querySelector(selector)) {
				resolve(document.querySelector(selector));
				observer.disconnect();
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true
		});
	});
}

export const getScrollY = (ref) => {
	const scrollTop = ref.current.scrollTop;
	return scrollTop;
};

export const setScrollY = (ref, position) => {
	ref?.current?.scrollTo(0, position);
};

export const formatterCurrency = (value, digit=0, prefix=true) => {
	try{
		if (prefix) {
			return value.toLocaleString("pt-BR", {style: "currency", currency: "BRL", maximumFractionDigits: digit});
		} else {
			return value.toLocaleString("pt-BR", {maximumFractionDigits: digit});
		
		}
	}catch (e) {
		return value;
	}

};

export const formatterValueNull = (value) => {
	if (!value) {
		return " - ";
	} else {
		return value;
	}
};

export const formatterPercentage = (num, fraction=1) =>{
	try{
		return num.toFixed(fraction);
	}catch (e) {
		return num;
	}
};

const fractionDigits = 2;
export const formatterThousand = (num) => {
	// let formatter = Intl.NumberFormat("pt-BR", { notation: "compact" });
	// return formatter.format(num);
	try{
		let number = Math.abs(num);
		let sign = Math.sign(num);
		return number > 999 ?
			(sign*(number/1000).toFixed(fractionDigits) + "k") :
			(number <= 100 ? sign*number : (sign*number).toFixed(fractionDigits));
	}catch (e) {
		return num;
	}

};

export const formatterDayMonthYear = (date) => {
	if (date?.includes("-")) {
		let [year, month, day] = date.split("-");
		return `${day}/${month}/${year}`;
	}
	else {
		return date;
	}
};

export const styleDarkButton = {
	backgroundColor: "transparent",
	color: RED_TABLE_THEME,
	border: `1px solid ${BORDER_BUTTON}`,
	fontWeight: 600,
	boxShadow: "none",
};

export const styleButton = {
	backgroundColor: "transparent",
	color: GRAY_LABEL_UX,
	border: `1px solid ${GRAY_LABEL_UX}`,
	fontWeight: 600,
	boxShadow: "none",
};

export const styleButtonMobile = {
	...styleButton,
	fontWeight: 400,
	fontSize: "12px",
};

export const styleYellowButton = {
	backgroundColor: "#FF5E1E",
	color: GRAY_BG_UX,
	fontWeight: "600",
	boxShadow: "none",
};

export const styleTitle = {
	color: "#2D3748",
	width: "170px",
	height: "32px",
	left: "295px",
	top: "48px",
	fontSize: "24px",
	fontWeight: "bold"
};

export const styleGrid = {
	p: 2,
	display: "flex",
	flexDirection: "column",
	borderRadius: 2,
	marginTop: 4
};

export const stylePath = {
	color: PURPLE_PATH_UX,
	fontSize: "16px",
	fontWeight: "500",
	fontFamily: "Inter",
	fontStyle: "normal"
};

export const copyToClipboard = (value) => {
	navigator.clipboard.writeText(value);
};

export const changePosition = (position) => {
	if(position === "top"){
		return "bottom";
	}else{
		return "top";
	}
};

export const styleInput = {
	color: GRAY_TEXT_INPUT,
};

export const styleDefaultText = {
	fontSize: "16px",
	fontWeight: "400",
	fontFamily: "Inter",
	fontStyle: "normal",
	color: GRAY_LABEL_UX
};

export const styleField = {
	width: "300px",
	marginBottom: "20px",
	marginLeft: 2,
};

export const avatarStyle = {
	backgroundColor: YELLOW_BG_UX,
	color: BLACK_LABEL_UX
};

export const styleTitleModal ={
	color: GRAY_LABEL_UX,
	fontSize: "20px",
	fontWeight: "700",
};

export const styleText = {
	color: GRAY_LABEL_UX,
	fontSize: "16px",
	fontWeight: "400",
};

export const styleTextStrong = {
	color: GRAY_STRONG_UX,
	fontSize: "18px",
	fontWeight: "700",
};

export const styleTextModal = {
	color: GRAY_STRONG_UX,
	fontSize: "16px",
	fontWeight: "400",
};

export const styleModal = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "30%",
	height: "auto",
	bgcolor: "background.paper",
	padding: "20px",
	borderRadius: 2,
};

export const imagePerfilSmall = {
	maxWidth: "25px",
	maxHeight: "25px"
};

export const imagePerfilBig = {
	maxWidth: "40px",
	maxHeight: "40px"
};

export const stylesRow = {
	textAlign: "center",
	cursor: "pointer",
	width: "2.8%",
};

export const styleNegativeValue = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	gap: 10
};

const PAPER_PADDING = 2;
// .main margin is 30px -> 60px;
// marginBottom of title = Title Size * Title Margin Bottom
// Height of title = Title Size
// Paper padding = 2 * 8px (default) = 16px * 2
const totalMargin = 60 + (TITLE_SIZE * TITLE_MARGIN) + TITLE_SIZE + ((PAPER_PADDING * 8) * 2);
const totalMarginCompras = 60 + (TITLE_SIZE * TITLE_MARGIN) + TITLE_SIZE - TAB_SIZE + ((PAPER_PADDING * 8) * 2);
const height = `calc(100vh - ${totalMargin}px)`;
const heightCompras = `calc(100vh - ${totalMarginCompras}px)`;

export const paperStyle = {
	p: PAPER_PADDING,
	display: "flex",
	borderRadius: 2,
	flexDirection: "column",
	maxHeight: height,
	boxShadow: "none"
};

export const paperMobileStyle = {
	...paperStyle,
	borderRadius: "24px 24px 12px 12px",
	marginTop: "95px",
	overflowY: "hidden",
	paddingBottom: "45px",
};

export const paperStyleFull = {
	p: PAPER_PADDING,
	display: "flex",
	borderRadius: 2,
	flexDirection: "column",
	// height: height,
};

export const paperStyleCompras = {
	p: PAPER_PADDING,
	display: "flex",
	borderRadius: 2,
	flexDirection: "column",
	maxHeight: heightCompras,
};

export const smallPaperStyle = {
	width: "40%",
	height: "auto",
	overflowY: "hidden",
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	bgcolor: "background.paper",
	padding: "20px 20px 20px 20px",
};

export const verySmallPaperStyle = {
	width: "30%",
	height: "auto",
	overflowY: "hidden",
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	bgcolor: "background.paper",
	padding: "15px 30px 30px 30px",
};

export const paperStyleMobile = {
	...smallPaperStyle,
	width: "80%",
	padding: "10px 20px",
};

export const textModificacao = {
	fontSize: 14,
	marginBottom: `${TITLE_MARGIN}em`
};

export const paperDash = {
	display: "flex",
	flexDirection: "column",
	textAlign: "center",
	p: 2,
	height: "calc(100% - 32px)"
};

export const dashLeftTitle = {
	textAlign: "left",
};

export const spanDash = {
	fontSize: "16px",
	color: GRAY_DATE_UX,
	fontWeight: "600"
};

export const seriesColor = [
	DASH_BAR_COLOR, YELLOW_BG_UX, DASH_STACKED_COLOR, VERY_WEAK_GREEN_COMPARATIVO,
	VERY_WEAK_YELLOW_COMPARATIVO, VERY_WEAK_BROWN_COMPARATIVO, WEAK_ORANGE_COMPARATIVO,
	PURPLE_INFO_UX, BLUEISH_PURPLE, VERY_WEAK_GRAY_COMPARATIVO
];
export const seriesColorDualLine = [YELLOW_BG_UX, DASH_BAR_COLOR];
export const seriesColorTree = [DASH_BAR_COLOR, DASH_STACKED_COLOR, GRAY_LABEL_UX];
export const fontFamily = "Inter, sans-serif";

export const grid = {
	left: 0,
	right: 0,
	bottom: 48, // padding is 2 (2*8px = 16px)
	top: 32, // padding is 2 (2*8px = 16px)
	containLabel: true
};

export const legend = {
	left: "center",
	icon: "circle",
	top: "bottom",
};

export const cardIconStyle = {
	fontSize: 60,
	color: DASH_KPI_DATA_COLOR
};

export const cardIconStyleBlack = {
	fontSize: 60,
	color: "#D8D8D8"
};

export const styleCircle = {
	fontSize: "18px"
};

export const styleCircleLegend = {
	color: GRAY_LABEL_UX,
	fontSize: "15px",
	fontWeight: "400",
	fontFamily: "Inter",
	fontStyle: "normal",
	display: "flex",
	alignItems: "center",
};
export const textCompleteStyle ={

};

export const textCompleteStyleBlack ={
	"& .MuiOutlinedInput-input": {
		color: "#D8D8D8"
	},
	"& .MuiChip-label": {
		color: "#D8D8D8"
	},
	"& .MuiSvgIcon-root":{
		color: "#A0A0A0"
	},
	"& .MuiMenuItem-root":{
		color: "#A0A0A0"
	},
	"& .MuiButtonBase-root":{
		color: "#A0A0A0"
	},
	"& .MuiOutlinedInput-root": {
		"& fieldset": {
			borderColor: BORDER_TABLE,
			borderRadius: 1
		},
		"&:hover fieldset": {
			borderColor: BORDER_BUTTON,
			borderRadius: 1
		},
		"&.Mui-focused fieldset": {
			borderColor: BORDER_BUTTON,
			borderRadius: 1
		},
	},
};


export const tableStyle = {
	style: {
		borderCollapse: "separate",
		borderSpacing: 0,
		borderTop: "1px solid #000000"
	},
	tdTh: {
		margin: 0,
		padding: "3px",
		border: "1px solid #000000",
		whiteSpace: "nowrap",
		borderTopWidth: "0px",
		fontSize: "14px"
	},
	firstCol: {
		backgroundColor: "#ffffff",
		position: "sticky",
		width: "200px",
		left: "0px"
	},
	pointer: {
		"cursor": "pointer"
	}
};

export const styleLegend = {
	orange: {
		backgroundColor: "#ee9743"
	},
	green: {
		backgroundColor: "#20a120"
	},
	purple: {
		backgroundColor: "#8c268c"
	},
	blue: {
		backgroundColor: "#48add9"
	},
	red: {
		backgroundColor: "#e02d2d"
	},
	white: {
		backgroundColor: "#ffffff",
		border: "1px solid black"
	},
	dark_green: {
		backgroundColor: "#275227"
	},
};

export const muiRootStyle = {
	"& .MuiOutlinedInput-input": {
		fontFamily: "Inter, sans-serif",
		color: GRAY_DATE_UX,
		fontWeight: 400,
	},
};

export const muiRootStyleDark = {
	"& .MuiOutlinedInput-input": {
		fontFamily: "Inter, sans-serif",
		color: WHITE_THEME_BLACK,
		fontWeight: 400
	},
	"& .MuiOutlinedInput-root": {
		"& fieldset": {
			borderColor: GRAY_BORDER_UX,
			borderRadius: 1
		},
		"&:hover fieldset": {
			borderColor: GRAY_BORDER_UX,
			borderRadius: 1
		},
		"&.Mui-focused fieldset": {
			borderColor: GRAY_BORDER_UX,
			borderRadius: 1
		},
	},
};

export const textStylePerfil = {
	fontWeight: "600",
};

export const circlePerfil = {
	paddingCircle: {
		padding: "50px"
	},
	fontCircle: {
		fontSize: 50,
		overflow: "visible",
		border: `3px solid ${WHITE_THEME_BLACK}`
	},
	ImageCircle: {
		cursor: "pointer",
	}
};

export const customFooterStyle = {
	display: "flex",
	alignItems: "center",
	justifyContent: "end",
	gap: 2
};

export const hexToRgb = (hex) => {
	let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
};

export const isLightColor = (rgbColor) => {
	return (rgbColor.r*0.299 + rgbColor.g*0.587 + rgbColor.b*0.114) > 186;
};

export const formatarValorBrasileiro = (valor) => {
    return valor.toLocaleString("pt-BR", {
        currency: "BRL",
    });
};

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const styleCard = {
	boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.2)",
	borderRadius: 2,
	width: 1020,
	minWidth: 500,
	paddingY: 3,
	border: "1px solid #D3D3D3"
}

export const styleKPI = {
	flex: 1,
	boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.2)",
	borderRadius: 2,
	paddingY: 3,
	border: "1px solid #D3D3D3",
	height: "fixed"
}

export const localeText = {
	noRowsLabel: 'Nenhuma linha',
	noResultsOverlayLabel: 'Nenhum resultado encontrado.',
	toolbarDensity: 'Densidade',
	toolbarDensityLabel: 'Densidade',
	toolbarDensityCompact: 'Compacto',
	toolbarDensityStandard: 'Padrão',
	toolbarDensityComfortable: 'Confortável',
	toolbarColumns: 'Colunas',
	toolbarColumnsLabel: 'Exibir seletor de colunas',
	toolbarFilters: 'Filtros',
	toolbarFiltersLabel: 'Exibir filtros',
	toolbarFiltersTooltipHide: 'Ocultar filtros',
	toolbarFiltersTooltipShow: 'Exibir filtros',
	toolbarQuickFilterPlaceholder: 'Procurar…',
	toolbarQuickFilterLabel: 'Procurar',
	toolbarQuickFilterDeleteIconLabel: 'Limpar',
	toolbarExport: 'Exportar',
	toolbarExportLabel: 'Exportar',
	toolbarExportCSV: 'Baixar como CSV',
	toolbarExportPrint: 'Imprimir',
	toolbarExportExcel: 'Baixar como Excel',
	columnsManagementSearchTitle: 'Buscar',
	columnsManagementNoColumns: 'Nenhuma coluna',
	columnsManagementShowHideAllText: 'Mostrar/Ocultar Todas',
	columnsManagementReset: 'Redefinir',
	filterPanelAddFilter: 'Adicionar filtro',
	filterPanelRemoveAll: 'Remover todos',
	filterPanelDeleteIconLabel: 'Excluir',
	filterPanelLogicOperator: 'Operador lógico',
	filterPanelOperator: 'Operador',
	filterPanelOperatorAnd: 'E',
	filterPanelOperatorOr: 'Ou',
	filterPanelColumns: 'Colunas',
	filterPanelInputLabel: 'Valor',
	filterPanelInputPlaceholder: 'Filtrar valor',
	filterOperatorContains: 'contém',
	filterOperatorDoesNotContain: 'não contém',
	filterOperatorEquals: 'é igual a',
	filterOperatorDoesNotEqual: 'não é igual a',
	filterOperatorStartsWith: 'começa com',
	filterOperatorEndsWith: 'termina com',
	filterOperatorIs: 'é',
	filterOperatorNot: 'não é',
	filterOperatorAfter: 'após',
	filterOperatorOnOrAfter: 'em ou após',
	filterOperatorBefore: 'antes de',
	filterOperatorOnOrBefore: 'em ou antes de',
	filterOperatorIsEmpty: 'está vazio',
	filterOperatorIsNotEmpty: 'não está vazio',
	filterOperatorIsAnyOf: 'é qualquer um dos',
	'filterOperator=': 'igual à',
	'filterOperator!=': 'diferente de',
	'filterOperator>': 'maior que',
	'filterOperator>=': 'maior ou igual que',
	'filterOperator<': 'menor que',
	'filterOperator<=': 'menor ou igual que',
	headerFilterOperatorContains: 'Contém',
	headerFilterOperatorDoesNotContain: 'Não contém',
	headerFilterOperatorEquals: 'Igual',
	headerFilterOperatorDoesNotEqual: 'Não é igual a',
	headerFilterOperatorStartsWith: 'Começa com',
	headerFilterOperatorEndsWith: 'Termina com',
	headerFilterOperatorIs: 'É',
	headerFilterOperatorNot: 'Não é',
	headerFilterOperatorAfter: 'Depois de',
	headerFilterOperatorOnOrAfter: 'Está entre ou depois de',
	headerFilterOperatorBefore: 'Antes de',
	headerFilterOperatorOnOrBefore: 'Está entre ou antes de',
	headerFilterOperatorIsEmpty: 'É vazio',
	headerFilterOperatorIsNotEmpty: 'Não é vazio',
	headerFilterOperatorIsAnyOf: 'É algum',
	'headerFilterOperator=': 'Igual',
	'headerFilterOperator!=': 'Não igual',
	'headerFilterOperator>': 'Maior que',
	'headerFilterOperator>=': 'Maior que ou igual a',
	'headerFilterOperator<': 'Menor que',
	'headerFilterOperator<=': 'Menor que ou igual a',
	filterValueAny: 'qualquer',
	filterValueTrue: 'verdadeiro',
	filterValueFalse: 'falso',
	columnMenuLabel: 'Menu',
	columnMenuShowColumns: 'Exibir colunas',
	columnMenuManageColumns: 'Gerir colunas',
	columnMenuFilter: 'Filtrar',
	columnMenuHideColumn: 'Ocultar',
	columnMenuUnsort: 'Desfazer ordenação',
	columnMenuSortAsc: 'Ordenar do menor para o maior',
	columnMenuSortDesc: 'Ordenar do maior para o menor',
	footerTotalRows: 'Total de linhas:',
	footerRowSelected: (count) =>
		count !== 1
		  ? `${count.toLocaleString()} linhas selecionadas`
		  : `${count.toLocaleString()} linha selecionada`,
};