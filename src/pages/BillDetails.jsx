import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";
import instance from "../hook/useAxios";
import Loading from "../components/Loading";
import notFoundAnimation from "../lotties/Loading.json"
import Lottie from "lottie-react";

const BillDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [bill, setBill] = useState(null);
  const [isCurrentMonth, setIsCurrentMonth] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch bill details
  useEffect(() => {
    const fetchBill = async () => {
      try {
        const { data } = await instance.get(`/bills/${id}`);
        setBill(data);
        const billMonth = new Date(data.date).getMonth();
        const currentMonth = new Date().getMonth();
        setIsCurrentMonth(billMonth === currentMonth);
      } catch (err) {
        console.error("Failed to fetch bill details:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchBill();
  }, [id]);

  // Handle bill payment
  const handlePayBill = async (e) => {
    e.preventDefault();
    const form = e.target;
    const payForm = {
      email: form.email.value,
      billId: form.billId.value,
      username: form.username.value,
      amount: form.amount.value,
      address: form.address.value,
      phone: form.phone.value,
      date: form.date.value,
      additionalInfo: form.additionalInfo.value,
    };

    try {
      await instance.post("/paid-bills", payForm);
      Swal.fire({
        icon: "success",
        title: "Payment Successful!",
        text: "Your bill has been paid successfully.",
        confirmButtonColor: "#3B82F6",
      });
      window.pay_bill_modal.close();
    } catch (err) {
      console.error("Payment failed:", err);
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text:
          err?.response?.data?.message ||
          "Something went wrong. Try again later.",
      });
    }
  };

    const [theme, setTheme] = useState(
      document.documentElement.getAttribute("data-theme") || "light"
    );
  
    useEffect(() => {
      const observer = new MutationObserver(() => {
        setTheme(document.documentElement.getAttribute("data-theme"));
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });
      return () => observer.disconnect();
    }, []);
  
  useEffect(() => {
    if (bill) {
      document.title = `${bill.title} | Smart Bills`;
    }
  }, [bill]);

  // Loading state
  if (loading) {
    return (
      <Loading></Loading>
    );
  }

  // Bill not found
  if (!bill) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center bg-base-200 px-4">\
        <title>Bill Not Found | Smart Bills</title>
        <div className="w-64 h-64 mb-6">
          <Lottie animationData={notFoundAnimation} loop={true} />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-error mb-2">
          Bill Not Found 😞
        </h2>
        <p className="text-base-content opacity-80 max-w-md mb-6">
          The bill you’re looking for might have been deleted or is currently
          unavailable. Please check again later or explore other bills.
        </p>
        <a
          href="/bills"
          className="btn btn-primary btn-wide shadow-md hover:scale-105 transition-transform"
        >
          Back to Bills
        </a>
      </div>
    );
  }


  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-2">
        {bill.title}
      </h1>
      {/* <title>{bill.title} | Smart Bills</title> */}
      <p className="text-center text-gray-500 mb-10">
        View your bill details and complete payment easily.
      </p>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        <img
          src={bill.image}
          alt={bill.title}
          className="rounded-2xl shadow-lg w-full object-cover h-[400px]"
        />

        <div
          className={`rounded-2xl shadow-md p-6 space-y-4 ${
            theme === "dark"
              ? "bg-gray-900 text-gray-100"
              : "bg-base-100 text-base-content"
          }`}
        >
          <span className="px-3 py-1 text-sm bg-blue-100 text-blue-600 font-semibold rounded-full">
            {bill.category}
          </span>

          <h2 className="text-2xl font-semibold text-primary">{bill.title}</h2>
          <p className="text-gray-600">{bill.description}</p>

          <div className="flex items-center gap-2 text-gray-700">
            <FaMoneyBillWave className="text-blue-500" />
            <span className="font-semibold">Amount:</span> ৳{bill.amount}
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <FaMapMarkerAlt className="text-blue-500" />
            <span className="font-semibold">Location:</span> {bill.location}
          </div>

          <p className="text-gray-700">
            <span className="font-semibold">Date:</span> {bill.date}
          </p>

          <p className="text-gray-700">
            <span className="font-semibold">Email:</span>{" "}
            {bill.email || user?.email}
          </p>

          <button
            onClick={() => window.pay_bill_modal.showModal()}
            disabled={!isCurrentMonth}
            className={`btn w-full ${
              isCurrentMonth
                ? "btn-primary cursor-pointer"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Pay Bill
          </button>

          {!isCurrentMonth && (
            <p className="text-red-500 text-sm mt-1">
              ⚠ Only bills of the current month can be paid.
            </p>
          )}
        </div>
      </div>

      {/* Modal */}
      <dialog id="pay_bill_modal" className="modal">
        <form
          method="dialog"
          onSubmit={handlePayBill}
          className="modal-box space-y-4"
        >
          <h3 className="font-bold text-center text-2xl text-blue-600">
            Pay Bill
          </h3>

          <label className="label -mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full"
          />

          <label className="label -mb-2">Bill Id</label>
          <input
            type="text"
            name="billId"
            value={id}
            readOnly
            className="input input-bordered w-full"
          />

          <label className="label -mb-2">Amount</label>
          <input
            type="number"
            name="amount"
            value={bill.amount}
            readOnly
            className="input input-bordered w-full"
          />

          <label className="label -mb-2">User Name</label>
          <input
            type="text"
            name="username"
            value={user?.displayName || ""}
            readOnly
            className="input input-bordered w-full"
          />

          <label className="label -mb-2">Address</label>
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="input input-bordered w-full"
          />

          <label className="label -mb-2">Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="input input-bordered w-full"
          />

          <label className="label -mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={new Date().toISOString().split("T")[0]}
            readOnly
            className="input input-bordered w-full"
          />

          <label className="label -mb-2">Additional Info</label>
          <textarea
            name="additionalInfo"
            placeholder="Additional info"
            className="textarea textarea-bordered w-full"
          ></textarea>

          <div className="modal-action">
            <button type="submit" className="btn btn-primary cursor-pointer">
              Submit Payment
            </button>
            <button
              type="button"
              onClick={() => window.pay_bill_modal.close()}
              className="btn btn-outline cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default BillDetails;
