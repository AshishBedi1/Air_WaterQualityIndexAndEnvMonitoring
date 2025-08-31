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

  // fetch function
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
        setError(` No data found for "${selectedCity}". Please try another city.`);
      }
    } catch (err) {
      console.error("Failed to fetch AQI:", err);
      setError(" Something went wrong while fetching air quality. Try again later.");
    }
  }

  useEffect(() => {
    fetchAirQuality(city);
  }, [city]);

  // Chart Data
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
        {/* Brand */}
        <h2 className="text-2xl font-bold mb-10 tracking-wide flex items-center gap-2">
          🌱 Env Monitor
        </h2>

        {/* Menu */}
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
        {view === "air" && (
          <>
            {/* 🔍 Search Bar */}
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

            {/* Error or Data */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6 text-center w-full max-w-lg">
                {error}
              </div>
            )}

            {!error && airData ? (
              <>
                <AirQualityCard data={airData} />

                {/* 📊 Chart */}
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

                  {/* Legend */}
                  <div className="grid grid-cols-3 gap-4 mt-6 text-sm text-center">
                    {airChartData.map((item, i) => (
                      <div key={i}>
                        <div
                          className="w-4 h-4 inline-block mr-2 rounded"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              !error && <p>Loading Air Data...</p>
            )}
          </>
        )}

        {/* Water Section */}
        {view === "water" && <WaterQualityCard data={{}} />}
      </main>
    </div>
  );
}
