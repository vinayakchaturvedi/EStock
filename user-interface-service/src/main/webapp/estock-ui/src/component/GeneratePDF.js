import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class GeneratePDF extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            open : false,
            setOpen  :false
        }

        this.handleClose = this.handleClose.bind(this)
    }

    handleClose(){
        this.setState({
            setOpen  :false
        })
    }

    render() {
        return (
            <div>
                <Dialog
                    open={true}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Stocks have been purchased!"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            The puchase has been completed. Kindly click on the link to download the invoice!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )

    }
}

export default GeneratePDF
