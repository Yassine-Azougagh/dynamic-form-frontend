import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router";
import App from './App.jsx';
import './index.css';
import AdminFormListPage from "./pages/admin/AdminFormListPage.jsx";
import MyForm from "./pages/admin/FormBuilderPage2.jsx";
import FormEditPage from "./pages/admin/FormEditPage.jsx";
import { default as AdminResponsesPage, default as FormResponsesPage } from "./pages/admin/FormResponsesPage.jsx";
import FormView from './pages/admin/FormView.jsx';
import Login from './pages/auth/login.jsx';
import ResponseEditorPage from './pages/forms/ResponseEditorPage.jsx';
import UserFormListPage from './pages/forms/UserFormListPage.jsx';
import AdminResponseView from './pages/shared/FormResponseView';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>

            <Route path="/" element={<App />} >
                {/* Admin routes */}
                <Route path="admin/forms/list" element={<AdminFormListPage />} />
                <Route path="admin/responses/list" element={<AdminResponsesPage />} />
                <Route path="admin/forms/new" element={<MyForm />} />
                <Route path="admin/forms/:id/edit" element={<FormEditPage />} />
                <Route path="admin/forms/:id/view" element={<FormView />} />
                <Route path="admin/responses/:id/view" element={<AdminResponseView />} />
                <Route path="admin/forms/:id/responses" element={<FormResponsesPage />} />

                {/* User routes */}
                <Route path="user/forms/list" element={<UserFormListPage />} />
                <Route path="user/responses/:id/edit" element={<ResponseEditorPage />} />

            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<h2>404 – Page not found</h2>} />

        </Routes>
    </BrowserRouter>,
)
