import { useMutation } from "@apollo/client";
import { SIGNIN_MUTATION, SIGNUP_MUTATION } from "../graphql/mutations/auth";
import type { AuthResponse, SignInVariables, SignUpVariables } from "../graphql/types/auth";

export const useAuth = () => {
    const [signin, { loading: signInLoading }] = useMutation<
    { signin: AuthResponse },
    SignInVariables
  >(SIGNIN_MUTATION);

  const [signup, { loading: signUpLoading }] = useMutation<
    { signup: AuthResponse },
    SignUpVariables
  >(SIGNUP_MUTATION);

  const handleSignIn = async (email: string, password: string) => {
    try {
    const { data } = await signin({
      variables: { email, password },
    });

    if (data?.signin.token) {
      localStorage.setItem('token', data.signin.token);
      localStorage.setItem('user', JSON.stringify(data.signin.data)); 
      return data.signin;
    }
} catch (error) {
    throw error;
}
  };

  const handleSignUp = async (email: string, password: string, username: string) => {
    try {
    const { data } = await signup({
      variables: { email, password, username },
    });
    
    if (data?.signup.token) {
      localStorage.setItem('token', data.signup.token);
      localStorage.setItem('user', JSON.stringify(data.signup.data)); 
      return data.signup;
    }
} catch (error) {
    throw error;
}
  };

  return {
    signIn: handleSignIn,
    signUp: handleSignUp,
    isLoading: signInLoading || signUpLoading,
  };
};