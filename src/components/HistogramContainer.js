import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Histogram from "./Histogram";
import { ParentSize } from "@visx/responsive";
import moment from "moment";

const getAllPosts = gql`
    query {
        allPosts(count: 200) {
            published
            createdAt
        }
    }
`;

const sortByMonth = (array) => {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    array.sort((a, b) => {
        return months.indexOf(a.month) - months.indexOf(b.month);
    });
    return array;
};

const HistogramContainer = () => {
    const { loading, error, data } = useQuery(getAllPosts);
    const [dataSet, setDataSet] = useState([]);
    useEffect(() => {
        //If fetching is done, map all the number of posts in 2019 to each month
        if (!loading) {
            const count = {};
            data.allPosts.forEach((post) => {
                if (
                    post.published &&
                    moment.unix(post.createdAt / 1000).format("YYYY") === "2019"
                ) {
                    const month = moment
                        .unix(post.createdAt / 1000)
                        .format("MMM");
                    count[month] = (count[month] || 0) + 1;
                }
            });

            setDataSet(
                sortByMonth(
                    Object.keys(count).map((key, index) => ({
                        month: key,
                        posts: count[key],
                    }))
                )
            );
        }
    }, [data, loading]);

    if (loading) return "Loading histogram... ";
    if (error) return `Error fetching data! ${error.message}`;

    return (
        <div className="mb-3 h-100" style={{ height: "400px" }}>
            <ParentSize>
                {({ width }) => (
                    <Histogram dataSet={dataSet} width={width} height={250} />
                )}
            </ParentSize>
        </div>
    );
};

export default HistogramContainer;
