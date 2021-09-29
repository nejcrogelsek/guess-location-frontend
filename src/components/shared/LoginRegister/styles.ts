import styled from "styled-components"
import BackgroundImage from "../../../assets/images/background.png"

export const LoginRegisterContainer = styled.div`
  ${p => p.theme.screens.large}{
    > header{
      display: none;
    }
  }
`

export const LoginRegisterWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 100px);
    background-image: url(${BackgroundImage});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    padding: 0 35px;
    ${p => p.theme.screens.large}{
        background-image: none;
        justify-content: flex-start;
        height: 100vh;
        overflow: hidden;
        padding: 0;
    }
`
interface LoginRegisterDesktopBackgroundProps {
  image?: string | null;
}
export const LoginRegisterDesktopBackground = styled.div<LoginRegisterDesktopBackgroundProps>`
    display: none;
    position: relative;
    background-image: url(${p => p.image});
    width: 60%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    > svg{
      position: absolute;
      top: 50%;
      left: 52%;
      transform: translate(-50%,-50%);
    }
    ${p => p.theme.screens.large}{
        display: block;
    }
`
interface LoginRegisterContentWrapProps {
  isRegister?: string | null;
}
export const LoginRegisterContentWrap = styled.div<LoginRegisterContentWrapProps>`
  padding: 20px 15px;
  border-radius: 2rem;
  background: #fff;
  text-align: center;
  width: 40%;
  margin: ${p => p.isRegister ? '56px 0 100px' : '0'};
  >a{
      display: none;
  }
  >p{
      line-height: 24px;
      max-width: 375px;
      margin: 0 auto;
  }
  ${p => p.theme.screens.xxsmall}{
      padding: 20px 30px;
  }
  ${p => p.theme.screens.large}{
    margin-top: ${p => p.isRegister ? '160px' : '0'};
    >a{
      display: block;
      position: absolute;
      top: 45px;
      left: 70;
    }   
  }
`
export const LoginRegisterTitle = styled.h1`
    font-size: 2.1875rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
`
export const LoginRegisterForm = styled.form`
    text-align: left;
    max-width: 420px;
    margin: 1rem auto 0;
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
`
interface FormElementProps {
  image?: string | null;
}
export const FormElement = styled.div<FormElementProps>`
  margin-bottom: 1rem;
      .form-text {
        font-size: 0.75rem;
        color: red;
      }
      ${p => p.image ? `
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
            box-shadow: 0px 0px 8px ${p.theme.colors.shadow};
          }
        }
      ` : null}
`
export const FormControl = styled.input`
  border-radius: 32px;
  border: 2px solid ${p => p.theme.colors.green};
  padding: 8px 30px 8px 24px;
  height: 40px;
  width: 100%;
  margin-top: 0.5rem;
  &:focus {
    box-shadow: none;
  }
`
export const FormButtonsWrap = styled.div`
  margin-bottom: 1rem;
`
export const FormLabel = styled.label`
  font-size: 0.75rem;
  font-weight: 500;
  display: block;
`
export const FormErrorText = styled.span`
  font-size: 0.75rem;
  margin: 0.5rem 0;
  font-weight: 500;
  color: red;
  display: block;
`
export const FormGoTo = styled.div`
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
          transition: 0.25s ease-out;
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
`