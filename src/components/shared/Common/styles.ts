import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 2rem;
`

interface TextProps {
    textCenter?: string
    font?: string
    top?: string
    bottom?: string
    max?: string;
}
export const H1 = styled.h1<TextProps>`
    font-size: ${p => p.font ? '2.1875rem' : '1.5rem'};
    color: ${p => p.theme.colors.green};
    letter-spacing: 0.25px;
    text-align: ${p => p.textCenter ? 'center' : 'left'};
    font-weight: 400;
    max-width: ${p => p.max && p.max};
    margin: ${p => p.max && '0 auto'};
    margin-top: ${p => p.top && p.top};
    margin-bottom: ${p => p.bottom && p.bottom};
`
export const H2 = styled.h2<TextProps>`
    font-size: ${p => p.font ? '2.1875rem' : '1.5rem'};
    color: ${p => p.theme.colors.green};
    letter-spacing: 0.25px;
    text-align: ${p => p.textCenter ? 'center' : 'left'};
    font-weight: 400;
    max-width: ${p => p.max && p.max};
    margin: ${p => p.max && '0 auto'};
    margin-top: ${p => p.top && p.top};
    margin-bottom: ${p => p.bottom && p.bottom};
`
export const P = styled.p<TextProps>`
    font-size: 1rem;
    color: ${p => p.theme.colors.dark};
    text-align: ${p => p.textCenter ? 'center' : 'left'};
    max-width: ${p => p.max && p.max};
    margin: ${p => p.max && '0 auto'};
    margin-top: ${p => p.top && p.top};
    margin-bottom: ${p => p.bottom && p.bottom};
`

