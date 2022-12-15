import React from "react";

export class UserSignupPage extends React.Component {

    state = {
        displayName: '',
        username: '',
        password: '',
        passwordRepeat: ''
    };

    onChangeDisplayName = (event) => {
        const value = event.target.value;
        this.setState({ displayName: value });
    };

    onChangeUsername = (event) => {
        const value = event.target.value;
        this.setState({ username: value });
    };

    onChangePassword = (event) => {
        const value = event.target.value;
        this.setState({ password: value });
    };

    onChangePasswordRepeat = (event) => {
        const value = event.target.value;
        this.setState({ passwordRepeat: value });
    };

    onClickSignup = () => {
        const user = {
            username: this.state.username,
            displayName: this.state.displayName,
            password: this.state.password
        };
        this.props.actions.postSignup(user);
    };

    render() {
        return (
            <div className="container">
                <h1 className="text-center">Sign Up</h1>
                <div className="form-floating mb-3">
                    <input
                        id="floatingInput"
                        className="form-control"
                        placeholder="Your display name"
                        value={this.state.displayName}
                        onChange={this.onChangeDisplayName}
                    />
                    <label htmlFor="floatingInput">Display Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        id="floatingInput"
                        className="form-control"
                        placeholder="Your username"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                    />
                    <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        id="floatingInput"
                        className="form-control"
                        placeholder="Your password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                    />
                    <label htmlFor="floatingInput">Password</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        id="floatingInput"
                        className="form-control"
                        placeholder="Repeat your password"
                        type="password"
                        value={this.state.passwordRepeat}
                        onChange={this.onChangePasswordRepeat}
                    />
                    <label htmlFor="floatingInput">Confirm Password</label>
                </div>
                <div className="text-center"><button className="btn btn-primary" onClick={this.onClickSignup}>Sign Up</button></div>
            </div>
        );
    }

}

UserSignupPage.defaultProps = {
    actions: {
        postSignup: () => new Promise((resolve, reject) => {
            resolve({});
        })
    }
};

export default UserSignupPage; 