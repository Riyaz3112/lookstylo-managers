# Google Apps Script Setup Guide for Lookstylo App
## Complete Step-by-Step Instructions for Beginners

---

## ⚠️ IMPORTANT: What This Does
When someone scans a QR code in your Lookstylo app, the data (Order ID, Customer Name, Phone) will automatically save to a Google Sheet. You're essentially creating a **backend database** for your app.

---

## 📋 PART 1: Create a Google Sheet

### Step 1: Create a New Google Sheet
1. Go to **Google Sheets**: https://sheets.google.com
2. Click the **+ Blank** (or "+ Create") button
3. Name it: **"Lookstylo Orders"** (or any name you want)
4. Click on **Sheet1** tab at the bottom (where your data will be stored)

### Step 2: Create Column Headers
In the first row, add these column headers:
- **A1**: `Timestamp`
- **B1**: `Order ID`
- **C1**: `Customer Name`
- **D1**: `Phone`
- **E1**: `Notes`

Your sheet should now look like this:

```
| Timestamp | Order ID | Customer Name | Phone | Notes |
|-----------|----------|---------------|-------|-------|
|           |          |               |       |       |
```

**✓ Your Google Sheet is ready!**

---

## 🔧 PART 2: Create Google Apps Script

### Step 3: Open Google Apps Script Editor
1. From your **Google Sheet**, click the menu: **Extensions** → **Apps Script**
   - If you don't see "Apps Script", try: **Tools** → **Script Editor**
2. A new tab will open with the Apps Script editor
3. You'll see a file called `Code.gs` on the left side

### Step 4: Clear the Default Code
1. Select ALL the code in `Code.gs` (Press **Ctrl+A** or **Cmd+A**)
2. Delete it (Press **Delete**)

### Step 5: Paste the Exact Code Below

Copy and paste **ALL** of this code into the empty `Code.gs` file:

```javascript
// Set this to your Google Sheet ID
function getSpreadsheetId() {
  // Method: Open any cell in your sheet, look at the URL:
  // https://docs.google.com/spreadsheets/d/[THIS_IS_YOUR_ID]/edit
  // Copy the ID from the URL and paste it below between the quotes
  return "YOUR_SHEET_ID_HERE";
}

function getSheetName() {
  return "Sheet1"; // Change if your sheet has a different name
}

// This function receives POST requests from your Lookstylo app
function doPost(e) {
  try {
    // Get the JSON data from the request
    const jsonString = e.postData.contents;
    const data = JSON.parse(jsonString);
    
    // Extract the fields
    const orderId = data.id || "";
    const customerName = data.name || "";
    const phone = data.phone || "";
    
    // Add data to Google Sheet
    const timestamp = new Date();
    const row = [timestamp, orderId, customerName, phone, ""];
    
    // Get the spreadsheet and sheet
    const ss = SpreadsheetApp.openById(getSpreadsheetId());
    const sheet = ss.getSheetByName(getSheetName());
    
    // Append the row to the sheet
    sheet.appendRow(row);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Data saved successfully",
      timestamp: timestamp
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function (uncomment to test)
// function testPost() {
//   const testData = {
//     id: "TEST-001",
//     name: "Test Customer",
//     phone: "9999999999"
//   };
//   
//   const e = {
//     postData: {
//       contents: JSON.stringify(testData)
//     }
//   };
//   
//   const result = doPost(e);
//   Logger.log("Test result: " + result.getContent());
// }
```

**Screenshot Description:**
- The code editor shows a file named `Code.gs` with JavaScript code
- Line 5 or so: `return "YOUR_SHEET_ID_HERE";` - This is where you'll add your Sheet ID
- The `doPost` function receives data from your app
- The data gets saved to your Google Sheet

---

## 📍 PART 3: Add Your Google Sheet ID

### Step 6: Get Your Sheet ID
1. Go back to your **Google Sheet** tab
2. Look at the **URL** in your browser address bar. It looks like:
   ```
   https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7/edit#gid=0
   ```
3. Find the long ID between `/d/` and `/edit`. Copy this entire string:
   ```
   1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7
   ```

### Step 7: Paste the Sheet ID into the Code
1. Go back to your **Apps Script** tab
2. Find this line in the code:
   ```javascript
   return "YOUR_SHEET_ID_HERE";
   ```
3. Replace `YOUR_SHEET_ID_HERE` with your actual Sheet ID (keep the quotes):
   ```javascript
   return "1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7";
   ```
4. Click **File** → **Save** (or Ctrl+S)

**Screenshot Description:**
- The `Code.gs` tab shows the function with your Sheet ID now filled in
- The line should look like: `return "1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7";` with YOUR ID

---

## 🚀 PART 4: Deploy as Web App

This is the most important part! You're creating a public endpoint that your HTML app will send data to.

### Step 8: Create a Deployment
1. In the Apps Script editor, click **Deploy** button (top right)
2. Click **New deployment** (or **+ New**)

**Screenshot Description:**
- Top-right corner shows a blue "Deploy" button
- Clicking it shows a dropdown menu
- "New deployment" is highlighted at the top

### Step 9: Select Deployment Type
1. A dialog box appears asking "Select type"
2. Click the **Select type** dropdown (currently says "Select type")
3. Choose **Web app** from the list

**Screenshot Description:**
- A popup dialog titled "New deployment" appears
- First dropdown showing "⚙️ Select type"
- Clicking it reveals options: "Web app", "Library", "API Executable"
- Select "Web app"

### Step 10: Configure Deployment Settings
After selecting "Web app", you'll see these fields:

```
Select type: ⚙️ Web app

Description: (optional)
Enter: "Lookstylo Orders API"

Execute as: (This is already set)
← Select this to show options →

Who has access: (This is important!)
← Select this to show options →
```

**For "Execute as":**
- Click the dropdown
- Select your **email address** (it should be already selected)
- This means the script runs with your permissions

**For "Who has access":**
- Click the dropdown
- Select **"Anyone"** or **"Anyone with a Google Account"**
- This allows your HTML app to send data to it
- **⚠️ Important**: If you select "Anyone", it's publicly accessible (but authenticated requests only)

**Screenshot Description:**
- Dialog showing three fields:
  1. Description field with "Lookstylo Orders API"
  2. "Execute as" dropdown showing your email address
  3. "Who has access" dropdown showing "Anyone"

### Step 11: Deploy!
1. Click the blue **Deploy** button at the bottom

**Screenshot Description:**
- A gray panel on the right side with:
  - Text input fields for Description
  - "Execute as" and "Who has access" dropdowns
  - Blue "Deploy" button at the bottom right

---

## 🔗 PART 5: Get the Deployment URL

### Step 12: Copy Your Deployment URL
After clicking Deploy, a popup appears showing:

```
Deployment successful!

New deployment created.
Run as: YOUR_EMAIL@gmail.com
Who has access: Anyone

Deployment ID: AKfycbw...xyz (very long ID)
```

Below that, click **Test Deployments** or look for a URL that starts with:
```
https://script.google.com/macros/s/AKfycbw...xyz/useless
```

1. **Copy this entire URL** (Ctrl+C or Cmd+C)

**! Important**: The URL ends with `/useless` (or sometimes `/dev` or just the ID). You need the FULL URL including this ending.

**Screenshot Description:**
- A success popup showing:
  - Text: "Deployment successful!"
  - A URL box displaying: "https://script.google.com/macros/s/AKfycbw...xyz/useless"
  - Copy icon next to the URL
  - "Close" button at the bottom

### Step 13: Find the URL Later (If You Forget)
1. Open your **Google Apps Script** project again
2. Click **Deploy** → **Manage deployments**
3. You'll see your deployment listed with the URL
4. Click the URL or the copy icon next to it

---

## 🧪 PART 6: Test the Deployment

Now you'll test if everything works BEFORE using it in your app.

### Option A: Test Using curl (Command Line)

**Windows (PowerShell):**
1. Open PowerShell on your computer (Search "PowerShell")
2. Paste this command (replace YOUR_URL with your actual URL):

```powershell
$params = @{
    Uri = "YOUR_URL_HERE"
    Method = "POST"
    Headers = @{
        "Content-Type" = "application/json"
    }
    Body = @{
        id = "TEST-123"
        name = "John Doe"
        phone = "9999999999"
    } | ConvertTo-Json
}
Invoke-WebRequest @params
```

Example with actual URL:
```powershell
$params = @{
    Uri = "https://script.google.com/macros/s/AKfycbw1234abcd567xyz/useless"
    Method = "POST"
    Headers = @{
        "Content-Type" = "application/json"
    }
    Body = @{
        id = "TEST-123"
        name = "John Doe"
        phone = "9999999999"
    } | ConvertTo-Json
}
Invoke-WebRequest @params
```

3. Press Enter
4. If successful, you'll see:
   ```
   StatusCode        : 200
   StatusDescription : OK
   ```

**macOS/Linux:**
```bash
curl -X POST "YOUR_URL_HERE" \
  -H "Content-Type: application/json" \
  -d '{"id":"TEST-123","name":"John Doe","phone":"9999999999"}'
```

**Screenshot Description:**
- PowerShell window showing the curl command
- Output showing "StatusCode : 200" and "StatusDescription : OK"

### Option B: Test Using Postman (Easier GUI)

1. Download **Postman** from: https://www.postman.com/downloads/
2. Open Postman
3. Create a new request:
   - Click **File** → **New** → **Request**
   - Or just click **+ Tab** at the top
4. Configure the request:
   - **Method**: Change from "GET" to "POST" (dropdown on left)
   - **URL**: Paste your deployment URL: `https://script.google.com/macros/s/AKfycbw.../useless`
   - **Headers tab**: Click "Headers" tab
     - Add: `Key: Content-Type` | `Value: application/json`
   - **Body tab**: Click "Body" tab
     - Select "raw" from the radio buttons
     - Paste this JSON:
       ```json
       {
         "id": "TEST-123",
         "name": "John Doe",
         "phone": "9999999999"
       }
       ```
5. Click the blue **Send** button
6. Below, you should see:
   ```json
   {
     "status": "success",
     "message": "Data saved successfully",
     "timestamp": "2024-03-05T10:30:00.000Z"
   }
   ```

**Screenshot Description:**
- Postman interface showing:
  - Method dropdown set to "POST"
  - URL field with deployment URL
  - "Headers" tab active showing Content-Type: application/json
  - "Body" tab showing raw JSON data
  - Blue "Send" button on the right
  - Response panel below showing success message

### Step 14: Verify Data in Google Sheet
1. Go back to your **Google Sheet** tab
2. You should see a new row added:
   ```
   | Timestamp | Order ID | Customer Name | Phone | Notes |
   |-----------|----------|---------------|-------|-------|
   | [current] | TEST-123 | John Doe      | 9999... |  |
   ```
3. **Success!** Your script is working! ✓

---

## 📱 PART 7: Configure Your Lookstylo App

Now connect your deployment URL to the HTML app.

### Step 15: Open Settings Tab in Lookstylo App
1. Open your **Lookstylo HTML app** in a browser
2. Click the **Settings** tab (top right)

**Screenshot Description:**
- Browser showing the Lookstylo app
- Navigation bar with "Generate Label | Scan QR | Settings"
- Settings tab selected showing a form

### Step 16: Enter Deployment URL
1. In the **Settings** tab, you'll see a text box asking for:
   ```
   Google Apps Script Webhook URL
   ```
2. **Paste your deployment URL** here:
   ```
   https://script.google.com/macros/s/AKfycbw.../useless
   ```
3. The URL is **automatically saved** to your browser's local storage
4. You can see the URL is saved because it appears in the text box when you reload

**Screenshot Description:**
- Settings tab showing:
  - Text area labeled "Google Apps Script Webhook URL"
  - Your URL pasted in the field
  - Blue "Test Connection" button
  - Instructions text below

### Step 17: Test Connection (Optional)
1. Click the **Test Connection** button in Settings
2. An alert should appear saying: `Current URL: https://script.google.com/macros/s/...`
3. This means the URL is saved! ✓

---

## ✅ PART 8: Full End-to-End Test

Now test the complete workflow:

### Step 18: Generate and Scan
1. Go to **Generate Label** tab
2. Fill in test data:
   - Order ID: `ORD-001`
   - Customer Name: `Test Customer`
   - Phone: `9999999999`
   - Address: Can be anything
3. Click **Print A5 Label** (but don't actually print - we just need the QR code on screen)
4. You should see a QR code generated on the right side

**Screenshot Description:**
- Generate Label tab with form filled out
- A5 label preview showing the QR code

### Step 19: Scan the QR Code
1. Go to **Scan QR** tab
2. Click **Scan QR** (allow camera permission if prompted)
3. Hold your phone/another device with the QR code in front of your webcam
4. The scanner should detect the QR and show:
   ```
   ✓ QR Scan Complete!
   Order ID: ORD-001
   Customer Name: Test Customer
   Phone: 9999999999
   ```

**Screenshot Description:**
- Scan QR tab with the video camera feed from webcam
- A green box showing the scanning area
- After scan, a success message showing the extracted data

### Step 20: Save to Google Sheets
1. Click the **💾 Save to Sheets** button
2. You should see:
   ```
   Successfully saved to Google Sheets!
   ```
3. The data should disappear after 3 seconds (automatically reset)

**Screenshot Description:**
- Success message: "Successfully saved to Google Sheets!"
- Green checkmark icon

### Step 21: Verify in Google Sheet
1. Go back to your **Google Sheet**
2. Refresh the page (F5)
3. You should see a new row:
   ```
   | Timestamp | Order ID | Customer Name | Phone | Notes |
   |-----------|----------|---------------|-------|-------|
   | [time]    | ORD-001  | Test Customer | 9999...| |
   ```

**🎉 SUCCESS! Everything is connected!**

---

## 🐛 TROUBLESHOOTING

### Problem: "Failed to sync. Check console"
**Solution:**
1. Check that your deployment URL is correct in Settings
2. Make sure it starts with `https://script.google.com/macros/s/`
3. Make sure it ends with `/useless` (or the deployment ID)
4. Redeploy: In Apps Script, click **Deploy** → **Manage deployments** → see your URL

### Problem: Data isn't showing in Google Sheet
**Solution:**
1. Check that your **Sheet ID** is correct in the Apps Script code
2. Check that your column headers are exactly: `Timestamp | Order ID | Customer Name | Phone | Notes`
3. Try testing with curl/Postman first to see if the API works
4. Check the Apps Script logs: **View** → **Logs** to see what's happening

### Problem: "Script completed with error"
**Solution:**
1. Go to **Apps Script** → **View** → **Execution log**
2. Look for the error message
3. Common fixes:
   - Check your Sheet ID is correct
   - Make sure your sheet name matches (default: "Sheet1")
   - Make sure your Google Sheet has the correct column headers
4. Click **Ctrl+A** → Delete → paste the code again from above

### Problem: Can't find the Deployment URL
**Solution:**
1. In Apps Script, click **Deploy** (top right)
2. Click **Manage deployments**
3. You'll see your deployment listed
4. The URL is shown there - copy it

---

## 📝 SUMMARY CHECKLIST

✓ Create Google Sheet with headers (Timestamp, Order ID, Customer Name, Phone, Notes)
✓ Create Apps Script project in Google Sheet
✓ Paste the exact code provided above
✓ Add your Sheet ID to the code
✓ Deploy as Web app → Execute as (your email) → Who has access (Anyone)
✓ Copy the deployment URL
✓ Test with curl or Postman (should get `status: success`)
✓ Verify data appears in Google Sheet
✓ Paste deployment URL into Lookstylo Settings tab
✓ Generate label, scan QR code
✓ Click "Save to Sheets"
✓ Verify new row appears in Google Sheet

---

## 🔒 Important Notes

1. **URL is like a password**: Anyone with your deployment URL can send data to your sheet. If you want to restrict who can use it, use the "Who has access" option in deployment settings.

2. **Google Sheet is accessible**: Only people with access to your Google Sheet can see the data. The URL itself doesn't reveal your data - it just accepts POST requests.

3. **If you delete the deployment**: The URL will stop working. You'll need to create a new deployment and update your app with the new URL.

4. **Redeploying**: If you make changes to your Google Apps Script code, you need to:
   - Save the code (Ctrl+S)
   - Click **Deploy** → **New deployment**
   - Copy the new URL
   - Update the URL in your Lookstylo app

---

## 📞 Need Help?

**Common Resources:**
- Google Apps Script docs: https://developers.google.com/apps-script
- Postman tutorials: https://learning.postman.com/
- Google Sheets API: https://developers.google.com/sheets/api

**Test your URL is formatted correctly:**
- Should look like: `https://script.google.com/macros/s/[LONG_ID]/useless`
- Should NOT have extra characters or spaces
- Should NOT have a trailing slash after "useless"

Good luck! 🚀
