import styled from "styled-components";

interface CardProps {
    image: string
    user: string
}

export const CardStyled = styled.div<CardProps>`
    max-width: 420px;
    width: 100%;
    height: 236px;
    display: flex;
    background-image: url(${p => p.image});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 1rem;
    overflow: hidden;
    .background{
        background: ${p => p.theme.colors.greenLinearOpacity};
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.25s ease-out;
        .bi-lock{
            width: 50px;
            height: 64px;
        }
        .error-distance{
            font-size: 1.5rem;
            font-weight: 700;
            color: #fff;
        }
        ${p => p.user && p.user === 'true' ?
        `
            > button{
                display: none;
            }
            &:hover{
                background: ${p.theme.colors.greenLinear};
                .error-distance{
                    display: none;
                }
                > button{
                    display: block;
                }
            }
        ` : null
    }
    }
`