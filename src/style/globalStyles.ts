import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
    :root{
        --action-primary: #008ecc;
        --action-primary-hover: #0076ad;
        --action-primary-active: #016fa3;
        --action-primary-soft: #eaf6fc;
        --action-primary-soft-hover: #d5eefb;
        --action-primary-border: #c8dfeb;
        --action-primary-text: #008ecc;
    }

    *{
        font-family: "Inter", sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body{
        overflow-x: hidden;
    }

    button, a { -webkit-tap-highlight-color: transparent; }
    button:focus-visible, a:focus-visible { outline-color: var(--action-primary); }

`
