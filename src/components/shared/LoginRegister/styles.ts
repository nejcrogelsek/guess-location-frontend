import styled from "styled-components"
import BackgroundImage from "../../../assets/images/background.png"

interface LoginRegisterWrapProps {
  isRegister?: string | null;
}

export const LoginRegisterWrap = styled.div<LoginRegisterWrapProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 100px);
    background-image: url(${BackgroundImage});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    padding: 0 35px;
    .content{
        padding: 20px 15px;
        border-radius: 2rem;
        background: #fff;
        text-align: center;
        margin: ${p => p.isRegister ? '56px 0 100px' : '0'};
        >a{
            display: none;
        }
        >p{
            line-height: 24px;
        }
        ${p => p.theme.screens.xxsmall}{
            padding: 20px 30px;
        }
    }
    .background{
        display: none;
    }
    ${p => p.theme.screens.large}{
        background-image: none;
    }
`

export const LoginRegisterTitle = styled.h1`
    font-size: 2.1875rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
`
export const LoginRegisterForm = styled.form`
    margin-top: 1rem;
    text-align: left;
    .row {
      display: flex;
      .col{
        &:first-child {
          padding-right: 7.5px;
        }
        &:last-child {
          padding-left: 7.5px;
        }
      }
    }
    .form-element {
      margin-bottom: 1rem;
      .form-label {
        font-size: 0.75rem;
        margin-bottom: 0.5rem;
        font-weight: 500;
      }
      .form-control {
        border-radius: 32px;
        border: 2px solid ${p => p.theme.colors.green};
        padding: 8px 30px 8px 24px;
        height: 40px;
        width: 100%;
        margin-top: 0.5rem;
        &:focus {
          box-shadow: none;
        }
      }
      .form-text {
        font-size: 0.75rem;
        color: red;
      }
      &.image {
        position: relative;
        margin: 0 auto 1rem;
        width: 64px;
        > input[type="file"] {
          position: absolute;
          left: 0;
          top: 0;
          z-index: 10;
          opacity: 0;
          width: 64px;
          height: 64px;
          &:hover {
            cursor: pointer;
            + label {
              &::before {
                border-color: #000 !important;
              }
            }
          }
        }
        > label {
          .MuiAvatar-root {
            width: 64px;
            height: 64px;
            box-shadow: 0px 0px 8px ${p => p.theme.colors.shadow};
          }
        }
      }
    }
    .buttons {
      margin-bottom: 1rem;
    }
    .goto {
      display: flex;
      align-items: center;
      justify-content: space-between;
      > p {
        margin: 0;
        font-size: 0.85rem;
      }
      > a {
          min-width: 65px;
          font-size: 0.85rem;
          margin-left: 0.5rem;
          text-decoration: none;
          text-align: right;
          color: #000;
          &:hover {
              color: ${p => p.theme.colors.green};
          }
      }
      ${p => p.theme.screens.xxsmall}{
          >a,
          > p {
              font-size: 1rem;
          }
      }
    }
`