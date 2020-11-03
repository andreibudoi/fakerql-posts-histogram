import React from "react";
import moment from "moment";

const PostItem = (post) => {
    const { title, body, createdAt, author } = post.post;

    return (
        <div className="card card-body mb-3 ">
            <div className="span4">
                <img
                    src={author.avatar}
                    className="rounded-circle float-left mr-3 mb-3"
                    width="50"
                    height="50"
                    alt=""
                />
                <h1 className="content-heading">{title}</h1>
            </div>
            <h5 className="mb-3">{body}</h5>
            <div className="text-muted">
                {`Posted by ${author.firstName} ${author.lastName} on ${moment.unix(createdAt/1000).format("DD MMM YYYY hh:mm a")}`}
            </div>
        </div>
    );
};

export default PostItem;
