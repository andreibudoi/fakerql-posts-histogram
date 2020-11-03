import React from "react";
import { gql, useQuery } from "@apollo/client";
import PostItem from "./PostItem";
import moment from "moment";

const getAllPosts = gql`
    query {
        allPosts(count: 200) {
            id
            title
            body
            published
            createdAt
            author {
                avatar
                firstName
                lastName
            }
        }
    }
`;

const Posts = () => {
    const { loading, error, data } = useQuery(getAllPosts);

    if (loading) return "Loading posts...";
    if (error) return `Error! ${error.message}`;

    return (
        <div>
            {data.allPosts.map((post) =>
                post.published &&
                moment.unix(post.createdAt / 1000).format("YYYY") === "2019" ? (
                    <PostItem key={post.id} post={post} />
                ) : (
                    ""
                )
            )}
        </div>
    );
};

export default Posts;
