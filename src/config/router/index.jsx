import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Authentication, MainApp, NotFound } from "../../pages";

export default function Routing() {
    return (
        <Router>
            <Routes>
                <Route path="/auth" Component={Authentication} />
                <Route path="/:uid?/*" Component={MainApp} />
                <Route path="/not-found" Component={NotFound} />
            </Routes>
        </Router>
    )
}
