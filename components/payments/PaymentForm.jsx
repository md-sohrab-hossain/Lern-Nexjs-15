"use client";

import { useState, useTransition } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { addGoingEvent } from "@/actions";

const PaymentForm = ({ eventId }) => {
  // Get auth state from Redux store (existing pattern)
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [formError, setFormError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!isAuthenticated || !user) {
      router.push("/login");
      return;
    }

    // Basic validation
    if (!formData.cardNumber || !formData.expiryDate || !formData.cvv) {
      setFormError("Please fill in all payment fields");
      return;
    }

    startTransition(async () => {
      try {
        const result = await addGoingEvent(eventId, user);
        
        if (result && result.success) {
          setIsSuccess(true);
          setFormError("");
          // Success! Redirect to home page after a brief delay
          setTimeout(() => {
            router.push('/');
          }, 2000);
        } else {
          setFormError(result?.error || "Registration failed. Please try again.");
        }
              } catch (error) {
          setFormError("Payment failed. Please try again.");
        }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {isSuccess && (
        <div className="mb-4 p-3 bg-green-600/20 border border-green-500/50 rounded-md text-green-400">
          ✅ Payment successful! Redirecting to home page...
        </div>
      )}
      
      {formError && !isSuccess && (
        <div className="mb-4 p-3 bg-red-600/20 border border-red-500/50 rounded-md text-red-400">
          {formError}
        </div>
      )}

      <div className="my-4 space-y-2">
        <label htmlFor="name" className="block">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          disabled={isPending}
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md disabled:opacity-50"
        />
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="email" className="block">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          disabled={isPending}
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md disabled:opacity-50"
        />
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="cardNumber" className="block">
          Card Number
        </label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleInputChange}
          disabled={isPending}
          placeholder="1234 5678 9012 3456"
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md disabled:opacity-50"
        />
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="expiryDate" className="block">
          Expiry Date
        </label>
        <input
          type="text"
          id="expiryDate"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleInputChange}
          disabled={isPending}
          placeholder="MM/YY"
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md disabled:opacity-50"
        />
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="cvv" className="block">
          CVV
        </label>
        <input
          type="text"
          id="cvv"
          name="cvv"
          value={formData.cvv}
          onChange={handleInputChange}
          disabled={isPending}
          placeholder="123"
          maxLength="3"
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md disabled:opacity-50"
        />
      </div>

      <button
        type="submit"
        disabled={isPending || isSuccess}
        className="w-full py-2 my-8 bg-indigo-600 rounded-md hover:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSuccess ? "✅ Payment Successful!" : isPending ? "Processing Payment..." : "Pay Now"}
      </button>
    </form>
  );
};

export default PaymentForm;
