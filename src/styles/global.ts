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
        margin: 0;
        font-size: 1rem;
        font-family: 'Poppins', sans-serif;
        list-style: none;
        font-weight: 400;
        color: '#233D4d';
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;
    }

    img{
        max-width: 100%;
    }
    .slick-list{
        padding: 0 !important;
    }
    .slick-track{
        width: 9999px !important;
    }
    .slick-slide{
        margin-right: 1rem;
    }
	.motion{
		position: fixed;
		top: 50%;
		left: 50%;
		width: 90%;
		z-index: 10;
		max-width: 378px;
		@media (min-width: 991px){
			max-width: 1253px;
			>div{
				max-width: 1253px;
			}
		}
	}
	.gmnoprint{
		display: none;
	}
`
