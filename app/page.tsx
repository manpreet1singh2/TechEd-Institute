import HeroSlider from "@/components/hero-slider"
import CoursesPreview from "@/components/courses-preview"
import WhyChooseUs from "@/components/why-choose-us"
import StatsCounter from "@/components/stats-counter"
import ApplyNowModal from "@/components/apply-now-modal"
import CounterDebug from "@/components/counter-debug"

export default function HomePage() {
  return (
    <main>
      <CounterDebug />
      <HeroSlider />
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Welcome to TechMindsHub</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Welcome to TechMindsHub, your gateway to industry-ready skills in technology and management. Explore our 11
            cutting-edge courses designed for real-world success.
          </p>
        </div>
      </section>
      <StatsCounter />
      <CoursesPreview />
      <WhyChooseUs />
      <ApplyNowModal />
    </main>
  )
}
