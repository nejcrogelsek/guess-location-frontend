import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 2rem;
`

interface TitleProps {
    textCenter?: string | null;
}
export const TitleH1 = styled.div<TitleProps>`
    font-size: 2.1875rem;
    color: ${p => p.theme.colors.green};
    letter-spacing: 0.25px;
    text-align: ${p => p.textCenter ? 'center' : 'left'};
    font-weight: 400;
`
export const TitleH2 = styled.div<TitleProps>`
    font-size: 2.1875rem;
    color: ${p => p.theme.colors.green};
    letter-spacing: 0.25px;
    text-align: ${p => p.textCenter ? 'center' : 'left'};
    font-weight: 400;
`
export const TitleH2Small = styled.div<TitleProps>`
    font-size: 1.5rem;
    color: ${p => p.theme.colors.green};
    letter-spacing: 0.25px;
    text-align: ${p => p.textCenter ? 'center' : 'left'};
    font-weight: 400;
`

