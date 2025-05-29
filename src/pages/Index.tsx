
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { CalendarCheck, MapPin } from "lucide-react";

const Index = () => {
  return (
    <>
      <NavBar />
      <section className="bg-gradient-to-br from-green-50 to-green-200 min-h-screen flex flex-col items-center justify-center px-2 pt-16">
        <div className="max-w-2xl text-center space-y-6">
          <h1 className="text-5xl font-extrabold text-green-800 mb-2 drop-shadow-lg">FarmWise Market Connect</h1>
          <p className="text-xl text-gray-700 mb-2">
            Empowering small-scale farmers with timely <span className="font-bold text-yellow-700">market price insights</span> and connections to local buyers.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
            <Link to="/market-prices" className="flex items-center justify-center px-7 py-3 rounded-lg bg-green-700 text-white font-semibold shadow-lg hover:bg-green-800 hover:scale-105 transition transform duration-150">
              <CalendarCheck className="mr-2 w-5 h-5" /> View Market Prices
            </Link>
            <Link to="/find-buyers" className="flex items-center justify-center px-7 py-3 rounded-lg bg-yellow-500 text-green-900 font-semibold shadow-lg hover:bg-yellow-600 hover:scale-105 transition transform duration-150">
              <MapPin className="mr-2 w-5 h-5" /> Find Nearby Buyers
            </Link>
          </div>
          <div className="mt-10 md:mt-12">
            <p className="text-lg text-green-700 mb-3">
              <span className="font-bold">Alerts Coming Soon:</span> Get notified instantly when prices are right for you!
            </p>
            <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              Safe • Free • Farmer–Friendly
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
