import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  const [notification, setNotification] = useState(""); // State to manage notification messages
  const [isError, setIsError] = useState(false); // State to manage error status

  const handleTransaction = async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/account/transfer`,
        {
          to: id,
          amount,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      // Check if the transaction was successful
      if (response.status === 200) {
        setNotification("Transaction successful! Money sent to " + name);
        setIsError(false); // Reset error state
      }
    } catch (error) {
      setNotification(
        error.response?.data?.message || "Transaction failed. Please try again."
      );
      setIsError(true); // Set error state
    }
  };

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
              </div>
              <h3 className="text-2xl font-semibold">{name}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="amount"
                >
                  Amount (in Rs)
                </label>
                <input
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter amount"
                />
              </div>
              <button
                onClick={handleTransaction}
                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
              >
                Initiate Transfer
              </button>
            </div>
          </div>

          {/* Notification Section */}
          {notification && (
            <div
              className={`mt-4 p-3 rounded-lg text-center ${
                isError ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
              }`}
            >
              {notification}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
