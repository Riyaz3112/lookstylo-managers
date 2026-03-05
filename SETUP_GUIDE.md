# COMPLETE GOOGLE APPS SCRIPT SETUP GUIDE

## Step 1: Open Your Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Open the "Lookstylo QR Scans" spreadsheet you created
3. Verify you have these headers in Row 1:
   - A1: `ID`
   - B1: `Name`
   - C1: `Phone`
   - D1: `Timestamp`

## Step 2: Create Google Apps Script

1. Click **Extensions** in the top menu bar
2. Select **Apps Script** (opens a new tab)
3. In the Apps Script editor, you'll see a function called `myFunction()`
4. Delete all the code and replace it with the code from `GOOGLE_APPS_SCRIPT_CODE.js`

## Step 3: Find Your Sheet ID

1. Go back to your Google Sheet tab
2. Copy your **Sheet ID** from the URL:
   - The URL looks like: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
   - Copy the long string between `/d/` and `/edit`
   - Example: `1A2b3C4d5E6f7G8h9I0j1K2l3M4n5O6p7Q8r9S0t`

## Step 4: Add Your Sheet ID to the Script

1. Go back to the **Apps Script tab**
2. Find the line that says: `var sheetId = 'YOUR_SHEET_ID_HERE';`
3. Replace `'YOUR_SHEET_ID_HERE'` with your actual Sheet ID (keep the quotes!)
4. Example: `var sheetId = '1A2b3C4d5E6f7G8h9I0j1K2l3M4n5O6p7Q8r9S0t';`

## Step 5: Deploy as Web App

1. In the Apps Script editor, click the **Deploy** button (blue, top right)
2. Click **New deployment**
3. Click the dropdown **Select type**, choose **Web app**
4. Under **Execute as**: Select your Google account (email)
5. Under **Who has access**: Select **Anyone**
6. Click **Deploy**
7. Google will ask for permissions - click **Authorize access**
8. After authorization, a success message appears with a **Deployment ID**
9. **Copy this URL** - this is your webhook address!
   - It looks like: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/useless`

## Step 6: Enter URL in Your App Settings

1. Open your **Lookstylo HTML app** in a browser
2. Click the **Settings** tab
3. Paste the deployment URL into the **Google Apps Script Webhook URL** field
4. The URL is automatically saved to your browser

## Step 7: Test the Connection

### Option A: Using Postman (Easiest)

1. Download [Postman](https://www.postman.com/downloads/)
2. Open Postman
3. Create a new request:
   - Method: **POST**
   - URL: Paste your deployment URL
   - Headers tab: Add `Content-Type: application/json`
   - Body tab: Select **raw** > **JSON** and paste:
   ```json
   {
     "id": "TEST-001",
     "name": "Test Customer",
     "phone": "1234567890"
   }
   ```
4. Click **Send**
5. You should see a success response
6. Check your Google Sheet - new row should appear!

### Option B: Using PowerShell (Windows)

Open PowerShell and run:

```powershell
$url = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/useless"
$body = @{
    id = "TEST-001"
    name = "Test Customer"
    phone = "1234567890"
} | ConvertTo-Json

Invoke-WebRequest -Uri $url -Method Post -Body $body -ContentType "application/json"
```

Replace `YOUR_SCRIPT_ID` with the ID from your deployment URL.

## Step 8: End-to-End Test in Your App

1. Go to **Generate Label** tab
2. Enter test data:
   - Order ID: `TEST-001`
   - Customer Name: `John Doe`
   - Phone: `555-1234`
3. A **QR Code** will appear
4. Go to **Scan QR** tab
5. Use your phone camera or QR scanner to scan the generated QR
6. Click **Save to Sheets**
7. Go back to your Google Sheet
8. **New row should appear with your data!**

## Common Issues & Fixes

| Problem | Solution |
|---------|----------|
| **"Script ID not found"** | Make sure you replaced `'YOUR_SHEET_ID_HERE'` with your actual ID in the script |
| **Deployment URL not working** | Go back to Apps Script > Deployments, click the latest one, copy the URL again |
| **No data appearing in sheet** | Check View > Logs in Apps Script editor - you'll see error messages there |
| **"Anyone" permission not available** | Make sure you're using a personal Google account, not a workspace account |
| **QR code not scanning** | Make sure the QR code is visible in the Generate Label tab |

## Need Help?

Check the error message in:
1. Your browser's Developer Console (F12)
2. Google Apps Script Logs (View > Logs)
3. The response message when you click "Save to Sheets"

If you see red errors in either place, share the exact message and I can help debug!
