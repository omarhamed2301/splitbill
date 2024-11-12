import { useState } from "react";

export default function BillFormComponent({
    friend,
    friendsList,
    setFriendsList,
    setSelectedFriend,
    closeBillComponent
  }) {
    const [bill, setBill] = useState("");
    const [paidByUser, setPaidByUser] = useState("");
    const [whoIsPaying, setWhoIsPaying] = useState("user");
    const paidByFriend = bill ? bill - paidByUser : "";
  
    const handleSplitBill = (e) => {
      e.preventDefault();
      const friendExpense = bill - paidByUser;
  
      const updatedFriendsList = friendsList.map((f) => {
        if (f.id === friend.id) {
          const updatedFriend = { ...f };
          if (whoIsPaying === "user") {
            updatedFriend.balance += friendExpense; // friend owes you
          } else {
            updatedFriend.balance -= paidByUser; // you owe the friend
          }
          return updatedFriend;
        }
        return f;
      });
  
      setFriendsList(updatedFriendsList); // Update the list and save in LocalStorage
      setSelectedFriend(null);
      setBill("");
      setPaidByUser("");
    };
  
    return (
      <>
        {friend && (
          <div className="billForm">
            <h2>SPLIT A BILL WITH {friend.name}</h2>
            <form onSubmit={handleSplitBill}>
              <div className="billValue">
                <label>Bill Value</label>
                <input
                  className="form-control w-50"
                  type="number"
                  value={bill}
                  onChange={(e) => setBill(Number(e.target.value))}
                />
              </div>
              <div className="billValue">
                <label>Your expense</label>
                <input
                  className="form-control w-50"
                  type="number"
                  value={paidByUser}
                  onChange={(e) =>
                    setPaidByUser(
                      Number(e.target.value) > bill
                        ? paidByUser
                        : Number(e.target.value)
                    )
                  }
                />
              </div>
              <div className="billValue">
                <label>{`${friend.name}'s expense`}</label>
                <input
                  className="form-control w-50"
                  type="number"
                  disabled
                  value={paidByFriend}
                />
              </div>
              <div className="billValue">
                <label>Who is paying the bill?</label>
                <select
                  className="w-50 text-center p-1"
                  value={whoIsPaying}
                  onChange={(e) => setWhoIsPaying(e.target.value)}
                >
                  <option value="user">You</option>
                  <option value="friend">{friend.name}</option>
                </select>
              </div>
              <div className="splitBtn d-flex gap-2">
                <button className="btn btn-info w-50">Split bill</button>
                <button className="btn btn-danger w-50" onClick={closeBillComponent}>Close</button>
              </div>
            </form>
          </div>
        )}
      </>
    );
  }