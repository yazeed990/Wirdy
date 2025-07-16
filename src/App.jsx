import Grid from "./components/Grid";
import Hero from "./components/Hero";
import Layout from "./components/Layout";
import ProgramSlider from "./components/Slider";

function App() {
  return (
    <Layout>
      <main>
        <Hero />
        <ProgramSlider />
        <Grid />
      </main>
    </Layout>
  );
}

export default App;
