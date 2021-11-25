import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Unauthorized from "../pages/Unauthorized";

const renderUnauthorized = () => {
    render(
        <Auth0Provider>
            <Unauthorized />
        </Auth0Provider>
    )
} 

const getLoginButton = () => screen.getByRole('button', {name: 'Login'});

const mockLogin = jest.fn();

jest.mock('@auth0/auth0-react', () => (
    {
        Auth0Provider: ({children}) => children,
        useAuth0: () => {
            return {
                isLoading: false,
                isAuthenticated: false,
                loginWithRedirect: mockLogin
            }
        }
    }
));

describe("Unauthorized page", () => {
    it("renders without crashing", () => {
        act(() => {
            renderUnauthorized();
        });
    });
    it("has login button", () => {
        act(() => {
            renderUnauthorized();
        });
        expect(getLoginButton()).toBeTruthy();
    });
    it('has Unauthorized header', () => {
        act(() => {
            renderUnauthorized();
        });
        expect(screen.getByText("Unauthorized")).toBeInTheDocument();
    });
    it('should redirect if not authenticated', () => {
        act(() => {
            renderUnauthorized();
        })
        expect(mockLogin).toBeCalled();
    });
    it('matches snapshot', () => {
        act(() => {
            renderUnauthorized();
        })
        expect(screen).toMatchSnapshot();
    });
})


