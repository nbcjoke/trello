import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { setupStore } from "./store/store";
import { App } from "./App.tsx";

import "./index.css";

const store = setupStore();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);
