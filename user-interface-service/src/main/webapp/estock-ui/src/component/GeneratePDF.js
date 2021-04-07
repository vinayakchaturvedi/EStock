import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Document, Link, Page, PDFDownloadLink, StyleSheet, Text, View} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    title: {
        margin: 20,
        fontSize: 25,
        textAlign: 'center',
        backgroundColor: '#e4e4e4',
        textTransform: 'uppercase'
    },
    body: {
        flexGrow: 1,
    },
    row: {
        flexGrow: 1,
        flexDirection: 'row',
    },
    block: {
        flexGrow: 1,
    },
    text: {
        width: '60%',
        margin: 10,
        textAlign: 'justify',
    },
    textItalic: {
        width: '60%',
        margin: 10
    },
    fill1: {
        width: '40%',
        backgroundColor: '#e14427',
    },
    fill2: {
        flexGrow: 2,
        backgroundColor: '#e6672d',
    },
    fill3: {
        flexGrow: 2,
        backgroundColor: '#e78632',
    },
    fill4: {
        flexGrow: 2,
        backgroundColor: '#e29e37',
    },
});

class GeneratePDF extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            open : false,
            setOpen  :false,
            stockName : this.props.location.stockName,
            tradingAccount  :this.props.location.tradingAccount,
            price : this.props.location.price,
            tradingDate : this.props.location.tradingDate,
            quantity : this.props.location.quantity,
            netAmount  :this.props.location.netAmount
        }

        this.handleClose = this.handleClose.bind(this)
    }

    handleClose(){
        this.props.history.push({
            pathname : "/Dashboard"
        })
    }

    MyDocument(stockName, tradingAccount, price, tradingDate, quantity, netAmount){
        return <Document>
            <Page size="A4">
                <View style={styles.body}>
                    <View style={styles.row}>
                        <Text style={styles.text}>
                            StockName : {stockName} {"\n"}
                            Trading Account : {tradingAccount} {"\n"}
                            Price : {price} {"\n"}
                            Trading Date : {tradingDate} {"\n"}
                            Quantity : {quantity} {"\n"}
                            Net Amount : {netAmount} {"\n"}
                        </Text>
                    </View>
                </View>
            </Page>
        </Document>
    }

    render() {
        const date = new Date()
        const tradingDate = date.getDate().toString() + "-" + date.getMonth().toString() + "-" + date.getFullYear().toString()
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
                            The purchase has been completed. Kindly click on the link to download the invoice!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <PDFDownloadLink document={this.MyDocument(this.state.stockName,
                            this.state.tradingAccount, this.state.price, tradingDate, this.state.quantity, this.state.netAmount)} fileName="Invoice.pdf">
                            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
                        </PDFDownloadLink>
                        <Button onClick={this.handleClose} color="primary">
                            Back To DashBoard
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )

    }
}

export default GeneratePDF
