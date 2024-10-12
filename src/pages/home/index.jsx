import { useEffect, useState } from "react";

import Post from "../../components/post";
import { getImages, postImage } from "../../services/post";

function Home() {

    const [posts, setPosts] = useState([]);
    const [postTitle, setPostTitle] = useState("");
    const [file, setFile] = useState();
    const [name, setName] = useState("");
    const [userId, setUserId] = useState("");

    async function getImagesFromBe() {
        const response = await getImages(1, 100);
        if(response.status === 200){
            setPosts(response.data.content);
        }
    } 

    const handleTitleChange = (e) => {
        setPostTitle(e.target.value);
    };

    const handleFileChange = (e) => {        
        setFile(e.target.files[0]);
    };

    async function uploadPost(){
        const data = new FormData();
        data.append('title', postTitle);
        data.append('file', file);        
        const response = await postImage(data);
        if (response.status === 200){
            setPosts((prevPosts) => [response.data, ...prevPosts]);
        }else{
            alert(response.data.error)
        }
        
    }

    useEffect(() => {
        getImagesFromBe();
    }, []);

    useEffect(() => {

        const token = localStorage.getItem('authToken');
        const claim = JSON.parse(atob(token.split('.')[1]));
        setName(claim.name);
        setUserId(localStorage.getItem('userId'));
    }, []); 

    return (
        <div className="container-fluid row h-100 min-vh-100">
            <div className="col-2 pt-5 mh-100 shadow bg-body-tertiary rounded border border-start-0 max-vh-100">
                <div className="d-flex justify-content-center align-items-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/3607/3607444.png" style={{ height: '60px', width: 'auto' }}
                        className="rounded-circle mb-3 border border-0" alt="Avatar" />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <h5 className="text-center"><strong>{name}</strong></h5>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-5">
                    <button type="button" className="btn btn-outline-secondary">Log out</button>
                </div>
            </div>

            <div className="col-10 pt-5 mh-100">
                <div id="post-box" className="d-flex justify-content-center align-items-center border-bottom pb-3">
                    <div className="w-50">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control rounded-pill"
                                placeholder="Share your moment" aria-label="Username" aria-describedby="basic-addon1" 
                                onChange={(e) => handleTitleChange(e)}/>
                        </div>
                        <div className="input-group mb-3">
                            <input type="file" className="form-control rounded-pill" id="inputGroupFile02" 
                                onChange={(e) => handleFileChange(e)}/>
                        </div>
                        <div className="d-flex justify-content-center align-items-center mb-3">
                            <button type="button" className="btn btn-outline-primary"
                                onClick={() => {uploadPost()}}>
                                Post
                            </button>
                        </div>
                    </div>

                </div>
                <div id="content" className=" m-5" >
                    {
                        posts.map((post, i ) => (<Post post={post} canDelete={userId === post.ownedBy} key={i}/>))
                    }
                </div>
            </div>
        </div>
    );
}

export default Home;