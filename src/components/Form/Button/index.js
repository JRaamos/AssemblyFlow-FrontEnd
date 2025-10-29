import React from "react";
import PropTypes from 'prop-types';

import { ColorButton, Load } from "./styled";
import { ThemedComponent } from "ui/theme";
import { theme } from "ui/theme-color";

export const Button = ({ children, loading, color = 'white', outline, link, nospace, centred, onClick }) => {   
    const safeColor = theme.palette?.[color] ? color : "primary"
    return ( 
        <> 
          <ThemedComponent>
              <ColorButton variant={ link ? "text" : outline ? "outlined" : "contained" } color={ safeColor } nospace={nospace} centred={centred} onClick={onClick}>
                {
                  loading ? <Load color={ safeColor } outline={outline} /> : <>
                    { children }
                  </>
                }
              </ColorButton> 
          </ThemedComponent>
        </>
    );
} 
   
Button.propTypes = { 
  children: PropTypes.node, 
  color: PropTypes.string,
  outline: PropTypes.bool, 
  link: PropTypes.bool, 
  nospace: PropTypes.bool, 
  centred: PropTypes.bool, 
  loading: PropTypes.bool, 
  onClick: PropTypes.func,
};

Button.defaultProps = {
  children: undefined,
  color: 'white',
  outline: false,
  link: false,
  nospace: false,
  centred: false,
  loading: false,
  onClick: undefined,
};

export default Button;