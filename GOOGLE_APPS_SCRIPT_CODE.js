// ============================================================================
// GOOGLE APPS SCRIPT CODE FOR LOOKSTYLO APP
// Copy ALL of the code below into your Google Apps Script
// ============================================================================

// IMPORTANT: Replace YOUR_SHEET_ID_HERE with your actual Google Sheet ID
// See GOOGLE_APPS_SCRIPT_SETUP.md for instructions on finding your Sheet ID
function getSpreadsheetId() {
  return "YOUR_SHEET_ID_HERE"; // Example: "1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7"
}

// Your sheet name (default is "Sheet1", change only if you renamed it)
function getSheetName() {
  return "Sheet1";
}

// ============================================================================
// MAIN FUNCTION: Receives POST requests from your Lookstylo app
// This function automatically processes QR scan data
// ============================================================================
function doPost(e) {
  try {
    // Parse the incoming JSON data from your app
    const jsonString = e.postData.contents;
    const data = JSON.parse(jsonString);
    
    // Extract fields with fallback to empty string if not provided
    const orderId = data.id || "";
    const customerName = data.name || "";
    const phone = data.phone || "";
    
    // Create a new row with timestamp and extracted data
    const timestamp = new Date();
    const row = [timestamp, orderId, customerName, phone, ""];
    
    // Open your spreadsheet and sheet
    const ss = SpreadsheetApp.openById(getSpreadsheetId());
    const sheet = ss.getSheetByName(getSheetName());
    
    // Add the row to the sheet
    sheet.appendRow(row);
    
    // Send success response to your app
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Data saved successfully",
      timestamp: timestamp,
      receivedData: {
        id: orderId,
        name: customerName,
        phone: phone
      }
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // If something goes wrong, send an error response
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString(),
      errorDetails: error.stack
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================================
// OPTIONAL: Test function - Use this to test without scanning from the app
// How to use:
// 1. Un-comment the function below (remove the // at the start of each line)
// 2. Click "Run" at the top, select "testPost"
// 3. Check your Google Sheet - you should see a test row added
// ============================================================================

/*
function testPost() {
  // Create test data
  const testData = {
    id: "TEST-SCRIPT-001",
    name: "Test Customer Script",
    phone: "9999999999"
  };
  
  // Simulate the request
  const e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  // Call doPost with test data
  const result = doPost(e);
  
  // Log the result
  Logger.log("Test result: " + result.getContent());
}
*/

// ============================================================================
// SHEET SCHEMA (What your columns should look like)
// ============================================================================
/*
Column A: Timestamp  (Automatically filled with current date/time)
Column B: Order ID   (From QR code scan)
Column C: Customer Name (From QR code scan)
Column D: Phone      (From QR code scan)
Column E: Notes      (Optional - you can add notes manually in Google Sheet)

Example row:
| 3/5/2024 10:30:15 AM | ORD-001 | John Doe | 9999999999 | Important note |
*/

// ============================================================================
// HOW THIS WORKS
// ============================================================================
/*
1. User opens Lookstylo app in browser
2. User generates a QR code and scans it
3. QR contains JSON data: {id, name, phone}
4. App sends POST request to your deployment URL
5. doPost() function receives the data
6. Data is extracted and stored in Google Sheet
7. Response is sent back to app confirming success
8. User sees "Successfully saved to Google Sheets!" message
9. Data is now permanently stored in your Sheet

DEPLOYMENT URL FORMAT:
https://script.google.com/macros/s/[DEPLOYMENT_ID]/useless

Example:
https://script.google.com/macros/s/AKfycbw1a2b3c4d5e6f7g8h9i0j1k2l3m_unused/useless
*/
