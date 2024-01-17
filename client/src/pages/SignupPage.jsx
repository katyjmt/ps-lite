import { useState } from 'react';
import { Link } from 'react-router-dom';
import { StyledSignupLogin } from '../components/styles/SignupLogin.styled';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

export function SignupPage() {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <StyledSignupLogin>
      <div>
        <h1>Sign Up</h1>
        <p>Sign up to create a customised planner</p>
        <div>
          {data ? (
            <p>
              Success! You may now head{' '}
              <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <input
                placeholder="First name"
                name="firstName"
                type="text"
                value={formState.firstName}
                onChange={handleChange}
              />
              <input
                placeholder="Last name"
                name="lastName"
                type="text"
                value={formState.lastName}
                onChange={handleChange}
              />
              <input
                placeholder="Your email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                placeholder="******"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button
                type="submit"
              >
                Submit
              </button>
            </form>
          )}

          {error && (
            <div>
              {error.message}
            </div>
          )}
        </div>
      </div>
    </StyledSignupLogin>
  );
}
