import { AppShell } from "@mantine/core";

import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: JSX.Element;
}

const LayoutApp = ({ children }: LayoutProps) => {
  return (
    <AppShell
      styles={{
        main: {
          paddingTop: 0,
          paddingRight: 0,
          paddingLeft: 0,
          paddingBottom: 0,
          minHeight: 0,
        },
      }}
      header={
        <Navbar
          links={[
            { label: "Home", link: "/" },
            { label: "Upload", link: "/upload" },
          ]}
        />
      }
      footer={
        <Footer
         links={[
            { label: "BOT Chain", link: "https://www.botchain.ai" },
            { label: "BOT Chain Explorer", link: "https://scan.botchain.ai" },
          ]}/>
      }
    >
      {children}
    </AppShell>
  );
};

export default LayoutApp;
