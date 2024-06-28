import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormsPage from './components/layout/FormsPage.js';
import ShowPage from './components/layout/ShowPage.js';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache()
});

const Title = () => {
  return <h1>People and Their Cars</h1>;
};

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <div className="App">
        <Title />
        <Routes>
          <Route path="/" element={<FormsPage />} />
          <Route path="/addForms" element={<FormsPage />} />
          <Route path="/people/:id" element={<ShowPage />} />
        </Routes>
      </div>
    </Router>
  </ApolloProvider>
);

export default App;