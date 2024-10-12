import { deleteImages, download } from "../../services/post";

function Post({ post, canDelete }) {

    const onDelete = (e) => {
        deleteImages(e.target.value);
        window.location.reload();
    }

    const  onDownload = async (e) => {
        const response = await download(e.target.value);        
        if (response?.status === 200) {
            try {
                const blob = new Blob([response.data]);
                const href = window.URL.createObjectURL(blob);
    
                // Tạo thẻ <a> để trigger download
                const anchorElement = document.createElement('a');
                anchorElement.href = href;
                anchorElement.download = `${post.name}`; // Tên file (có thể tuỳ chỉnh)
    
                // Thêm <a> vào document và trigger click
                document.body.appendChild(anchorElement);
                anchorElement.click();
    
                // Xóa <a> và giải phóng URL sau khi download xong
                document.body.removeChild(anchorElement);
                window.URL.revokeObjectURL(href);
            } catch (e) {
                console.log(e);
                
            }
        }else{
            alert('Fail to download');
        }

    }


    var createDate = new Date(post.createDate).toLocaleString();

    return (
        <div id="post-item" className="d-flex align-items-center justify-content-center ">
            <div id="post-content" className="shadow p-3 mb-5 bg-body-tertiary rounded w-75 position-relative">
                <h5 className="mb-3">
                    <strong>{post.ownerName}</strong>
                    <div className="position-absolute top-0 end-0">
                        <a download="Example-PDF-document"
                            target="_blank"
                            rel="noreferrer">
                            <button className="btn btn-light "
                                value={post.id}
                                onClick={onDownload}>download
                            </button>
                        </a>
                        {
                            canDelete && (
                                <button className="btn btn-light "
                                    value={post.id}
                                    onClick={onDelete}>X</button>)
                        }
                    </div>
                </h5>
                <p className="fw-lighter">{createDate}</p>
                <p className="mb-3">{post.title}</p>
                <a href={post.url} className="" target="_blank">
                    <img src={post.url} alt=""
                        className="rounded mx-auto d-block border-none rounded w-auto mw-100"
                        style={{ maxHeight: '600px' }} />
                </a>
            </div>
        </div>
    );
}
export default Post;