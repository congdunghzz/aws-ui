

function Post({post}){
    var createDate = new Date(post.createDate).toLocaleString();
    return (
        <div id="post-item" className="d-flex align-items-center justify-content-center ">
            <div id="post-content" className="shadow p-3 mb-5 bg-body-tertiary rounded w-75">
                <h5 className="mb-3"><strong>{post.ownerName}</strong></h5>
                <p className="fw-lighter">{createDate}</p>
                <p className="mb-3">{post.title}</p>
                <a href={post.url} className="" target="_blank">                    
                    <img src={post.url} alt="" 
                    className="rounded mx-auto d-block border-none rounded w-auto mw-100"
                    style={{maxHeight: '600px'}}/>
                </a>
            </div>
        </div>
    );
}

export default Post;