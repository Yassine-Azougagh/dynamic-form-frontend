
import { Outlet } from "react-router";
import './App.css';
import { Toaster } from "@/components/ui/sonner"

function App() {

  return (
      <>
          <div className="min-h-screen w-full relative">
              <div
                  className="absolute inset-0 z-0"
                  style={{
                      background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
                  }}
              />

                <div className="relative pt-20 px-10">
                    <Outlet/>
                </div>
                <Toaster />
          </div>
      </>
  )
}

export default App
