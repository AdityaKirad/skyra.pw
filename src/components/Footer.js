import React from 'reactn';
import styled from 'styled-components';
import { Box, Typography, Container, Hidden } from '@material-ui/core';

import SkyraLogo from 'assets/skyraLogo';
import theme from 'meta/theme';

const FooterContainer = styled.footer`
	padding: 50px 0px;
	background: ${theme.palette.secondary.main};
	height: 200px;

	${theme.breakpoints.down('xs')} {
		height: auto;
	}

	.container {
		display: flex;

		justify-content: space-around;

		${theme.breakpoints.down('xs')} {
			flex-direction: column;
			align-content: center;
			justify-content: center;
			text-align: center;
			align-items: center;

			& > *:not(:first-of-type) {
				margin-top: 20px;
			}
		}
	}
`;

const Left = () => (
	<Box textAlign="left">
		<Typography>Support Server</Typography>
		<Typography>Invite Link</Typography>
		<Typography>Patreon</Typography>
	</Box>
);
const Right = () => (
	<Box textAlign="right">
		<Typography>Support Server</Typography>
		<Typography>Invite Link</Typography>
		<Typography>Patreon</Typography>
	</Box>
);

const Middle = () => (
	<Box display="flex" flexDirection="column">
		<SkyraLogo />
		<Typography style={{ marginTop: 15 }} variant="caption">
			Copyright © 2019 Kyra. All rights reserved.
		</Typography>
	</Box>
);

const Footer = () => {
	return (
		<FooterContainer>
			<Container maxWidth="sm">
				<Hidden xsDown>
					<Box className="container">
						<Left />
						<Middle />
						<Right />
					</Box>
				</Hidden>
				<Hidden smUp>
					<Box className="container">
						<Box display="flex" justifyContent="space-around" width="100%">
							<Left />
							<Right />
						</Box>
						<Middle />
					</Box>
				</Hidden>
			</Container>
		</FooterContainer>
	);
};

export default Footer;
