import React, { useContext, useEffect, useState } from "react";
import instance from "../hook/useAxios";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import Loading from "../components/Loading";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const MyPayBills = () => {
  const { user } = useContext(AuthContext);
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    amount: "",
    address: "",
    phone: "",
    date: "",
  });

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

  // Fetch bills
  const fetchBills = async () => {
    try {
      setLoading(true);
      const { data } = await instance.get(
        `/paid-bills/user?email=${user.email}`
      );
      setBills(data || []);
    } catch (err) {
      console.error("Error fetching bills:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchBills();
  }, [user]);

  const totalAmount = bills.reduce(
    (sum, bill) => sum + parseFloat(bill.amount || 0),
    0
  );

  // Open update modal
  const openUpdateModal = (bill) => {
    setSelectedBill(bill);
    setFormData({
      amount: bill.amount,
      address: bill.address,
      phone: bill.phone,
      date: bill.date?.split("T")[0],
    });
    document.getElementById("update_modal").showModal();
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Update bill
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await instance.patch(`/paid-bills/${selectedBill._id}`, formData);
      Swal.fire("Updated!", "Bill updated successfully.", "success");
      document.getElementById("update_modal").close();
      fetchBills();
    } catch {
      Swal.fire("Error", "Failed to update bill.", "error");
    }
  };

  // Delete bill
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This bill will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await instance.delete(`/paid-bills/${id}`);
        Swal.fire("Deleted!", "Bill deleted successfully.", "success");
        fetchBills();
      } catch {
        Swal.fire("Error", "Failed to delete bill.", "error");
      }
    }
  };

  // Download PDF report
  const handleDownloadReport = () => {
    if (!bills || bills.length === 0) return;

    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("My Paid Bills Report", 14, 22);

    // Total summary
    doc.setFontSize(12);
    doc.text(`Total Bills Paid: ${bills.length}`, 14, 30);
    doc.text(`Total Amount: ৳${totalAmount.toLocaleString()}`, 14, 36);

    // Table headers
    const tableColumn = [
      "Username",
      "Email",
      "Amount",
      "Address",
      "Phone",
      "Date",
    ];
    const tableRows = bills.map((bill) => [
      bill.username,
      bill.email,
      `৳${bill.amount}`,
      bill.address,
      bill.phone,
      bill.date ? new Date(bill.date).toLocaleDateString() : "",
    ]);

    // Add table
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 42,
      theme: "grid",
      headStyles: {
        fillColor: theme === "dark" ? [55, 65, 81] : [220, 220, 220],
      },
    });

    doc.save(`my_pay_bills_${user?.email}.pdf`);
  };

  return (
    <div
      className={
        theme === "dark"
          ? "bg-gray-900 text-gray-100 min-h-screen"
          : "bg-base-100 text-base-content min-h-screen"
      }
    >
      <title>My Pay Bills | Smart Bills</title>
      <div className="py-6 container mx-auto px-4 transition-colors duration-500">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6">
          <h2 className="text-2xl font-bold mb-3 sm:mb-0">My Pay Bills</h2>
          <button
            className="btn btn-success text-white"
            onClick={handleDownloadReport}
            disabled={loading || bills.length === 0}
          >
            Download Report
          </button>
        </div>

        <div
          className={`stats shadow mb-6 ${
            theme === "dark"
              ? "bg-gradient-to-r from-indigo-700 to-purple-800 text-white"
              : "bg-gradient-to-r from-primary to-accent text-white"
          }`}
        >
          <div className="stat">
            <div className="stat-title text-white">Total Bills Paid</div>
            <div className="stat-value">{bills.length}</div>
          </div>
          <div className="stat">
            <div className="stat-title text-white">Total Amount</div>
            <div className="stat-value">৳{totalAmount.toLocaleString()}</div>
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="table table-zebra w-full">
              <thead
                className={theme === "dark" ? "bg-gray-800" : "bg-base-200"}
              >
                <tr>
                  <th>SL</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Amount</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bills.length > 0 ? (
                  bills.map((bill, index) => (
                    <tr key={bill._id}>
                      <td className="font-semibold text-center">{index + 1}</td>
                      <td>{bill.username}</td>
                      <td>{bill.email}</td>
                      <td>৳{bill.amount}</td>
                      <td>{bill.address}</td>
                      <td>{bill.phone}</td>
                      <td>{new Date(bill.date).toLocaleDateString()}</td>
                      <td className="space-x-2">
                        <button
                          className="btn btn-sm btn-info text-white"
                          onClick={() => openUpdateModal(bill)}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-sm btn-error text-white"
                          onClick={() => handleDelete(bill._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-10 opacity-70">
                      <div>
                        <p className="text-lg font-semibold mb-2">
                          No bills found
                        </p>
                        <p className="text-sm">
                          You haven’t paid any bills yet.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <dialog id="update_modal" className="modal">
          <div
            className={`modal-box ${
              theme === "dark"
                ? "bg-gray-900 text-gray-100"
                : "bg-base-100 text-base-content"
            }`}
          >
            <h3 className="font-bold text-lg mb-4">Update Bill</h3>

            <form onSubmit={handleUpdate}>
              <label className="form-control w-full mb-2">
                <span className="label-text">Amount</span>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </label>

              <label className="form-control w-full mb-2">
                <span className="label-text">Address</span>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </label>

              <label className="form-control w-full mb-2">
                <span className="label-text">Phone</span>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </label>

              <label className="form-control w-full mb-4">
                <span className="label-text">Date</span>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </label>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() =>
                    document.getElementById("update_modal").close()
                  }
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary text-white">
                  Update
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default MyPayBills;
