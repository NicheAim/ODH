import FlatButton from 'material-ui/FlatButton';
import HelpIcon from '@material-ui/icons/Help';
// import { makeStyles } from "@material-ui/core/styles";
import Popover from 'material-ui-next/Popover';
import Typography from 'material-ui-next/Typography';
import Button from 'material-ui-next/Button';
// import Card from 'components/Card';
import ContainerCard from './ContainerCard';
// import Card from 'material-ui-next/Card';
import { Cell, Grid } from 'styled-css-grid';
import React, { Component, Fragment } from 'react';

export default class SupportContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { anchorEl: null, open: false, id: undefined };
  }

  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      open: true,
      id: 'simple-popover',
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
      open: false,
      id: undefined,
    });
  };

  render() {
    return (
      <div>
        {/* <Button
          component={HelpIcon}
          onClick={this.handleClick}
        >
          
        </Button> */}
        <FlatButton
          style={{ textAlign: 'center' }}
          icon={<HelpIcon style={{ color: 'red' }}/>}
          onClick={this.handleClick}
        />
        <Popover
          id={this.state.id}
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <ContainerCard>
            <Grid columns={8}>
              <Cell width={8}>
                <Typography sx={{ p: 2 }}>
                  Do you need support, go to the <a
                    href="https://share.hsforms.com/1oZBbGSTAQJiblTyLuJcCrA3qqda"
                    target="_blank"
                  >following form</a>
                </Typography>
              </Cell>
            </Grid>
          </ContainerCard>
        </Popover>
      </div>
    );
  }
}

// export default class SupportContainer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { anchorEl: null };
//   }

//   handleClick(event) {
//     this.setState((state) => ({
//       anchorEl: event.currentTarget,
//     }));
//   }

//   handleClose() {
//     this.setState((state) => ({
//       anchorEl: null,
//     }));
//   }

//   render() {
//     const open = Boolean(this.state.anchorEl);
//     const id = open ? 'simple-popover' : undefined;

//     return (
//       <Fragment>
//         <FlatButton
//           style={{ textAlign: 'center' }}
//           icon={<HelpIcon />}
//           onClick={this.handleClick}
//         />
//         <Popover
//           id={id}
//           open={open}
//           anchorEl={this.state.anchorEl}
//           onClose={this.handleClose}
//           anchorOrigin={{
//             vertical: 'bottom',
//             horizontal: 'left',
//           }}
//         >
//           <Typography sx={{ p: 2 }}>
//             Do you need support, go to the following
//             <a href="https://share.hsforms.com/1oZBbGSTAQJiblTyLuJcCrA3qqda">
//               form
//             </a>
//           </Typography>
//         </Popover>
//       </Fragment>
//     );
//   }
// }
