import { Auth0Provider } from "@auth0/auth0-react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import RequireAuth from "../RequireAuth";

const renderRequireAuth = (children = (<div>test</div>)) => {
    render(
        <Auth0Provider>
            <BrowserRouter>
                <RequireAuth>
                    {children}
                </RequireAuth>
            </BrowserRouter>
        </Auth0Provider>
    )
}

jest.mock('@auth0/auth0-react', () => (
    {
        Auth0Provider: ({children}) => children,
        useAuth0: () => {
            return {
                isLoading: false,
                isAuthenticated: true,
            }
        }
    }
));

describe('RequireAuth page', () => {
    it('renders without crashing', () => {
        renderRequireAuth();
    });
    it('renders children', () => {
        const text = 'children-test'
        const el = <div>{text}</div>
        act(() => {
            renderRequireAuth(el)
        });
        expect(screen.getByText(text)).toBeInTheDocument();
    });
    it('renders children 2', () => {
        const text = 'another-test'
        const el = <p>{text}</p>
        act(() => {
            renderRequireAuth(el)
        });
        expect(screen.getByText(text)).toBeInTheDocument();
    });
    it('matches snapshot', () => {
        act(() => {
            renderRequireAuth();
        });
        expect(screen).toMatchSnapshot();
    });
});