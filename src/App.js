import Pages from "./pages/Pages";
import Hero from "./components/Hero";
import "@splidejs/react-splide/css";
import { BrowserRouter } from "react-router-dom";
import Search from "./components/Search";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Footer from "./components/Footer";
import styled from "styled-components";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <FlexContainer>
          {/* <Search />*/}
          {/* <AppBar /> */}
          <div>
            <Hero />
            <Pages />
          </div>
          <Footer />
        </FlexContainer>
      </BrowserRouter>
    </div>
  );
}

export default App;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh);
  justify-content: space-between;
`;
