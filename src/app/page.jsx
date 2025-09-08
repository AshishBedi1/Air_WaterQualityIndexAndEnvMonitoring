
"use client";

import { useEffect, useState } from "react";
import AirQualityCard from "./component/AirQualityCard";
import WaterQualityCard from "./component/WaterQualityCard";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const [view, setView] = useState("air");

  const [airData, setAirData] = useState(null);
  const [city, setCity] = useState("mumbai");
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState(null);

  const [waterData, setWaterData] = useState(null);
  const [waterSearch, setWaterSearch] = useState(""); 
  const [filteredWaterData, setFilteredWaterData] = useState(null);

  const mockWaterData = [
    { state: "Andhra Pradesh", wqi: 85, ph: 7.2, turbidity: 3, hardness: 180, dissolvedOxygen: 6, nitrate: 4, tds: 260 },
    { state: "Arunachal Pradesh", wqi: 60, ph: 7.0, turbidity: 2, hardness: 120, dissolvedOxygen: 7, nitrate: 2, tds: 180 },
    { state: "Assam", wqi: 95, ph: 6.8, turbidity: 5, hardness: 190, dissolvedOxygen: 5, nitrate: 5, tds: 270 },
    { state: "Bihar", wqi: 110, ph: 7.3, turbidity: 6, hardness: 220, dissolvedOxygen: 5, nitrate: 8, tds: 320 },
    { state: "Chhattisgarh", wqi: 80, ph: 7.1, turbidity: 3, hardness: 170, dissolvedOxygen: 6, nitrate: 3, tds: 240 },
    { state: "Goa", wqi: 65, ph: 7.0, turbidity: 2, hardness: 150, dissolvedOxygen: 7, nitrate: 2, tds: 200 },
    { state: "Gujarat", wqi: 120, ph: 7.5, turbidity: 5, hardness: 280, dissolvedOxygen: 4.5, nitrate: 9, tds: 400 },
    { state: "Haryana", wqi: 130, ph: 7.6, turbidity: 6, hardness: 300, dissolvedOxygen: 4, nitrate: 10, tds: 450 },
    { state: "Himachal Pradesh", wqi: 70, ph: 7.2, turbidity: 2, hardness: 160, dissolvedOxygen: 7, nitrate: 3, tds: 210 },
    { state: "Jharkhand", wqi: 100, ph: 7.3, turbidity: 5, hardness: 220, dissolvedOxygen: 5, nitrate: 6, tds: 310 },
    { state: "Karnataka", wqi: 95, ph: 7.4, turbidity: 4, hardness: 200, dissolvedOxygen: 5.5, nitrate: 5, tds: 280 },
    { state: "Kerala", wqi: 60, ph: 7.0, turbidity: 2, hardness: 150, dissolvedOxygen: 7, nitrate: 2, tds: 200 },
    { state: "Madhya Pradesh", wqi: 105, ph: 7.3, turbidity: 5, hardness: 240, dissolvedOxygen: 5, nitrate: 7, tds: 330 },
    { state: "Maharashtra", wqi: 115, ph: 7.2, turbidity: 6, hardness: 250, dissolvedOxygen: 5, nitrate: 8, tds: 350 },
    { state: "Manipur", wqi: 75, ph: 7.1, turbidity: 3, hardness: 160, dissolvedOxygen: 6, nitrate: 3, tds: 230 },
    { state: "Meghalaya", wqi: 70, ph: 7.0, turbidity: 3, hardness: 150, dissolvedOxygen: 7, nitrate: 2, tds: 220 },
    { state: "Mizoram", wqi: 65, ph: 7.0, turbidity: 2, hardness: 140, dissolvedOxygen: 7, nitrate: 2, tds: 210 },
    { state: "Nagaland", wqi: 68, ph: 7.1, turbidity: 2, hardness: 150, dissolvedOxygen: 7, nitrate: 2, tds: 200 },
    { state: "Odisha", wqi: 100, ph: 7.3, turbidity: 5, hardness: 220, dissolvedOxygen: 5, nitrate: 6, tds: 310 },
    { state: "Punjab", wqi: 125, ph: 7.5, turbidity: 6, hardness: 280, dissolvedOxygen: 4.5, nitrate: 9, tds: 390 },
    { state: "Rajasthan", wqi: 140, ph: 7.8, turbidity: 7, hardness: 320, dissolvedOxygen: 4, nitrate: 11, tds: 500 },
    { state: "Sikkim", wqi: 65, ph: 7.0, turbidity: 2, hardness: 140, dissolvedOxygen: 7, nitrate: 2, tds: 190 },
    { state: "Tamil Nadu", wqi: 110, ph: 7.4, turbidity: 5, hardness: 240, dissolvedOxygen: 5, nitrate: 7, tds: 330 },
    { state: "Telangana", wqi: 105, ph: 7.3, turbidity: 5, hardness: 230, dissolvedOxygen: 5, nitrate: 7, tds: 320 },
    { state: "Tripura", wqi: 85, ph: 7.2, turbidity: 3, hardness: 170, dissolvedOxygen: 6, nitrate: 4, tds: 250 },
    { state: "Uttar Pradesh", wqi: 135, ph: 7.6, turbidity: 7, hardness: 310, dissolvedOxygen: 4, nitrate: 10, tds: 480 },
    { state: "Uttarakhand", wqi: 75, ph: 7.1, turbidity: 3, hardness: 160, dissolvedOxygen: 6, nitrate: 3, tds: 220 },
    { state: "West Bengal", wqi: 115, ph: 7.3, turbidity: 6, hardness: 260, dissolvedOxygen: 5, nitrate: 8, tds: 360 },

    // Union Territories
    { state: "Andaman and Nicobar Islands", wqi: 60, ph: 7.1, turbidity: 2, hardness: 140, dissolvedOxygen: 7, nitrate: 2, tds: 180 },
    { state: "Chandigarh", wqi: 100, ph: 7.3, turbidity: 5, hardness: 220, dissolvedOxygen: 5, nitrate: 6, tds: 310 },
    { state: "Dadra and Nagar Haveli and Daman and Diu", wqi: 95, ph: 7.2, turbidity: 4, hardness: 200, dissolvedOxygen: 5.5, nitrate: 5, tds: 290 },
    { state: "Delhi", wqi: 130, ph: 6.9, turbidity: 7, hardness: 300, dissolvedOxygen: 4, nitrate: 10, tds: 450 },
    { state: "Jammu and Kashmir", wqi: 85, ph: 7.1, turbidity: 3, hardness: 170, dissolvedOxygen: 6, nitrate: 4, tds: 240 },
    { state: "Ladakh", wqi: 70, ph: 7.0, turbidity: 2, hardness: 150, dissolvedOxygen: 7, nitrate: 2, tds: 200 },
    { state: "Lakshadweep", wqi: 65, ph: 7.1, turbidity: 2, hardness: 140, dissolvedOxygen: 7, nitrate: 2, tds: 180 },
    { state: "Puducherry", wqi: 90, ph: 7.2, turbidity: 4, hardness: 190, dissolvedOxygen: 5.5, nitrate: 5, tds: 270 },
  ];

  useEffect(() => {
    if (waterSearch.trim() === "") {
      setFilteredWaterData(mockWaterData[0]);
    } else {
      const found = mockWaterData.find(item =>
        item.state.toLowerCase().includes(waterSearch.trim().toLowerCase())
      );
      setFilteredWaterData(found || null);
    }
  }, [waterSearch]);

  async function fetchAirQuality(selectedCity) {
    try {
      setError(null);
      setAirData(null);

      const res = await fetch(
        `https://api.waqi.info/feed/${selectedCity}/?token=${process.env.NEXT_PUBLIC_WAQI_TOKEN}`
      );
      const json = await res.json();

      if (json.status === "ok") {
        setAirData({
          aqi: json.data.aqi,
          pm2_5: json.data.iaqi.pm25?.v || "N/A",
          pm10: json.data.iaqi.pm10?.v || "N/A",
          co2: json.data.iaqi.co?.v || "N/A",
          no2: json.data.iaqi.no2?.v || "N/A",
          so2: json.data.iaqi.so2?.v || "N/A",
          o3: json.data.iaqi.o3?.v || "N/A",
          city: json.data.city.name,
        });
      } else {
        setError(`No data found for "${selectedCity}". Please try another city.`);
      }
    } catch (err) {
      console.error("Failed to fetch AQI:", err);
      setError("Something went wrong while fetching air quality. Try again later.");
    }
  }

  // ---- LIFECYCLE ----
  useEffect(() => {
    fetchAirQuality(city);
  }, [city]);

  // ---- AIR CHART DATA ----
  const airChartData = airData
    ? [
        { name: "AQI", value: airData.aqi, color: "#6366F1" },
        { name: "PM2.5", value: airData.pm2_5, color: "#EF4444" },
        { name: "PM10", value: airData.pm10, color: "#F59E0B" },
        { name: "CO₂", value: airData.co2, color: "#10B981" },
        { name: "NO₂", value: airData.no2, color: "#3B82F6" },
        { name: "SO₂", value: airData.so2, color: "#8B5CF6" },
        { name: "O₃", value: airData.o3, color: "#EC4899" },
      ]
    : [];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900/95 backdrop-blur-lg text-white flex flex-col p-6 shadow-2xl rounded-r-3xl">
        <h2 className="text-2xl font-bold mb-10 tracking-wide flex items-center gap-2">
          🌱 Env Monitor
        </h2>

        <nav className="flex flex-col gap-4">
          <button
            onClick={() => setView("air")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-all duration-300
              ${view === "air"
                ? "bg-indigo-600 shadow-lg scale-105"
                : "hover:bg-gray-800 hover:scale-105"
              }`}
          >
            <span className="text-xl">🌍</span> Air Quality
          </button>

          <button
            onClick={() => setView("water")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-all duration-300
              ${view === "water"
                ? "bg-sky-500 shadow-lg scale-105"
                : "hover:bg-gray-800 hover:scale-105"
              }`}
          >
            <span className="text-xl">💧</span> Water Quality
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 flex flex-col items-center overflow-y-auto">
        {/* AIR SECTION */}
        {view === "air" && (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchInput.trim() !== "") setCity(searchInput.trim());
              }}
              className="mb-6 flex w-full max-w-lg"
            >
              <input
                type="text"
                placeholder="Enter city name (e.g. Delhi)"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700"
              >
                Search
              </button>
            </form>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6 text-center w-full max-w-lg">
                {error}
              </div>
            )}

            {!error && airData ? (
              <>
                <AirQualityCard data={airData} />
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 mt-6">
                  <h3 className="text-xl font-semibold mb-4 text-center">
                    🌍 Air Quality Breakdown ({airData.city})
                  </h3>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={airChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      {airChartData.map((entry, i) => (
                        <Bar key={i} dataKey="value" fill={entry.color} />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </>
            ) : (
              !error && <p>Loading Air Data...</p>
            )}
          </>
        )}

        {/* WATER SECTION */}
        {view === "water" && (
          <>
            {/* Water Search */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mb-6 flex w-full max-w-lg"
            >
              <input
                type="text"
                placeholder="Enter State/UT name (e.g. Delhi)"
                value={waterSearch}
                onChange={(e) => setWaterSearch(e.target.value)}
                className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                type="button"
                onClick={() => {}} // optional if you want a button to trigger filtering
                className="px-4 py-2 bg-sky-500 text-white rounded-r-lg hover:bg-sky-600"
              >
                Search
              </button>
            </form>

            {filteredWaterData ? (
              <WaterQualityCard data={filteredWaterData} />
            ) : (
              <p className="text-gray-600 text-lg">No data found for "{waterSearch}"</p>
            )}
          </>
        )}
      </main>
    </div>
  );
}
