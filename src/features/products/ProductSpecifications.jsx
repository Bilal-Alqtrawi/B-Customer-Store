import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowsRightLeftIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

// Mock specifications data
const mockSpecifications = {
  General: {
    Brand: "Premium Brand",
    Model: "PB-2024-001",
    Material: "100% Cotton",
    "Color Options": "Black, White, Navy, Gray",
    "Size Range": "XS - XL",
    Weight: "0.3 kg",
  },
  Dimensions: {
    Length: "70 cm",
    Width: "50 cm",
    "Sleeve Length": "60 cm",
    "Chest Width": "52 cm",
  },
  "Care Instructions": {
    Washing: "Machine wash cold",
    Drying: "Tumble dry low",
    Ironing: "Iron on low heat",
    "Dry Cleaning": "Not recommended",
  },
  "Additional Info": {
    "Country of Origin": "Made in USA",
    Warranty: "2 Years",
    Certification: "OEKO-TEX Standard 100",
    Sustainability: "Eco-friendly materials",
  },
};

const shippingInfo = [
  {
    icon: TruckIcon,
    title: "Free Shipping",
    description: "On orders over $50",
    color: "text-green-600",
  },
  {
    icon: ShieldCheckIcon,
    title: "2 Year Warranty",
    description: "Full coverage included",
    color: "text-blue-600",
  },
  {
    icon: ArrowsRightLeftIcon,
    title: "30 Day Returns",
    description: "Easy return policy",
    color: "text-purple-600",
  },
  {
    icon: CreditCardIcon,
    title: "Secure Payment",
    description: "SSL encrypted checkout",
    color: "text-orange-600",
  },
];

function SpecificationSection({ title, specs, isOpen, onToggle }) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between bg-gray-50 px-6 py-4 transition-colors hover:bg-gray-100"
      >
        <h3 className="font-semibold text-gray-800">{title}</h3>
        {isOpen ? (
          <ChevronUpIcon className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-gray-500" />
        )}
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="bg-white px-6 py-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {Object.entries(specs).map(([key, value]) => (
              <div key={key} className="flex items-start justify-between">
                <span className="font-medium text-gray-600">{key}:</span>
                <span className="ml-4 text-right text-gray-800">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ProductSpecifications({ product }) {
  const [openSections, setOpenSections] = useState({
    General: true, // Open first section by default
    Dimensions: false,
    "Care Instructions": false,
    "Additional Info": false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="space-y-8">
      {/* Product Features */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Product Features
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {shippingInfo.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-lg bg-gray-50 p-4 text-center transition-colors hover:bg-gray-100"
            >
              <feature.icon
                className={`mx-auto mb-3 h-8 w-8 ${feature.color}`}
              />
              <h3 className="mb-1 font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detailed Specifications */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Specifications
        </h2>

        <div className="space-y-4">
          {Object.entries(mockSpecifications).map(([section, specs]) => (
            <SpecificationSection
              key={section}
              title={section}
              specs={specs}
              isOpen={openSections[section]}
              onToggle={() => toggleSection(section)}
            />
          ))}
        </div>
      </div>

      {/* Size Guide */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Size Guide</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left font-semibold text-gray-800">
                  Size
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-800">
                  Chest (cm)
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-800">
                  Length (cm)
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-800">
                  Sleeve (cm)
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { size: "XS", chest: "46-48", length: "66", sleeve: "58" },
                { size: "S", chest: "50-52", length: "68", sleeve: "59" },
                { size: "M", chest: "54-56", length: "70", sleeve: "60" },
                { size: "L", chest: "58-60", length: "72", sleeve: "61" },
                { size: "XL", chest: "62-64", length: "74", sleeve: "62" },
              ].map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-medium">{row.size}</td>
                  <td className="px-4 py-3 text-gray-600">{row.chest}</td>
                  <td className="px-4 py-3 text-gray-600">{row.length}</td>
                  <td className="px-4 py-3 text-gray-600">{row.sleeve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 rounded-lg bg-blue-50 p-4">
          <p className="text-sm text-blue-800">
            <strong>Measurement Guide:</strong> All measurements are in
            centimeters. For the best fit, measure yourself and compare with our
            size chart. If you're between sizes, we recommend choosing the
            larger size.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductSpecifications;
