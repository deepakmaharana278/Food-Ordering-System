import React, { useState } from "react";

const CancelOrderModal = ({ show, handleClose, orderNumber, paymentMode }) => {
  const [remark, setRemark] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!remark.trim()) {
      setError("Please provide reason for cancellation");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/cancel_order/${orderNumber}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          remark,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        let msg = result.message;
        if (paymentMode === "online") {
          msg += "\n Since you paid online, your amount will be refunded to your account within 2 days.";
        }
        setMessage(msg);
        setRemark("");
        setError("");
      } else {
        setError(result.message || "Faild to Cancel Order");
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    }
  };

  return (
    <div className={`modal fade ${show ? "show d-block" : ""}`} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Cancel Order
              <span className="text-primary"> # {orderNumber}</span>
            </h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            {message ? (
              <div className="alert alert-success">{message}</div>
            ) : (
              <>
                <label className="form-label">Reason for cancellation</label>
                <textarea rows="4" value={remark} onChange={(e) => setRemark(e.target.value)} className="form-control" placeholder="Enter reason here..."></textarea>
                  {error && <div className="text-danger mt-2">{error}</div>}
              </>
            )}
          </div>
          <div className="modal-footer">
            <button onClick={handleClose} type="button" className="btn btn-secondary">
              Close
            </button>
            <button type="button" onClick={handleSubmit} className="btn btn-danger">
              Cancel Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelOrderModal;
