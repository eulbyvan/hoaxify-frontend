import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
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
            const confirmPasswordInput = queryByPlaceholderText('Repeat your password');
            expect(confirmPasswordInput).toBeInTheDocument();

        });

        it('has password type for password repeat input', () => {

            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const confirmPasswordInput = queryByPlaceholderText('Repeat your password');
            expect(confirmPasswordInput.type).toBe('password');

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
    });

});