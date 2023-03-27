import styled from "styled-components";
import Resource from "./../Resource";

const Container = styled.div`
  background: black;
  color: white;

  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 12em 1fr;
  height: 100vh;
`;

const Header = styled.header`
  background: black;
  color: white;
  grid-column: span 2;
`;

const Sidebar = styled.div`
  background: red;
  color: black;
`;

const Main = styled.div`
  background: yellow;
  color: black;
`;

const Scheduler = () => {
  return (
    <Container>
      <Header>header</Header>
      <Sidebar>
        <Resource />
      </Sidebar>
      <Main>content</Main>
    </Container>
  );
};

export default Scheduler;
