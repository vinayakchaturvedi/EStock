import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Document, Link, Page, PDFDownloadLink, StyleSheet, Text, View} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft:60,
        paddingRight:60,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    titleContainer:{
        flexDirection: 'row',
        marginTop: 24,
    },
    reportTitle:{
        letterSpacing: 4,
        fontSize: 25,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontStyle: 'bold'
    },
    invoiceNoContainer: {
        flexDirection: 'row',
        marginTop: 36,
        justifyContent: 'flex-end'
    },
    invoiceDateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    invoiceDate: {
        fontSize: 12,
        fontStyle: 'bold',
    },
    label: {
        width: 100,
        fontStyle : 'bold'
    },
    label1 :{
        width: 40,
        fontStyle: 'bold'
    },
    headerContainer: {
        marginTop: 36
    },
    billTo: {
        marginTop: 20,
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique',
        fontStyle: 'bold',
        fontSize: 14
    },
    footerContainer:{
        flexDirection: 'row',
        marginTop: 16
    },
    footerTitle:{
        textAlign: 'center',
        fontSize: 12
    },
    text: {
        marginTop: 12,
        fontSize: 12,
        textAlign: 'justify',
        fontFamily: 'Times-Roman',
    },

    textContainer:{
       flexDirection: 'row',
        marginTop: 8
    },
    textParagraph:{
        textAlign: 'center',
        fontSize : 12,
        fontFamily: 'Times-Roman'
    }

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
            netAmount  :this.props.location.netAmount,
            side : this.props.location.side,
            customer : this.props.location.customer,
            sellAmount : this.props.location.sellAmount

        }

        this.handleClose = this.handleClose.bind(this)
    }

    handleClose(){
        this.props.history.push({
            pathname : "/Dashboard"
        })
    }

    MyDocumentBuy(stockName, tradingAccount, price, tradingDate, settlementDate, quantity, netAmount){
        return <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.titleContainer}>
                    <Text style={styles.reportTitle}> Invoice - ESTOCK  </Text>
                </View>
                <View style={styles.invoiceNoContainer}>
                    <Text style={styles.label}>Trading Account No:</Text>
                    <Text style={styles.invoiceDate}>{tradingAccount}</Text>
                </View >
                <View style={styles.invoiceDateContainer}>
                    <Text style={styles.label1}>Date:</Text>
                    <Text>{tradingDate}</Text>
                </View >
                <View style={styles.headerContainer}>
                    <Text style={styles.billTo}>Bill To:</Text>
                    <Text> {this.state.customer.customerName} </Text>
                    <Text> {this.state.customer.contactNumber} </Text>
                    <Text> {this.state.customer.emailId}</Text>
                </View>
                <Text style={styles.text}>
                    Hello {this.state.customer.customerName}, {"\n"}
                    Thank you for trading with EStock. This invoice contains the details of the recent Stock purchase. Please save it for your future reference.
                </Text>
                <View style={styles.textContainer}>
                    <Text style={styles.textParagraph}> Stock Name: {stockName} {"\n"}Stock Price: {price} {"\n"}Quantity : {quantity}{"\n"}
                    Net Amount: {netAmount} {"\n"}Trading Date:{tradingDate}{"\n"} Settlement Date: {settlementDate}
                    </Text>
                </View>
                <Text style={styles.text}>
                    The trade has not been settled. You can cancel the following purchase before the settlement date. Following that, netAmount wil be deducted from your trading
                    Account.
                </Text>

                <Text style={styles.text}>
                    Yours sincerely,{"\n"} EStock
                </Text>
                <View style={styles.footerContainer}>
                    <Text style={styles.footerTitle}>Thank you for your business</Text>
                </View>

            </Page>
        </Document>
    }

    MyDocumentSell(stockName, tradingAccount, price, tradingDate, settlementDate, quantity, netAmount, sellAmount){
        return <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.titleContainer}>
                    <Text style={styles.reportTitle}> Invoice - ESTOCK  </Text>
                </View>
                <View style={styles.invoiceNoContainer}>
                    <Text style={styles.label}>Trading Account No:</Text>
                    <Text style={styles.invoiceDate}>{tradingAccount}</Text>
                </View >
                <View style={styles.invoiceDateContainer}>
                    <Text style={styles.label1}>Date:</Text>
                    <Text>{tradingDate}</Text>
                </View >
                <View style={styles.headerContainer}>
                    <Text style={styles.billTo}>Bill To:</Text>
                    <Text> {this.state.customer.customerName} </Text>
                    <Text> {this.state.customer.contactNumber} </Text>
                    <Text> {this.state.customer.emailId}</Text>
                </View>
                <Text style={styles.text}>
                    Hello {this.state.customer.customerName}, {"\n"}
                    Thank you for trading with EStock. This invoice contains the details of the recent Stocks that you're willing to sell. Please save it for your future reference.
                </Text>
                <View style={styles.textContainer}>
                    <Text style={styles.textParagraph}> Stock Name: {stockName} {"\n"}Stock Price: {price} {"\n"}Quantity : {quantity}{"\n"}
                        Net Amount Earned: {sellAmount} {"\n"}Trading Date:{tradingDate}{"\n"} Settlement Date: {settlementDate}
                    </Text>
                </View>
                <Text style={styles.text}>
                    The trade has not been settled. You can cancel the following selling of Stocks before the settlement date. Following that, sellAmount will be added to your trading
                    Account.
                </Text>

                <Text style={styles.text}>
                    Yours sincerely,{"\n"} EStock
                </Text>
                <View style={styles.footerContainer}>
                    <Text style={styles.footerTitle}>Thank you for your business</Text>
                </View>

            </Page>
        </Document>
    }

    render() {
        const date = new Date()
        const extendedTime = date.getTime() + 2 * 24 * 60 * 60 * 1000;
        const newDate = new Date(extendedTime);
        const tradingDate = date.getDate().toString() + "-" + date.getMonth().toString() + "-" + date.getFullYear().toString()
        const settlementDate = newDate.getDate().toString() + "-" + newDate.getMonth().toString() + "-" + newDate.getFullYear().toString()

        if (this.state.side === 'BUY'){
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
                                The transaction has been completed. Kindly click on the link to download the invoice!
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <PDFDownloadLink document={this.MyDocumentBuy(this.state.stockName,
                                this.state.tradingAccount, this.state.price, tradingDate , settlementDate,  this.state.quantity, this.state.netAmount)} fileName="Invoice.pdf">
                                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now')}
                            </PDFDownloadLink>
                            <Button onClick={this.handleClose} color="primary">
                                Back To DashBoard
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )
        }
        else {
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
                                The trade has been completed. Kindly click on the link to download the invoice!
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <PDFDownloadLink document={this.MyDocumentSell(this.state.stockName,
                                this.state.tradingAccount, this.state.price, tradingDate , settlementDate,  this.state.quantity, this.state.netAmount, this.state.sellAmount)} fileName="Invoice.pdf">
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
}

export default GeneratePDF
