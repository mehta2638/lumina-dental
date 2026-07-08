import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileCta } from "@/components/shared/mobile-cta";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Doctors } from "@/components/sections/doctors";
import { BeforeAfter } from "@/components/sections/before-after";
import { Reviews } from "@/components/sections/reviews";
import { WhyUs } from "@/components/sections/why-us";
import { Appointment } from "@/components/sections/appointment";
import { Faq } from "@/components/sections/faq";
import { Contacts } from "@/components/sections/contacts";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Doctors />
        <BeforeAfter />
        <Reviews />
        <WhyUs />
        <Appointment />
        <Faq />
        <Contacts />
      </main>
      <Footer />
      <MobileCta />
    </>
  );
}
