/**
 * Test data for login functionality
 */
export const LoginTestData = {
    validCredentials: {
        username: 'student',
        password: 'Password123'
    },

    invalidCredentials: [
        {
            username: 'invalidUser',
            password: 'Password123',
            description: 'Invalid username'
        },
        {
            username: 'student',
            password: 'invalidPassword',
            description: 'Invalid password'
        },
        {
            username: 'invalidUser',
            password: 'invalidPassword',
            description: 'Both invalid'
        }
    ],

    emptyCredentials: [
        {
            username: '',
            password: 'Password123',
            description: 'Empty username'
        },
        {
            username: 'student',
            password: '',
            description: 'Empty password'
        },
        {
            username: '',
            password: '',
            description: 'Both empty'
        }
    ],

    expectedMessages: {
        successTitle: 'Logged In Successfully',
        errorMessage: 'Your username is invalid!',
        passwordErrorMessage: 'Your password is invalid!'
    },

    expectedURLs: {
        loginPage: '/practice-test-login/',
        successPage: '/logged-in-successfully/'
    }
};
