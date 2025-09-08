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

export default function WaterQualityCard({ data }) {
  const chartData = [
    { name: "pH", value: data.ph, color: "#34D399" }, 
    { name: "Turbidity (NTU)", value: data.turbidity, color: "#60A5FA" }, 
    { name: "Hardness (mg/L)", value: data.hardness, color: "#FBBF24" }, 
    { name: "DO (mg/L)", value: data.dissolvedOxygen, color: "#A78BFA" }, 
    { name: "Nitrate (mg/L)", value: data.nitrate, color: "#F87171" }, 
    { name: "TDS (mg/L)", value: data.tds, color: "#F472B6" }, 
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-green-50 p-8 rounded-3xl shadow-2xl w-full max-w-3xl border border-gray-200">
      {/* Title */}
      <h2 className="text-2xl font-extrabold mb-3 text-gray-800 tracking-wide">
        💧 Water Quality in <span className="text-indigo-600">{data.state}</span>
      </h2>
      <p className="mb-6 text-gray-700 text-lg">
        WQI:{" "}
        <span
          className={`px-3 py-1 rounded-full font-semibold shadow-sm ${
            data.wqi <= 50
              ? "bg-green-100 text-green-700"
              : data.wqi <= 100
              ? "bg-yellow-100 text-yellow-700"
              : data.wqi <= 200
              ? "bg-orange-100 text-orange-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {data.wqi}
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
          📊 Water Quality Parameters
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
