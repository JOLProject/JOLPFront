import { createGlobalStyle } from 'styled-components';
import {normalize} from 'styled-normalize';

const GlobalStyles = createGlobalStyle`
    ${normalize};
    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        box-sizing:border-box;
        margin:0;
        padding:0;
    }
    body{
        font-size:14px;
        min-width:1500px;
    }
    div{
        display:block;
    }
`;

export default GlobalStyles;
