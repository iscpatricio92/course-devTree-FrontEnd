import {BrowserRouter, Route, Routes} from 'react-router-dom'
import SignInView from './views/SignInView'
import SignUpView from './views/SignUpView'
import AuthLayout from './layouts/AuthLayout'

export const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/auth/sign-in" element={<SignInView />} />
                    <Route path="/auth/sign-up" element={<SignUpView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}