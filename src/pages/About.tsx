import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-32 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold">
            About Us
          </h1>

          <p className="mt-6 text-lg">
            Discover Kyrgyzstan with us.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;