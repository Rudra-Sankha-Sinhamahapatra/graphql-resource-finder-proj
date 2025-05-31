import { useApolloClient, useMutation } from "@apollo/client";
import { SIGNIN_MUTATION, SIGNUP_MUTATION } from "../graphql/mutations/auth";
import type { AuthResponse, SignInVariables, SignUpVariables } from "../graphql/types/auth";
import { GET_USER_DETAILS } from "../graphql/queries/user.queries";
import { useAuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const client = useApolloClient();
  const { setUser } = useAuthContext();
  
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
        
        client.writeQuery({
          query: GET_USER_DETAILS,
          data: {
            getUserDetails: data.signin.data,
          },
        });
        setUser(data.signin.data);
        
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

        client.writeQuery({
          query: GET_USER_DETAILS,
          data: {
            getUserDetails: data.signup.data,
          },
        });
        setUser(data.signup.data);
        
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