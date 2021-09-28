import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }

    #root{
        margin: 0;
        padding: 0;
    }

    body{
        font-family: 'Poppins', sans-serif;
        font-size: 1rem;
        font-weight:400;
    }

    img{
        max-width: 100%;
    }
`