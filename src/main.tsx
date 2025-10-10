import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store";

import "@/assets/scss/reset.scss";
import "@/assets/scss/fonts.scss";
import "@/assets/scss/btns.scss";
import "@/assets/scss/captions.scss";
import "@/assets/scss/base.scss"; // Глобальные стили импортирую вручную

import App from "./components/App/App.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
