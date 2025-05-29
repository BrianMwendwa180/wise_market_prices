
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const dummyMarkets = [
  { name: "Central Market", address: "345 Farm Lane", distance: "2.1 km" },
  { name: "Fresh Mart", address: "12 River Rd", distance: "4.3 km" },
  { name: "AgroBuyers Co.", address: "77 Rural St", distance: "5.9 km" },
  { name: "Green Valley Co-op", address: "501 Valley Turn", distance: "7.2 km" },
  { name: "Veggie Direct", address: "23 Main Bazaar", distance: "8.5 km" },
  { name: "Sunrise Wholesale", address: "63 Sunrise Ave", distance: "12.7 km" },
  { name: "Organic Outreach", address: "998 Orchard Road", distance: "13.1 km" },
  { name: "Farmer's Connect", address: "114 Market Sq", distance: "16.0 km" },
  { name: "Harvest Hub", address: "21 Granary Row", distance: "20.4 km" },
];

const FindBuyers = () => (
  <div className="container mx-auto py-10">
    <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Nearby Markets & Buyers</h2>
    <div className="grid gap-6 md:grid-cols-3 w-full max-w-4xl mx-auto">
      {dummyMarkets.map((item) => (
        <Card key={item.name} className="shadow-lg hover:shadow-xl transition-shadow border-green-400">
          <CardContent className="py-6">
            <div className="flex items-center mb-1 text-green-700 font-semibold">
              <MapPin className="mr-2 w-5 h-5 text-green-800" />{item.name}
            </div>
            <div className="text-gray-700">{item.address}</div>
            <div className="text-xs text-yellow-700 mt-2">Distance: {item.distance}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default FindBuyers;

