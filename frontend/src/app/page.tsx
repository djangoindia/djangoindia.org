import Navbar from "@/components/Navbar/page";
import HeroSection from "@/components/HeroSection/page";
import Join from "@/components/JoinCommunity/Join";
import Main from "@/components/EventSection/Main";
import Update from "@/components/Latestupdate/Update";
import Support from "@/components/Support/Support";
import Footer from "@/components/Footer/Footer";
import WhatIsDjango from "@/components/WhatIsDjango/page";
export default function Home() {
  return (
    <>
      <Navbar/>
      <HeroSection/>
      <WhatIsDjango/>
      <Main />
      <Join />
      <Update />
      <Support />
      <Footer />
    </>
  );
}
