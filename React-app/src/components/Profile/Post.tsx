import React, {FC} from "react";

type PropsType = {
    deletingPostIds: string[],
    deletePost: (id: string) => void,
    role: 'Owner' | 'User',
    id: string,
    author: string,
    postBody: string
}

export const Post:FC<PropsType> = ({deletingPostIds, deletePost, role, id, author, postBody}) => {
    let isDeleting = false
    deletingPostIds.forEach((postId: string) => {
        if(postId == id) {
            isDeleting = true
        }
    })
     return (
            <div className={"item " + (isDeleting && 'deleting')}>
                <div className="ava-and-author">
                    <div className="ava-bg">
                        <div className="ava" style={{background: 'url("https://www.iconninja.com/files/980/515/831/warrior-ninja-avatar-samurai-icon.svg")'}} />
                    </div>
                    <div className="author">{author} </div>
                </div>
                <div className="body">
                    {postBody}
                </div>
                {role === 'Owner' && <div className="close" onClick={() => deletePost(id)}></div>}
            </div>
    )
}