import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
function App() {

  return (
    <div>
      <RouterProvider router={router}/>
      <Toaster toastOptions={{
        duration: 5000,
        style: {
          background: "#333",
          color: "#fff",
        },
      
      }}/>
    </div>
  ) 
}

export default App
