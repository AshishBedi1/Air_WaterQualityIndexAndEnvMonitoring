"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts";

export default function AirQualityCard({ data }) {
  const chartData = [
    { name: "PM2.5", value: data.pm2_5, color: "#F87171" }, 
    { name: "PM10", value: data.pm10, color: "#FBBF24" }, 
    { name: "CO2", value: data.co2, color: "#34D399" }, 
    { name: "NO2", value: data.no2, color: "#60A5FA" }, 
    { name: "SO2", value: data.so2, color: "#A78BFA" }, 
    { name: "O3", value: data.o3, color: "#F472B6" }, 
  ];

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-blue-50 p-8 rounded-3xl shadow-2xl w-full max-w-3xl border border-gray-200">
      {/* Title */}
      <h2 className="text-2xl font-extrabold mb-3 text-gray-800 tracking-wide">
        🌍 Air Quality in <span className="text-indigo-600">{data.city}</span>
      </h2>
      <p className="mb-6 text-gray-700 text-lg">
        AQI:{" "}
        <span
          className={`px-3 py-1 rounded-full font-semibold shadow-sm ${
            data.aqi <= 50
              ? "bg-green-100 text-green-700"
              : data.aqi <= 100
              ? "bg-yellow-100 text-yellow-700"
              : data.aqi <= 200
              ? "bg-orange-100 text-orange-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {data.aqi}
        </span>
      </p>

      {/* Top Circle Charts */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-10">
        {chartData.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center bg-white rounded-2xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition"
          >
            <ResponsiveContainer width={110} height={110}>
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="100%"
                barSize={10}
                data={[{ name: item.name, value: item.value, fill: item.color }]}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar
                  minAngle={15}
                  background
                  clockWise
                  dataKey="value"
                  fill={item.color}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <p className="mt-3 text-sm font-bold text-gray-700">{item.name}</p>
            <p className="text-xs text-gray-500">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Bottom Bar Chart */}
      <div className="w-full h-80 bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 text-gray-700 text-center">
          📊 Pollutant Levels
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip />
            <Legend />
            {chartData.map((entry, i) => (
              <Bar
                key={i}
                dataKey="value"
                fill={entry.color}
                radius={[10, 10, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
