import styled from "styled-components"

export const FormBox = styled.section`
  background-color: #f1eded;
  height: ${props => props.size === 'big' ? '55vh' : '35vh'};
  width: ${props => props.size === 'big' ? '50%' : '30%'};
  padding: 0;
  justify-content: center;
  margin: 5px auto;
  border-radius: .4rem;

  @media screen and (max-width: 700px) {
    width: 95%;
    height: ${props => props.size === 'big' ? '80vh' : '60vh'};
  }

  @media screen and (min-width: 701px) and (max-width: 800px) {
    width: 60%;
  }

  @media screen and (min-width: 801px) and (max-width: 1200px) {
    width: 45%;
  }
`;

export const FormHeader = styled.header`
  margin: 0 0 50px 0;
  text-transform: uppercase;
  line-height: 1.6em;
  background: #f3daa2;
  padding: 20px;
  font-size: 1.3em;
  border-radius: .4rem .4rem 0 0;
`

export const Form = styled.form`
  margin: 80px 0;
`

export const InputField = styled.input`
  display: block;
  margin: 20px auto;
  height: 40px;
  width: 75%;
  text-align: center;
  font-size: 18px;
  border-radius: .4rem;
  border: ${props => props.error && props.error.length > 0 ? '1px solid red' : '1px solid #dcd3c5'};

  &::placeholder {
    text-align: center;
    font-size: 18px;
    color: ${props => props.error && props.error.length > 0 ? 'red' : '#86837e'};
  }
`

export const Submit = styled.button`
  display: block;
  margin: 50px auto;
  height: 60px;
  width: 90%;
  background: #dcb253;
  font-size: 18px;
  text-transform: uppercase;
  border-radius: .4rem;

  &:hover {
    background: #eaab1c;
    cursor: pointer;
    font-weight: bold;
  }
`

export const FormError = styled.div`
  color: #ce3b3b;
  font-size: 14px;
  font-style: italic;
`
