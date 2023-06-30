import styled from 'styled-components';
const StreamersListContainer = styled.div`
  background-color: #ccc;
  padding: 15px;
  border-radius: 5px;
  color: #296073;
  font-weight: bold;
  width: 100%;
  min-height: 400px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  justify-content: space-between;
  overflow-x: auto;
  @media (min-width: 1000px) {
    min-width: 700px;
  }
`;

const StreamersListHeading = styled.h2`
  margin-top: 0;
`;

const StyledButton = styled.button`
  background-color: #296073;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 1rem;
  margin-right: 1rem;
  padding: 5px;
  font-weight: bold;

  &:hover {
    opacity: 0.8;
  }
`;
export {StyledButton, StreamersListHeading, StreamersListContainer};