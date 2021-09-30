import styled from "styled-components";
import MapBackground from '../../assets/images/map-background.png'

export const Content = styled.div`
    ${p => p.theme.screens.large}{
        max-width: 530px;
    }
`
export const ImageContent = styled.div`
    background-image: url(${MapBackground});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    min-height: 215px;
    margin: 0 1rem;
    width: auto;
    ${p => p.theme.screens.large}{
        position: relative;
        right: 0;
        top: 20%;
        width: 60%;
        background-size: cover;
        margin: 0;
        min-height: 643px;
    }
`