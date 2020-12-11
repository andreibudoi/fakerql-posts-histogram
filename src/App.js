import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import Posts from "./components/Posts";
// import Histogram from "./components/Histogram.tsx"

import "./App.css";

const client = new ApolloClient({
    uri: "https://fakerql.stephix.uk/graphql",
    cache: new InMemoryCache(),
});

const App = () => {
    return (
        <ApolloProvider client={client}>
            <nav className="navbar sticky-top navbar-light bg-light">
                <a className="navbar-brand" href="#">
                    <img
                        className="mr-2"
                        src="https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg"
                        width="30"
                        height="30"
                        alt=""
                    />
                    FakerQL Demo - Blog Posts of 2019
                </a>
            </nav>
            <div className="container">
                <Posts />
            </div>
        </ApolloProvider>
    );
};

export default App;
