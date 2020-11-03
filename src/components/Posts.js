import React from "react";
import { gql, useQuery } from "@apollo/client";
import PostItem from "./PostItem";

const getAllPosts = gql`
    query {
        allPosts(count: 1000) {
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

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    return (
        <div>
            {data.allPosts.map((post) => {
                if (post.published) {
                    return <PostItem key={post.id} post={post} />;
                }
            })}
        </div>
    );
};

export default Posts;
