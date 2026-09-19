import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { CallButton } from "@/components/common/CallButton";
import { SiteSettingsProvider } from "@/contexts/SiteSettingsContext";
import { getSiteSettings } from "@/services/settings.service";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <SiteSettingsProvider value={settings}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
        <CallButton />
        <WhatsAppButton />
      </div>
    </SiteSettingsProvider>
  );
}
