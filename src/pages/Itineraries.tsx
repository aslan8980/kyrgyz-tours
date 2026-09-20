import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Itineraries = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-32 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold">
            Itineraries
          </h1>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Itineraries;