import { Link } from "react-router-dom"
import styled from "styled-components"

interface Props {
    size?: string
    color?: string
}

export const ButtonStyled = styled.button<Props>`
    background: ${p => p.color && p.color === 'green' ? p.theme.colors.greenLinear : '#fff'};
    max-width: ${p => p.size && p.size === 'large' ? '345px' : 'max-content'};
    color: ${p => p.color && p.color === 'green' ? '#fff' : p.theme.colors.green};
    border: ${p => p.color && p.color === 'green' ? 'none' : '2px solid' + p.theme.colors.green};
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-size: 1rem;
    line-height: 24px;
    cursor: pointer;
    &:hover{
        background: ${p => p.color && p.color === 'green' ? '#fff' : p.theme.colors.greenLinear};
        color: ${p => p.color && p.color === 'green' ? p.theme.colors.green : '#fff'};
        border: ${p => p.color && p.color === 'green' ? '2px solid' + p.theme.colors.green : 'none'};
    }
`
export const LinkStyled = styled(Link) <Props>`
    background: ${p => p.color && p.color === 'green' ? p.theme.colors.greenLinear : '#fff'};
    max-width: ${p => p.size && p.size === 'large' ? '345px' : 'max-content'};
    color: ${p => p.color && p.color === 'green' ? '#fff' : p.theme.colors.green};
    border: ${p => p.color && p.color === 'green' ? 'none' : '2px solid' + p.theme.colors.green};
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-size: 1rem;
    line-height: 24px;
    display: block;
    text-decoration: none;
    cursor: pointer;
    &:hover{
        background: ${p => p.color && p.color === 'green' ? '#fff' : p.theme.colors.greenLinear};
        color: ${p => p.color && p.color === 'green' ? p.theme.colors.green : '#fff'};
        border: ${p => p.color && p.color === 'green' ? '2px solid' + p.theme.colors.green : 'none'};
    }
`