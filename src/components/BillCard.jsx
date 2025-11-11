import React from "react";
import { Link } from "react-router";

const BillCard = ({ bill }) => {
  const { _id, title, category, location, date } = bill;

  return (
    <div
      className="
        card bg-base-100 
        dark:bg-base-200 
        border border-transparent hover:border-primary/30
        shadow-md hover:shadow-xl 
        rounded-2xl 
        transition-all duration-300 hover:-translate-y-1
      "
    >
      <div className="card-body space-y-2">
        {/* Title */}
        <h3 className="text-xl font-bold text-primary">{title}</h3>

        {/* Info */}
        <div className="space-y-1 text-sm text-base-content/80">
          <p>
            <span className="font-semibold text-base-content">Category:</span>{" "}
            {category}
          </p>
          <p>
            <span className="font-semibold text-base-content">Location:</span>{" "}
            {location}
          </p>
          <p>
            <span className="font-semibold text-base-content">Date:</span>{" "}
            {date}
          </p>
        </div>

        {/* Action */}
        <div className="card-actions justify-end mt-4">
          <Link
            to={`/bills/${_id}`}
            className="
              btn btn-sm 
              bg-gradient-to-r from-primary to-secondary 
              text-white font-semibold 
              hover:scale-105 transition-transform duration-300
              shadow-md hover:shadow-lg
            "
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BillCard;
