import { Link } from "react-router-dom"
import styled from "styled-components"

interface Props {
    size?: string
    color?: string
    top?: string
    bottom?: string
    center?: string
}

export const ButtonStyled = styled.button<Props>`
    background: ${p => p.color && p.color === 'green' ? p.theme.colors.greenLinear : '#fff'};
    max-width: ${p => p.size && p.size === 'large' ? '345px' : p.size === 'full' ? '100%' : '137px'};
    color: ${p => p.color && p.color === 'green' ? '#fff' : p.theme.colors.green};
    border: ${p => p.color && p.color === 'green' ? 'none' : '2px solid' + p.theme.colors.green};
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-size: 1rem;
    text-align: center;
    cursor: pointer;
    height: 40px;
    margin: ${p => p.center && '0 auto'};
    margin-top: ${p => p.top && p.top};
    margin-bottom: ${p => p.bottom && p.bottom};
    &:hover{
        background: ${p => p.color && p.color === 'green' ? '#fff' : p.theme.colors.greenLinear};
        color: ${p => p.color && p.color === 'green' ? p.theme.colors.green : '#fff'};
        border: ${p => p.color && p.color === 'green' ? '2px solid' + p.theme.colors.green : 'none'};
        line-height: 20px;
    }
`
export const LinkStyled = styled(Link) <Props>`
    background: ${p => p.color && p.color === 'green' ? p.theme.colors.greenLinear : '#fff'};
    max-width: ${p => p.size && p.size === 'large' ? '345px' : p.size === 'full' ? '100%' : '137px'};
    color: ${p => p.color && p.color === 'green' ? '#fff' : p.theme.colors.green};
    border: ${p => p.color && p.color === 'green' ? 'none' : '2px solid' + p.theme.colors.green};
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-size: 1rem;
    display: block;
    height: 40px;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    margin: ${p => p.center && '0 auto'};
    margin-top: ${p => p.top && p.top};
    margin-bottom: ${p => p.bottom && p.bottom};
    &:hover{
        background: ${p => p.color && p.color === 'green' ? '#fff' : p.theme.colors.greenLinear};
        color: ${p => p.color && p.color === 'green' ? p.theme.colors.green : '#fff'};
        border: ${p => p.color && p.color === 'green' ? '2px solid' + p.theme.colors.green : 'none'};
        line-height: 20px;
    }
`
export const ButtonGuess = styled.button`
    background: ${p => p.color && p.color === 'green' ? p.theme.colors.greenLinear : '#fff'};
    color: ${p => p.color && p.color === 'green' ? '#fff' : p.theme.colors.green};
    border: ${p => '2px solid' + p.theme.colors.green};
    max-width: 137px;
    width: 100%;
    padding: 0.5rem 1rem;
    text-align: center;
    height: 40px;
    border-radius: 2rem;
    font-size: 1rem;
    cursor: pointer;
    &:hover{
        background: ${p => p.theme.colors.dark};
        color: #fff;
        border-color: ${p => p.theme.colors.dark};
    }
`