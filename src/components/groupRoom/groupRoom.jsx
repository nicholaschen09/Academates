import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase.js";
import "./groupRoom.scss";

const Grouproom = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const room = location.state?.room || { Title: "" };

  const messagesRef = collection(db, "messages");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (room) {
        await addDoc(messagesRef, {
          text: newMessage,
          createdAt: serverTimestamp(),
          user: auth.currentUser.displayName,
          room: room.Title,
          profile: auth.currentUser.photoURL,
        });
      } else {
        console.log("Room is null");
      }
    } catch (error) {
      console.log("Error adding message: ", error);
    }
    setNewMessage("");
  };

  useEffect(() => {
    const getMessages = () => {
      if (room) {
        const queryMessages = query(
          messagesRef,
          where("room", "==", room.Title),
          orderBy("createdAt")
        );

        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
          const messages = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setMessages(messages);
        });

        return unsubscribe;
      }
    };

    return getMessages();
  }, []);

  const handleGoBack = () => {
    navigate("/home");
  };

  return (
    <div className="groupRoom">
      {/* <a onClick={handleGoBack}>Select Grade/Course</a> */}
      <u>
        <a onClick={handleGoBack}>Select Grade/Course</a>
      </u>
      <div className="displayMessages">
        {messages.map((message) => (
          <div className="messages" key={message.id}>
            {/* <img src={message.profile} alt="Profile" /> */}
            <span>{message.user}:</span>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <form className="createMessage">
        <input
          className="new-message-input"
          placeholder="Enter your message here.."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
          maxLength="50"
        />
        <button type="submit" onClick={handleSubmit}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Grouproom;

// import React, { useEffect, useState } from "react";
// import {
//   collection,
//   addDoc,
//   serverTimestamp,
//   onSnapshot,
//   query,
//   where,
//   orderBy,
// } from "firebase/firestore";
// import { useLocation, useNavigate } from "react-router-dom";
// import { auth, db, storage } from "../firebase/firebase.js";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import "./groupRoom.scss";

// const Grouproom = () => {
//   const [newMessage, setNewMessage] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [messages, setMessages] = useState([]);

//   const location = useLocation();
//   const navigate = useNavigate();

//   const room = location.state?.room || { Title: "" };

//   const messagesRef = collection(db, "messages");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (room) {
//         const messageData = {
//           text: newMessage,
//           createdAt: serverTimestamp(),
//           user: auth.currentUser.displayName,
//           room: room.Title,
//           profile: auth.currentUser.photoURL,
//         };

//         if (selectedImage) {
//           const storageRef = ref(storage, `images/${selectedImage.name}`);
//           await uploadBytes(storageRef, selectedImage);
//           const downloadURL = await getDownloadURL(storageRef);
//           messageData.image = downloadURL;
//         }

//         await addDoc(messagesRef, messageData);
//       } else {
//         console.log("Room is null");
//       }
//     } catch (error) {
//       console.log("Error adding message: ", error);
//     }
//     setNewMessage("");
//     setSelectedImage(null);
//   };

//   useEffect(() => {
//     const getMessages = () => {
//       if (room) {
//         const queryMessages = query(
//           messagesRef,
//           where("room", "==", room.Title),
//           orderBy("createdAt")
//         );

//         const unsubscribe = onSnapshot(queryMessages, async (snapshot) => {
//           const messages = await Promise.all(
//             snapshot.docs.map(async (doc) => {
//               const messageData = doc.data();
//               if (messageData.image) {
//                 const storageRef = ref(storage, messageData.image);
//                 const downloadURL = await getDownloadURL(storageRef);
//                 messageData.image = downloadURL;
//               }
//               return { ...messageData, id: doc.id };
//             })
//           );

//           setMessages(messages);
//         });

//         return unsubscribe;
//       }
//     };

//     return getMessages();
//   }, [messagesRef, room]);

//   const handleGoBack = () => {
//     navigate("/home");
//   };

//   const handleImageSelect = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);
//   };

//   return (
//     <div className="groupRoom">
//       <u>
//         <a onClick={handleGoBack}>Select Grade/Course</a>
//       </u>
//       <div className="displayMessages">
//         {messages.map((message) => (
//           <div className="messages" key={message.id}>
//             {/* <img src={message.profile} alt="Profile" /> */}
//             <span>{message.user}:</span>
//             <p>{message.text}</p>
//             {message.image && <img src={message.image} alt="Message Image" />}
//           </div>
//         ))}
//       </div>
//       <form className="createMessage">
//         <input type="file" accept="image/*" onChange={handleImageSelect} />
//         <input
//           className="new-message-input"
//           placeholder="Enter your message here.."
//           onChange={(e) => setNewMessage(e.target.value)}
//           value={newMessage}
//           maxLength="50"
//         />
//         <button type="submit" onClick={handleSubmit}>
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Grouproom;
