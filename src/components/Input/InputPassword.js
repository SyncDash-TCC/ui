import React, {useState}  from "react";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import FormControl from "@mui/material/FormControl";
import {
	GRAY_BG_UX,
	GRAY_LABEL_UX,
	COLOR_THEME,
	GRAY_HEADER_UX
} from "../../shared/utils";

const InputPassword = (props) => {
	const [showPassword, setShowPassword] = useState(false);

	return(
		<FormControl error={props.error} sx={{ width: "80%", marginTop: 0.5 }} variant="outlined">
			<InputLabel 
				htmlFor="outlined-adornment-password" 
				style={{color: GRAY_LABEL_UX, fontSize: props.matches ? "1rem" : "0.9rem"}}
			>
				{props.label}
			</InputLabel>
			<OutlinedInput
				data-testid="password-input"
				id="outlined-adornment-password"
				required
				type={showPassword ? "text" : "password"}
				value={props.password}
				onChange={(e) => props.handleChange(e)}
				style={{backgroundColor: GRAY_BG_UX, color: GRAY_HEADER_UX}}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={() => setShowPassword(!showPassword)}
							edge="end"
							style={{color: COLOR_THEME}}
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
				label="Senha"
			/>
		</FormControl>
	);
};

export default InputPassword;