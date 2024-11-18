import React, { useEffect, useState } from "react";
import "./App.css";
import FriendsList from "./Components/FriendsList";
import BillFormComponent from "./Components/BillFormComponent";

// Load friends from LocalStorage or use default list
const getInitialFriends = () => {
  const storedFriends = localStorage.getItem("friendsList");
  return storedFriends
    ? JSON.parse(storedFriends)
    : [
        {
          id: 1,
          name: "Example",
          image: "https://i.pravatar.cc/48?u=asdsdasdas",
          balance: 100,
        },
        
        
      ];
};

export default function App() {
  const [friendsList, setFriendsList] = useState(getInitialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Save friends list to LocalStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("friendsList", JSON.stringify(friendsList));
  }, [friendsList]);

  const handleSelectFriend = (friend) => {
    if (selectedFriend && selectedFriend.id === friend.id) {
      setSelectedFriend(null);
      setIsFormVisible(false);
    } else {
      setSelectedFriend(friend);
      setIsFormVisible(true);
    }
  };
  const closeBillComponent = () => {
    setSelectedFriend(null);
    setIsFormVisible(false);
    
  }

  return (
    <div className="friendsList">
      <div className="mainTitle text-center">
        <h1>FairShare</h1>
        <p className="mb-5">
          Split your expenses evenly among friends, and family.
        </p>
      </div>
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <FriendsList
              friendsList={friendsList}
              setFriendsList={setFriendsList}
              setSelectedFriend={handleSelectFriend}
              selectedFriend={selectedFriend}
            />
          </div>
          <div className="col-lg-6">
            <BillFormComponent
              friend={selectedFriend}
              friendsList={friendsList}
              setFriendsList={setFriendsList}
              setSelectedFriend={setSelectedFriend}
              closeBillComponent={closeBillComponent}
              key={selectedFriend ? selectedFriend.id : "default"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}




