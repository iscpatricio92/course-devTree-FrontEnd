import {BrowserRouter, Route, Routes} from 'react-router-dom'
import SignInView from './views/SignInView'
import SignUpView from './views/SignUpView'
import AuthLayout from './layouts/AuthLayout'
import AppLayout from './layouts/AppLayout'
import LinkTreeView from './views/LinkTreeView'
import ProfileView from './views/ProfileView'

export const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/auth/sign-in" element={<SignInView />} />
                    <Route path="/auth/sign-up" element={<SignUpView />} />
                </Route>
                <Route path='/admin' element={<AppLayout />}>
                    <Route index={true} element={<LinkTreeView />} />
                    <Route path='profile' element={<ProfileView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}