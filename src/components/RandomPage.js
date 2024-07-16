import { Box,Typography,List,ListItem,ListItemButton, ListItemIcon, ListItemAvatar, ListItemText} from "@mui/material";

const RandomPage=()=>{
    return(
        <Box>
            <Box>
            <Typography variant="h1">h1</Typography>
            <Typography variant="h2">h2</Typography>
            <Typography variant="h2">h3</Typography>
            <Typography variant="h4">h4</Typography>
            <Typography variant="h5">h5</Typography>
            <Typography variant="h6">h6</Typography>
            <Typography variant="body1">body1</Typography>
            <Typography variant="body2">body2</Typography>
            </Box>
            <Box>
                <List>
                    <ListItem>ListItem</ListItem>
                    <ListItemButton>ListItemButton</ListItemButton>
                    <ListItemIcon>ListItemIcon</ListItemIcon>
                    <ListItemAvatar>ListItemAvatar</ListItemAvatar>
                    <ListItemText>Hello</ListItemText>
                </List>
            </Box>
        </Box>
    )
}

export default RandomPage;