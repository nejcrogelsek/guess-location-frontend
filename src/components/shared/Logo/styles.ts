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
    ${p => p.theme.screens.large}{
        width: 171px;
    }
    .content {
    max-width: 480px;
    width: 100%;
    padding: 0 30px;
    > p {
      text-align: center;
      font-size: 1rem;
    }
  }
`