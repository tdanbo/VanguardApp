import ReactDOM from "react-dom/client";
import App from "./routes/App.tsx";
import { GameContentProvider } from "./contexts/GameContent.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <GameContentProvider>
    <App />
  </GameContentProvider>,
  // </React.StrictMode>,
);
