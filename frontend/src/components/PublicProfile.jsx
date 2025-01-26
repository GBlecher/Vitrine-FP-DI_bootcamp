// import { useEffect, useState } from "react";
// import {  useNavigate } from 'react-router-dom';
// import { useAuth } from "../auth/useAuth.jsx";
// import axios from "axios";
// const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// const PersonalProfile = () => {
//   const { user } = useAuth();
//   const [currProfile, setCurrProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   console.log("PersonalProfile:", user.userid);

//   useEffect(() => {
//     const fetchCurrProfile = async () => {
//       try {
//         const response = await axios.get(
//           `${apiBaseUrl}/api/user/${user.userid} `,
//           { withCredentials: true }
//         );
//         setCurrProfile(response.data);
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCurrProfile();
//   }, [user.userid]);

//   //   const isAccountOwner =
//   //     currProfile && user && currProfile.userid === user.userid;

//   if (loading) {
//     return <p>Loading profile...</p>;
//   }

//   if (!currProfile) {
//     return <p>User profile not found.</p>;
//   }
//   console.log(currProfile);
//   const navigate = useNavigate();
//   return (
//     <>
//       <div id="account_info">
//             <img src={currProfile.profilePic} alt="Account profile picture" />
//             <h1>{`${currProfile.username}`}</h1>
            
//             {currProfile.bio && <p>{currProfile.bio}</p>}
//             <button onClick={() => navigate('/another-page')}>Go to Another Page</button>
//         </div>

//       <div id='post_contaner'>
//             {posts.map(post => (
//                 <div key={post.user_id} className="post">
//                     <img src={post.post_url} alt={`Post by user ${post.user_id}`} style={{ width: '100%', height: 'auto' }} />
//                 </div>
//             ))}
//         </div>
//     </>
//   );
// };

// export default PersonalProfile;
