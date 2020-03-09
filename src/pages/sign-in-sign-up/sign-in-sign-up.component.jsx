import React from 'react';

import { SignInSignUpContainer } from './sign-in-sign-up.styles';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

//import './sign-in-sign-up.styles.scss';

const SignInAndSignUpPage = () => (
    <SignInSignUpContainer>
        <SignIn />
        <SignUp />  
    </SignInSignUpContainer>

);
export default SignInAndSignUpPage;
