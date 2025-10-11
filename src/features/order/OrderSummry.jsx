import { useState } from "react";
import { Link } from "react-router";
import Button from "../../ui/Button";
import { TagIcon, TruckIcon } from "@heroicons/react/24/outline";

const PaymentIcons = () => (
  <div className="flex items-center justify-center gap-2">
    <img
      src="https://img.icons8.com/color/48/visa.png"
      alt="Visa"
      className="h-6"
    />
    <img
      src="https://img.icons8.com/color/48/mastercard.png"
      alt="Mastercard"
      className="h-6"
    />
    <img
      src="https://img.icons8.com/color/48/paypal.png"
      alt="PayPal"
      className="h-6"
    />
  </div>
);

function OrderSummary({ subtotal }) {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [error, setError] = useState("");

  const handleApplyCoupon = () => {
    const upperCoupon = coupon.toUpperCase();
    const match = upperCoupon.match(/^SALE(\d{1,3})$/);

    if (match) {
      const percentage = parseInt(match[1], 10);

      if (percentage >= 1 && percentage <= 100) {
        const discountAmount = subtotal * (percentage / 100);
        setDiscount(discountAmount);
        setDiscountPercent(percentage);
        setError("");
        return;
      }
    }
    setError("Invalid coupon code");
    setDiscount(0);
    setDiscountPercent(0);
  };

  const shippingCost = subtotal > 50 ? 0 : 5.99;
  const total = subtotal - discount + shippingCost;

  const getDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
      <h2 className="mb-6 border-b pb-4 text-xl font-bold text-gray-800">
        Order Summary
      </h2>

      <div className="mb-6">
        <label
          htmlFor="coupon"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Have a coupon?
        </label>
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <TagIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="coupon"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Discount code"
              className="w-full rounded-lg border-gray-300 py-2 pr-4 pl-10 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-0"
            />
          </div>
          <Button variant="secondary" onClick={handleApplyCoupon}>
            Apply
          </Button>
        </div>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium text-gray-800">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount ({discountPercent}%)</span>
            <span className="font-medium">-${discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          {shippingCost === 0 ? (
            <span className="flex items-center gap-1 font-medium text-green-600">
              <TruckIcon className="h-5 w-5" /> Free
            </span>
          ) : (
            <span className="font-medium text-gray-800">
              ${shippingCost.toFixed(2)}
            </span>
          )}
        </div>

        <div className="!my-6 border-t border-dashed"></div>

        <div className="flex justify-between text-lg font-bold text-gray-900">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <Link to="/checkout" className="mt-6 block">
        <Button size="lg" className="w-full py-3.5 hover:bg-amber-600">
          Proceed to Checkout
        </Button>
      </Link>

      <p className="mt-4 text-center text-sm text-gray-500">
        Estimated delivery by{" "}
        <span className="font-semibold">{getDeliveryDate()}</span>
      </p>

      <div className="mt-6">
        <p className="mb-2 text-center text-xs font-medium text-gray-400 uppercase">
          Secure Payments
        </p>
        <PaymentIcons />
      </div>
    </div>
  );
}

export default OrderSummary;
