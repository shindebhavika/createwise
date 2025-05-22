import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppSidebar } from "./components/sidebar/app-sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "./components/sidebar/sidebar";
import { Separator } from "./components/ui/separator";
import { MessageCircleCode } from "lucide-react";
import { LoadingSkeleton } from "./components/ui/LoadingSkeleton";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));

function App() {
  return (
    <Router>
      <div className="h-screen w-full flex">
        <SidebarProvider>
          <AppSidebar />

          <SidebarInset className="flex-1 flex flex-col  bg-[#c7d2fe86]">
            {/* Header */}
            <header className="flex h-6 items-center px-4">
              <SidebarTrigger className="" />
              <Separator orientation="vertical" className="mx-4 h-6" />
            </header>

            {/* Main Routes */}
            <div className="p-6 overflow-auto flex-1 bg-white m-4 mr-10">
              <Suspense fallback={<LoadingSkeleton />}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </Suspense>
            </div>

            {/* Fixed button bottom-right */}
            <button
              className="fixed bottom-6 right-6 w-[55px] h-[55px] flex items-center justify-center rounded-full
                         bg-gradient-to-r from-[#3fba06] via-[#32c11c] to-[#4ce13f]
                         bg-[length:300%] bg-left transition-all duration-1000
                         shadow-[5px_5px_10px_rgba(0,0,0,0.16)] hover:bg-right group"
            >
              <MessageCircleCode color="white" size={30} />

              <span className="absolute -top-10 opacity-0 bg-green-400 text-white px-3 py-1 rounded text-sm pointer-events-none whitespace-nowrap transition-opacity duration-500 group-hover:opacity-100">
                Chat
              </span>
            </button>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </Router>
  );
}

export default App;
