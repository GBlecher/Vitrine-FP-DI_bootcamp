import PostsDisplay from './PostsDisplay.jsx';
const urlEndPoint = 'all'
const Feed = ()=>{
    return(
        <>
        <h1>Vitrine</h1>
        <PostsDisplay urlEndPoint={urlEndPoint}/>
        </>
    )
}

export default Feed;