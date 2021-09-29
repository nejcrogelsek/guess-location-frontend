import styled from "styled-components";

export const Navbar = styled.header`
    min-height: 96px;
    padding: 30px 35px;
    box-shadow: 0 0 8px ${p => p.theme.colors.shadow};
    ${p => p.theme.screens.large}{
        box-shadow: none;
    }
`
export const NavContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0;
`
interface NavButtonsProps {
    reverse?: string
}
export const NavButtons = styled.div<NavButtonsProps>`
    display: flex;
    flex-wrap: inherit;
    align-items: center;
    justify-content: ${p => p.reverse ? 'flex-end' : 'space-between'};
    width: 100%;
`
export const MenuButtonOpen = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    > svg{
        color: ${p => p.theme.colors.green};
        width: 23px;
        height: 23px;
    }
    ${p => p.theme.screens.large}{
        display: none;
    }
`
export const MenuButtonClose = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    > svg{
        color: ${p => p.theme.colors.green};
        width: 2rem;
        height: 2rem;
    }
`
interface NavMobileProps {
    toggle: string | null
}
export const NavMobile = styled.div<NavMobileProps>`
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    width: 100%;
    transition: 0.25s ease-in-out;
    transform: ${p => p.toggle ? 'translateY(0)' : 'translateY(-100%)'};
    padding: 30px 35px;
    z-index: 100;
`
interface NavbarNavProps {
    isAuth: string | null;
}
export const NavbarNav = styled.div<NavbarNavProps>`
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    > li {
        &:first-child {
            margin: 25px 0 42px 0;
        }
        &:nth-child(2) {
            margin-bottom: 24px;
        }
        .nav-link {
            color: ${p => p.theme.colors.dark};
            font-size: 1.5rem;
            padding: 0;
            > span {
                width: calc(100% - 25px);
                display: inline-block;
            }
        }
        button.nav-link {
            background: transparent;
            border: none;
            width: 100%;
            text-align: left;
        }
        &:last-child {
            button.nav-link {
                color: ${p => p.theme.colors.green};
                > svg > path {
                    fill: ${p => p.theme.colors.green};
                }
            }
        }
    }
    ${p => p.isAuth && `
        > li {
            margin-bottom: 48px;
            &:last-child {
                margin-bottom: 18px;
            }
            &.user-item {
                > a {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    font-size: 1.5rem;
                    text-decoration: none;
                    color: ${p.theme.colors.dark};
                }
                .MuiAvatar-root {
                    width: 48px;
                    height: 48px;
                    margin-right: 32px;
                }
            }
        }
    `}
    ${p => p.theme.screens.large}{
        align-items: center;
        flex-direction: row;
        > li {
            &.login{
                margin: 0;
                width: max-content;
                > a{
                    text-decoration: none;
                    color: #000;
                    font-weight: 500;
                    letter-spacing: 0.3px;
                }
            }
            &.delimeter{
                margin: 0 1rem;
            }
            &.signup{
                margin-bottom: 0;
                width: 137px;
                >a{
                    width: 100%;
                    max-width: 137px;
                }
            }
        }
        ${p => p.isAuth && `
            > li {
                width: max-content;
                margin-bottom: 0;
                margin-right: 24px;
                
                button,
                .nav-link {
                    font-size: 1rem;
                    > span {
                        width: 100%;
                    }
                }
                &.user-item {
                    margin-right: 16px;
                    > a {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        font-size: 1rem;
                    }
                    .MuiAvatar-root {
                        margin-right: 0;
                    }
                }
            }
        `}
    }
`
export const MobileOverlay = styled.div<NavMobileProps>`
    pointer-events: none;
    width: 100%;
    height: 100vh;
    opacity: ${p => p.toggle ? '0.1' : '0'};
    background: #000;
    position: fixed;
    transition: 0.25s ease-out;
    ${p => p.theme.screens.large}{
        display: none;
    }
`