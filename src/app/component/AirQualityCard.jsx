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
    { name: "PM2.5", value: data.pm2_5 },
    { name: "PM10", value: data.pm10 },
    { name: "CO2", value: data.co2 },
    { name: "NO2", value: data.no2 },
    { name: "SO2", value: data.so2 },
    { name: "O3", value: data.o3 },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-3xl">
      <h2 className="text-xl font-bold mb-4">🌍 Air Quality in {data.city}</h2>
      <p className="mb-6 text-gray-600">
        AQI:{" "}
        <span
          className={`font-semibold ${
            data.aqi <= 50
              ? "text-green-600"
              : data.aqi <= 100
              ? "text-yellow-600"
              : data.aqi <= 200
              ? "text-orange-600"
              : "text-red-600"
          }`}
        >
          {data.aqi}
        </span>
      </p>

      {/* Top Circle Charts */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {chartData.map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <ResponsiveContainer width={120} height={120}>
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="100%"
                barSize={10}
                data={[{ name: item.name, value: item.value }]}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar
                  minAngle={15}
                  background
                  clockWise
                  dataKey="value"
                  fill="#4F46E5"
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <p className="mt-2 text-sm font-semibold">{item.name}</p>
            <p className="text-xs text-gray-600">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Bottom Bar Chart */}
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#4F46E5" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
