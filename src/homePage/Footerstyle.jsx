import styled from 'styled-components';
   
export const Box = styled.div`
  padding: 10px 10px;
  background: black;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1
`;
   
export const Container = styled.div`
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // max-width: 1000px;
    // margin: 0 auto;
    /* background: red; */
`
   
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 15px;
  
`;
   
export const Row = styled.div`
  display: flex;
  grid-gap: 50px;
  @media (max-width: 1000px) {grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));}
`;
   
export const FooterLink = styled.a`
  color: #fff;
  margin-bottom: 3px;
  font-size: 18px;
  text-decoration: none;
   
  &:hover {
      color: #008080;
      transition: 200ms ease-in;
  }
`;