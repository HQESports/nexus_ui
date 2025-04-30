import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Toaster } from "sonner";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { NavigationLoadingProvider } from "@/components/NavigationLoadingProvider";
import { Suspense } from "react";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NavigationLoadingProvider>
      <LoadingOverlay />
      <SidebarProvider>
        <div className="flex w-full h-screen">
          <AppSidebar />
          <main className="flex flex-col flex-1 w-full">
            <Navbar />
            <div className="flex-1 h-[calc(100vh-64px)]">
              <Suspense>
                {children}
              </Suspense>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </NavigationLoadingProvider>
  );
}