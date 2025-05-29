
import { Card, CardContent } from "@/components/ui/card";

const dummyPrices = [
  { crop: "Tomatoes", price: "₹30/kg", market: "Central Market", updated: "Today" },
  { crop: "Potatoes", price: "₹18/kg", market: "East Side Market", updated: "Today" },
  { crop: "Onions", price: "₹22/kg", market: "West Market", updated: "Today" },
  { crop: "Cabbage", price: "₹15/kg", market: "Green Valley Market", updated: "Today" },
  { crop: "Carrots", price: "₹28/kg", market: "Sunrise Market", updated: "Today" },
  { crop: "Brinjal", price: "₹25/kg", market: "Central Market", updated: "Today" },
  { crop: "Beans", price: "₹35/kg", market: "Fresh Market", updated: "Yesterday" },
  { crop: "Chillies", price: "₹40/kg", market: "Veggie Direct", updated: "Today" },
  { crop: "Bottle Gourd", price: "₹16/kg", market: "Agro Mart", updated: "Today" },
  { crop: "Mangoes", price: "₹50/kg", market: "Main Bazaar", updated: "Today" },
  { crop: "Lady Finger", price: "₹30/kg", market: "East Side Market", updated: "Yesterday" },
  { crop: "Cucumber", price: "₹20/kg", market: "Green Valley Market", updated: "Today" },
];

const MarketPrices = () => (
  <div className="container mx-auto py-10">
    <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Current Local Market Prices</h2>
    <div className="grid gap-6 md:grid-cols-3 w-full max-w-4xl mx-auto">
      {dummyPrices.map((item) => (
        <Card key={item.crop} className="shadow-lg hover:shadow-xl transition-shadow border-green-500">
          <CardContent className="py-6">
            <div className="text-xl font-bold text-green-700 mb-2">{item.crop}</div>
            <div className="text-2xl text-yellow-600 font-semibold mb-1">{item.price}</div>
            <div className="text-gray-600">{item.market}</div>
            <div className="text-xs text-gray-500 mt-2">Updated: {item.updated}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default MarketPrices;
