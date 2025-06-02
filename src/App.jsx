import { TaskProvider } from "./contexts/TaskContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainSection from "./components/MainSection";
import "./App.css";

function App() {
  return (
    <TaskProvider>
      <Header />
      <MainSection />
      <Footer />
    </TaskProvider>
  );
}

export default App;
