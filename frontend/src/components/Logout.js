import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, MenuItem, Skeleton, Menu, Typography, } from '@mui/material';

const Logout = () => {
    const { isAuthenticated, isLoading, user, logout } = useAuth0();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const onLogout = () => {
        handleClose();
        logout();
    }

    return ( 
        isLoading 
        ? (<Skeleton>
            <Button />
        </Skeleton>
        )
        : isAuthenticated && 
        (
            <div>
                <Typography
                    variant="h6"
                    id="logout-button"
                    aria-controls="logout-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    color="inherit"
                    onClick={handleClick}
                    sx={{'&:hover': {
                        cursor: 'pointer'
                    }}}
                >
                    {user.name}
                </Typography>
                <Menu
                    id="logout-menu"
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    open={open}
                >
                    <MenuItem onClick={onLogout}>Logout</MenuItem>
                </Menu>
            </div>
        )
    )
    
    
}

export default Logout;