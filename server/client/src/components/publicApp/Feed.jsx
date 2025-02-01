import PostsDisplay from "./PostsDisplay.jsx";

const urlEndPoint = "all";
const Feed = () => {
  return (
    <>
      <h1 id="logo">Vitrine</h1>
      <PostsDisplay urlEndPoint={urlEndPoint} />
    </>
  );
};

export default Feed;
