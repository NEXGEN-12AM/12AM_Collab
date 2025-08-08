"use client";

import { useSearchParams } from "next/navigation";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Guest";
  const address = searchParams.get("address") || "Unknown Address";
  const total = searchParams.get("total") || "0.00";

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
      {/* Success Message */}
      <h1 className="text-4xl font-bold text-green-600 flex items-center space-x-2">
        <span>PURCHASE COMPLETE</span>
        <span>✅</span>
      </h1>

      {/* Receipt Card */}
      <div className="bg-white shadow-md rounded-lg p-8 mt-6 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-gray-700">🧾 RECEIPT</h2>
        
        <div className="space-y-3 text-lg text-gray-600">
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Address:</strong> {address}</p>
        </div>

        {/* Divider */}
        <div className="border-t my-4"></div>

        {/* Total Payment */}
        <p className="text-xl font-bold text-gray-700">
          TOTAL PAID: <span className="text-green-600">${total}</span>
        </p>

        {/* Thank You Message */}
        <p className="text-gray-500 text-sm mt-4 text-center">
          Thank you for your purchase! 🎉
        </p>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-gray-500 text-sm text-center">
        <p>Need help? Contact <a href="#" className="text-blue-500 underline">Customer Support</a></p>
        <p className="mt-2">© {new Date().getFullYear()} Your Store. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
