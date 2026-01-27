import styled from "styled-components";

export const CardContainer = styled.div`
  background-color: ${props => props.theme['bg-dark']};
  height: 340px;
  width: 365px;

  padding: 2rem;
  border: 2px solid ${props => props.theme['background']};
  border-radius: 52px;
  transition: border 0.3s;
  
  &:hover{
    border: 2px solid ${props => props.theme['bg-golden']}
  }

  img{
    height:190px;
    width: 293px;

    border-radius: 32px;
  }

  a{
    text-decoration: none;
  }
`;

export const CardInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;

  margin-top: 0.5rem;

  h3{
    font-size: 1.5rem;
    text-decoration: none;
    font-family: 'Roboto', sans-serif;
    color: ${props => props.theme['paragraph']};
  }
  p{
    font-size: 0.8rem;
    text-align: center;
  }
`;