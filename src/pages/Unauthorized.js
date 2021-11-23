import { useAuth0 } from "@auth0/auth0-react";
import { Typography, Container, Button, Box } from "@mui/material";
import { useEffect } from "react"

const Unauthorized = () => {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
    useEffect(() => {
        if(!isLoading && !isAuthenticated) {
            loginWithRedirect();
        }
    });

    return (
        <Container>
            <Box 
                sx={{ display: 'flex', flexDirection: 'column' }}
            >
                <Typography variant="h3">
                    Unauthorized
                </Typography>
                <Typography variant="h6">
                    You are being redirected to the login page. 
                </Typography>
                <Button variant="contained" onClick={() => loginWithRedirect()}>Login</Button>
            </Box>
        </Container>
    )
}

export default Unauthorized