import { useState } from "react";

export default function FriendsList({
    friendsList,
    setFriendsList,
    setSelectedFriend,
    selectedFriend,
  }) {
    const [addFriendBtn, setAddFriendBtn] = useState(false);
    const [name, setName] = useState("");
    const [image, setImage] = useState("https://i.pravatar.cc/48");
  
    function showAddFriend() {
      setAddFriendBtn(!addFriendBtn);
    }
  
    function handleAddFriend(e) {
      e.preventDefault();
      if (!name || !image) return;
      const id = crypto.randomUUID();
      const newFriend = {
        id,
        name,
        image: `${image}?u=${id}`,
        balance: 0,
      };
  
      const updatedFriendsList = [...friendsList, newFriend];
      setFriendsList(updatedFriendsList); // Save new friend
      setName("");
      setImage("https://i.pravatar.cc/48");
      setAddFriendBtn(false);
    }
  
    return (
      <>
        <ul className="list">
          {friendsList.map((friend) => (
            <li
              className={`listRow row ${
                selectedFriend && selectedFriend.id === friend.id
                  ? "activeSelection"
                  : ""
              }`}
              key={friend.id}
            >
              <div className="col-2">
                <img src={friend.image} />
              </div>
              <div className="col-6">
                <h4>{friend.name}</h4>
                {friend.balance < 0 && (
                  <p className="red">
                    You owe {friend.name} {Math.abs(friend.balance)}$
                  </p>
                )}
                {friend.balance > 0 && (
                  <p className="green">
                    {friend.name} owes you {Math.abs(friend.balance)}$
                  </p>
                )}
                {friend.balance === 0 && <p>You and {friend.name} are even</p>}
              </div>
              <div className="col-4 text-center">
                <button
                  className="btn btn-info"
                  onClick={() => {
                    setSelectedFriend(friend);
                  }}
                >
                  {selectedFriend && selectedFriend.id === friend.id
                    ? "Close"
                    : "Select"}
                </button>
              </div>
            </li>
          ))}
        </ul>
  
        <div className="addFriend">
          {addFriendBtn && (
            <form className="addFriendForm row" onSubmit={handleAddFriend}>
              <div className="col-lg-4">
                <h6>Friend name</h6>
                <h6>Image URL</h6>
              </div>
              <div className="col-lg-8">
                <input
                  className="form-control w-100 d-inline"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="form-control w-100 d-inline"
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                <button className="form-control btn btn-info">Add</button>
              </div>
            </form>
          )}
  
          <div className="addBtn">
            <button className="btn btn-info" onClick={showAddFriend}>
              {addFriendBtn ? "Close" : "Add Friend"}
            </button>
          </div>
        </div>
      </>
    );
  }