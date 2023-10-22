import styled from "@emotion/styled";


const StyledScrollHideDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 120%;
  overflow-y: auto;
  width: 100%;

  &::-webkit-scrollbar {
    display: none; // Chrome, Safari, and Opera
  }
`;


export default StyledScrollHideDiv;