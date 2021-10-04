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
		&.open{
			transform: none !important;
		}
    }
    .slick-track{
        width: 9999px !important;
		&.open{
			transform: none !important;
		}
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
	.motion-card{
		max-width: 420px;
		width: 100%;
		height: 236px;
		display: flex;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		border-radius: 1rem;
		margin-bottom: 24px;
		overflow: hidden;
		@media (min-width: 991px){
			&:nth-child(2n + 0) {
				margin: 0 0 24px 1rem;
			}
		}
		@media (min-width: 1200px){
			&:nth-child(2n + 0) {
				margin: 0 0 24px;
			}
			&:nth-child(3n + 2) {
				margin: 0 1rem 24px;
			}
			&:nth-child(3n) {
				flex: 1 1;
			}
		}
	}
`
