import { createBrowserRouter, Navigate } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { Dashboard } from "./components/Dashboard";
import { OrdersList } from "./components/orders/OrdersList";
import { OrderDetail } from "./components/orders/OrderDetail";
import { OrderForm } from "./components/orders/OrderForm";
import { TransporterView } from "./components/transporter/TransporterView";
import { GateControl } from "./components/gate/GateControl";
import { LoadingControl } from "./components/loading/LoadingControl";
import { LoadingList } from "./components/loading/LoadingList";
import { LoadingDetail } from "./components/loading/LoadingDetail";
import { LoadingForm } from "./components/loading/LoadingForm";
import { DocumentsList } from "./components/documents/DocumentsList";
import { DocumentDetail } from "./components/documents/DocumentDetail";
import { Tracking } from "./components/tracking/Tracking";
import { Reports } from "./components/Reports";
import { TransportersList } from "./components/transporters/TransportersList";
import { HelpCenter } from "./components/HelpCenter";
import { Settings } from "./components/Settings";
import { LoginPage } from "./components/auth/LoginPage";
import { AccessPass } from "./components/terminal/AccessPass";
import { useAuth } from "./contexts/AuthContext";

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#F9FBFC]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-sm font-bold text-slate-400 animate-pulse">Loading Workspace...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/terminal-pass/:id",
    Component: AccessPass,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: Dashboard },
      { path: "orders", Component: OrdersList },
      { path: "orders/:id", Component: OrderDetail },
      { path: "orders/new", Component: OrderForm },
      { path: "orders/:id/edit", Component: OrderForm },
      { path: "transporters", Component: TransportersList },
      { path: "gate", Component: GateControl },
      { path: "loading", Component: LoadingControl },
      { path: "loading/:id", Component: LoadingDetail },
      { path: "loading/:id/execute", Component: LoadingForm },
      { path: "documents", Component: DocumentsList },
      { path: "documents/:id", Component: DocumentDetail },
      { path: "tracking", Component: Tracking },
      { path: "reports", Component: Reports },
      { path: "help", Component: HelpCenter },
      { path: "settings", Component: Settings },
    ],
  },
]);
