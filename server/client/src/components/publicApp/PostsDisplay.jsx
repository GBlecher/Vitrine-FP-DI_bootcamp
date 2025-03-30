import { useEffect, useState } from "react";
import axios from "axios";


const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const PostsDisplay = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [urlEndPoint, setUrlEndPoint] = useState("all");
  const [searchedUser, setSearchedUser] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // Handle search for a user
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Fetch all users to find the searched username
      const usersResponse = await axios.get(`${apiBaseUrl}/api/user/all`, {
        withCredentials: true,
      });
      // Find the user object that matches the searched username
      const foundUser = usersResponse.data.find(
        (user) => user.username.toLowerCase() === searchedUser.toLowerCase()
      );
      if (foundUser) {
        // If user is found, update urlEndPoint with the user's ID
        setUrlEndPoint(foundUser.id);
      } else {
        setError("User not found");
      }
    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  // Handle resetting the search (clear search input)
  const handleX = () => {
    setUrlEndPoint("all");
  };

  // Fetch posts when the component mounts or urlEndPoint changes
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsResponse = await axios.get(
          `${apiBaseUrl}/api/post/${urlEndPoint}`,
          { withCredentials: true }
        );
        console.log(postsResponse.data);

        setPosts(postsResponse.data);// Update state with the fetched posts
      } catch (err) {
        setError("Failed to fetch posts");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [urlEndPoint]);

  // Open the popup for the selected post
  const openPopup = (post) => {
    setSelectedPost(post);
    setPopupVisible(true);
  };
  // Close the popup
  const closePopup = () => {
    setPopupVisible(false);
    setSelectedPost(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;



  return (
    
    <article id="feed_container">
      
      <div id="searchBar">
        <input
          type="text"
          value={searchedUser}
          onChange={(e) => setSearchedUser(e.target.value)}
          placeholder="Search for username..."
        />
        <button onClick={handleX}>X</button>
        <button onClick={handleSearch}>Search</button>
        {error && <div>{error}</div>}
      </div>
      <br />
      <br />

      <div id="post_container">
        {posts.map((post) => (
          <div key={post.id} className="post" onClick={() => openPopup(post)}>
            <img src={post.post_url} alt={`Post by user ${post.user_id}`} />
            <h3>{post.title}</h3>
          </div>
        ))}
      </div>
        {/* render pop up */}
      {popupVisible && selectedPost && (
        <div className="popup">
          <div className="popup-content">
            <div className="close" onClick={closePopup}>
              x
            </div>
            <img
              id="selectedimg"
              src={selectedPost.post_url}
              alt={selectedPost.title}
            />
            <div className="popup_info_container">
              <h2>{selectedPost.title}</h2>
              <div className="popup_info">
                {selectedPost.hyperlink && (
                  <button
                    onClick={() =>
                      window.open(selectedPost.hyperlink, "_blank")
                    }
                  >
                    Find Me
                  </button>
                )}
                {selectedPost.credit && <p>Credits: {selectedPost.credit}</p>}

                {selectedPost.tags && selectedPost.tags !== "{}" && (
                  <p>Tags: {selectedPost.tags.replace(/{|}/g, "")}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
    
  );
};

export default PostsDisplay;
