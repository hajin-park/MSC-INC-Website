import HomePageHeaderSection from "../components/HomePage/HomePageHeaderSection";
import HomePageEventSection from "../components/HomePage/HomePageEventSection";
import HomePageStorySection from "../components/HomePage/HomePageStorySection";
import HomePageContactSection from "../components/HomePage/HomePageContactSection";
import HomePageDonateSection from "../components/HomePage/HomePageDonateSection";

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
