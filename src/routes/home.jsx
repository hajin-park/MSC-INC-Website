import HomePageHeaderSection from "../components/HomePageHeaderSection";
import HomePageEventSection from "../components/HomePageEventSection";
import HomePageStorySection from "../components/HomePageStorySection";
import HomePageContactSection from "../components/HomePageContactSection";
import HomePageDonateSection from "../components/HomePageDonateSection";

export default function Home() {
    return (
        <main className="w-full flex-grow">
            <HomePageHeaderSection />
            <HomePageEventSection />
            <HomePageStorySection />
            <HomePageContactSection />
            <HomePageDonateSection />
        </main>
    )
}
