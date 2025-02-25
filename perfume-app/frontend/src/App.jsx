import React from 'react';
import Header from './components/common/Header.jsx';
import Sidebar from "./components/common/Sidebar.jsx";
import Footer from "./components/common/Footer.jsx";
import {ContextProviders} from "./context/ContextProvider.jsx";
import routes from "./Routes.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <ContextProviders>
            <Router>

                    <Header/>
                    <Sidebar/>
                    <main>

                        <Routes>
                            {routes.map(({path, element}) => (
                                <Route key={path} path={path} element={element}/>
                            ))}
                        </Routes>

                    </main>
                    <Footer />
            </Router>
        </ContextProviders>

)
    ;
}

export default App;
