import { createRoot } from "react-dom/client";
import router from "./Router/Router";
import { RouterProvider } from "react-router-dom";

//Redux
import { store } from "./Global-Variables/store";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
