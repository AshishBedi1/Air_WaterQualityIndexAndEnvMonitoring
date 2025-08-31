"use client";

export default function WaterQualityCard({ data }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">💧 Water Quality</h2>
      <ul className="space-y-2 text-gray-600">
        <li>pH: <span className="font-semibold">{data.ph}</span></li>
        <li>TDS: <span className="font-semibold">{data.tds} ppm</span></li>
        <li>Turbidity: <span className="font-semibold">{data.turbidity} NTU</span></li>
        <li>Dissolved Oxygen: <span className="font-semibold">{data.oxygen} mg/L</span></li>
      </ul>
    </div>
  );
}
