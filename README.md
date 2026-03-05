# Lookstylo Order Manager

A web-based application for generating A5 shipping labels with QR codes and barcodes, and scanning QR codes to sync data with Google Sheets.

## Features

- **Label Generator**: Create A5 labels with order details, barcode, and QR code
- **QR Scanner**: Scan QR codes from labels and sync data to Google Sheets
- **Settings**: Configure Google Apps Script webhook for data synchronization
- **Print Support**: Optimized for A5 paper printing

## Technologies Used

- React 18 (via CDN)
- Tailwind CSS
- JsBarcode for barcode generation
- QRCode.js for QR code generation
- HTML5 QR Code for scanning
- Google Apps Script for data storage

## Setup

1. Clone or download the repository
2. Open `index.html` in a web browser
3. For Google Sheets integration:
   - Create a Google Sheet with headers: ID, Name, Phone
   - Set up Google Apps Script with the provided doPost function
   - Deploy as web app and copy the URL to Settings

## Usage

- **Generate Labels**: Fill in order details and print the A5 label
- **Scan QR**: Use the scanner tab to read QR codes and save to Google Sheets
- **Settings**: Configure the Google Sheets webhook URL

## Hosting

This is a static HTML application that can be hosted on any web server or GitHub Pages.

## License

MIT License