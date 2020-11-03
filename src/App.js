import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import Posts from "./components/Posts";
import "./App.css";

const client = new ApolloClient({
    uri: "https://fakerql.stephix.uk/graphql",
    cache: new InMemoryCache(),
});

const App = () => {
    return (
        <ApolloProvider client={client}>
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand" href="#">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg"
                        width="30"
                        height="30"
                        alt=""
                    />
                    FakerQL Demo
                </a>
            </nav>
            <div className="container">
                {/* <Histogram/> */}
                <Posts />
            </div>
        </ApolloProvider>
    );
};

export default App;
