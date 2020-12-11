import React, { useMemo } from "react";
import Histogram from "./Histogram";
import { ParentSize } from "@visx/responsive";
import moment from "moment";

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

const mapPostsToMonths = (arr) => {
    console.log("hatz");
    if (!arr) return {};

    const count = {};
    arr.allPosts.forEach((post) => {
        if (
            post.published &&
            moment.unix(post.createdAt / 1000).format("YYYY") === "2019"
        ) {
            const month = moment.unix(post.createdAt / 1000).format("MMM");
            count[month] = (count[month] || 0) + 1;
        }
    });

    return sortByMonth(
        Object.keys(count).map((key, index) => ({
            month: key,
            posts: count[key],
        }))
    );
};

const HistogramContainer = ({ loading, error, data }) => {
    const postsPerMonth = useMemo(() => mapPostsToMonths(data), [data]); 

    if (loading) return "Loading histogram... ";
    if (error) return `Error fetching data! ${error.message}`;
    return (
        <div className="mb-3 h-100" style={{ height: "400px" }}>
            <ParentSize>
                {({ width }) => (
                    <Histogram dataSet={postsPerMonth} width={width} height={250} />
                )}
            </ParentSize>
        </div>
    );
};

export default HistogramContainer;
