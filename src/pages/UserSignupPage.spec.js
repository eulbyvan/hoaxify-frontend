import React from "react";
import { render, cleanup, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import UserSignupPage from "./UserSignupPage";

// beforeEach(cleanup); // after React-Testing-Library version 9, this cleanup part is not needed anymore

describe('UserSignupPage', () => {

    describe('Layout', () => {

        it('has header of Sign Up', () => {

            const { container } = render(<UserSignupPage />);
            const header = container.querySelector('h1');
            expect(header).toHaveTextContent('Sign Up');

        });

        it('has input for display name', () => {

            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const displayNameInput = queryByPlaceholderText('Your display name');
            expect(displayNameInput).toBeInTheDocument();

        });

        it('has input for username', () => {

            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const usernameInput = queryByPlaceholderText('Your username');
            expect(usernameInput).toBeInTheDocument();

        });

        it('has input for password', () => {

            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const passwordInput = queryByPlaceholderText('Your password');
            expect(passwordInput).toBeInTheDocument();

        });

        it('has password type for password input', () => {

            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const passwordInput = queryByPlaceholderText('Your password');
            expect(passwordInput.type).toBe('password');

        });

        it('has input for password repeat', () => {

            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const passwordRepeatInput = queryByPlaceholderText('Repeat your password');
            expect(passwordRepeatInput).toBeInTheDocument();

        });

        it('has password type for password repeat input', () => {

            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const passwordRepeatInput = queryByPlaceholderText('Repeat your password');
            expect(passwordRepeatInput.type).toBe('password');

        });

        it('has submit button', () => {

            const { container } = render(<UserSignupPage />);
            const button = container.querySelector('button');
            expect(button).toBeInTheDocument();

        });

    });

    describe('Interactions', () => {
        const changeEvent = (content) => {
            return {
                target: {
                    value: content
                }
            };
        };

        const mockAsyncDelayed = () => {
            return jest.fn().mockImplementation(() => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve({});
                    }, 300);
                });
            });
        };

        let button, displayNameInput, usernameInput, passwordInput, passwordRepeatInput;

        const setupForSubmit = (props) => {
            const view = render(
                <UserSignupPage {...props} />
            );

            const { container, queryByPlaceholderText } = view;

            displayNameInput = queryByPlaceholderText('Your display name');
            usernameInput = queryByPlaceholderText('Your username');
            passwordInput = queryByPlaceholderText('Your password');
            passwordRepeatInput = queryByPlaceholderText('Repeat your password');

            fireEvent.change(displayNameInput, changeEvent('my-display-name'));
            fireEvent.change(usernameInput, changeEvent('my-username'));
            fireEvent.change(passwordInput, changeEvent('my-password'));
            fireEvent.change(passwordRepeatInput, changeEvent('my-password-repeat'));

            button = container.querySelector('button');

            return view;
        };

        it('sets the display name value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const displayNameInput = queryByPlaceholderText('Your display name');

            fireEvent.change(displayNameInput, changeEvent('my-display-name'));

            expect(displayNameInput).toHaveValue('my-display-name');
        });

        it('sets the username value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const usernameInput = queryByPlaceholderText('Your username');

            fireEvent.change(usernameInput, changeEvent('my-username'));

            expect(usernameInput).toHaveValue('my-username');
        });

        it('sets the password value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const passwordInput = queryByPlaceholderText('Your password');

            fireEvent.change(passwordInput, changeEvent('my-password'));

            expect(passwordInput).toHaveValue('my-password');
        });

        it('sets the password repeat value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const passwordRepeat = queryByPlaceholderText('Repeat your password');

            fireEvent.change(passwordRepeat, changeEvent('my-password-repeat'));

            expect(passwordRepeat).toHaveValue('my-password-repeat');
        });

        it('calls postSignup when the fields are valid and the actions are provided in props', () => {
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({})
            };

            setupForSubmit({ actions });

            fireEvent.click(button);
            expect(actions.postSignup).toHaveBeenCalledTimes(1);
        });

        it('does not throw exception when clicking the button when actions not provided in props', () => {
            setupForSubmit();
            expect(() => fireEvent.click(button)).not.toThrow();
        });

        it('calls post with user body when the fields are valid', () => {
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({})
            };

            setupForSubmit({ actions });

            fireEvent.click(button);

            const expectedUserObject = {
                username: 'my-username',
                displayName: 'my-display-name',
                password: 'my-password'

            };

            expect(actions.postSignup).toHaveBeenCalledWith(expectedUserObject);
        });

        it('does not allow the user to click the Sign Up button when there is an ongoing API call', () => {
            const actions = {
                postSignup: mockAsyncDelayed()
            };

            setupForSubmit({ actions });

            fireEvent.click(button);
            fireEvent.click(button);

            expect(actions.postSignup).toHaveBeenCalledTimes(1);
        });

        it('displays spinner when there is an ongoing API call', () => {
            const actions = {
                postSignup: mockAsyncDelayed()
            };

            const { queryByText } = setupForSubmit({ actions });

            fireEvent.click(button);

            const spinner = queryByText('Loading...');

            expect(spinner).toBeInTheDocument();
        });

        it('hides spinner after API call finishes successfully', async () => {
            const actions = {
                postSignup: mockAsyncDelayed()
            };

            const { queryByText } = setupForSubmit({ actions });

            fireEvent.click(button);

            const spinner = queryByText('Loading...');

            await waitFor(() => {
                expect(spinner).not.toBeInTheDocument();
            });
        });

        it('hides spinner after API call finishes with error condition', async () => {
            const actions = {
                postSignup: jest.fn().mockImplementation(() => {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            reject({
                                response: { data: {} }
                            });
                        }, 300);
                    });
                })
            };

            const { queryByText } = setupForSubmit({ actions });

            fireEvent.click(button);

            const spinner = queryByText('Loading...');

            await waitFor(() => {
                expect(spinner).not.toBeInTheDocument();
            });
        });
    });

});

console.error = () => { };