'use client'
import { useRouter } from "next/navigation";

const PaymentPage = ({
  params: { planId },
}: {
  params: { planId: string };
}) => {

  const handlePayment = () => {
    // Implement payment logic here
    alert(`Payment processed for plan ID: ${planId}`);
    // Redirect to a success page or update state
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-32-bold">Payment Page</h1>
      <p className="mt-4">
        You are about to make a payment for plan ID: {planId}
      </p>
      <button
        onClick={handlePayment}
        className="mt-8 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;
