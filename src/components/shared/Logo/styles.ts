import { Link } from "react-router-dom"
import styled from "styled-components"
import LogoImage from "../../../assets/images/logo.svg"

export const Logo = styled(Link)`
    background-image: url(${LogoImage});
    background-repeat: no-repeat;
    background-size: contain;
    display: block;
    width: 142px;
    height: 40px;
    @media ${props => props.theme.screens.large}{
        width: 171px;
    }
`