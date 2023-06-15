import HomePageHeaderSection from "../components/HomePageHeaderSection";
import HomePageEventSection from "../components/HomePageEventSection";
import HomePageStorySection from "../components/HomePageStorySection";
import HomePageContactSection from "../components/HomePageContactSection";
import HomePageDonateSection from "../components/HomePageDonateSection";

export default function Home() {
    return (
        <section className="w-full min-h-full">
            <HomePageHeaderSection />
            <HomePageEventSection />
            <HomePageStorySection />
            <HomePageContactSection />
            <HomePageDonateSection />
        </section>
    )
}
