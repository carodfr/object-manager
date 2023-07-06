import { Box, Typography } from "@mui/material";

/** this component shows a static footer with my basic information */
export default function CustomFooter() {
    return (<Box width="1" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ color: '#ebeaf0' }}>Carlos Alberto Rodr&iacute;guez Freitag</Typography>
        <Typography sx={{ color: '#ebeaf0' }}>+49 163 833 1913</Typography>
    </Box>);
}