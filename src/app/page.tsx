import { WindowManagerProvider } from "@/components/desktop/WindowManager";
import { Desktop } from "@/components/desktop/Desktop";

export default function Home() {
  return (
    <WindowManagerProvider>
      <Desktop />
    </WindowManagerProvider>
  );
}
