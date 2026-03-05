# ⚠️ COMMON MISTAKES & TROUBLESHOOTING
## Avoid These Pitfalls!

---

## MISTAKE #1: Wrong Sheet ID Format
### ❌ What Goes Wrong
User copies the Sheet ID incorrectly, including extra characters.

### Example:
```javascript
// WRONG - includes /edit#gid=0
return "1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7/edit#gid=0";

// CORRECT - just the ID part
return "1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7";
```

### ✅ Fix:
1. Open your Google Sheet
2. Copy the URL: `https://docs.google.com/spreadsheets/d/[THIS_PART_ONLY]/edit#gid=0`
3. Paste ONLY the part between `/d/` and `/edit`
4. Do NOT include `/edit#gid=0`

---

## MISTAKE #2: Forgot to Add Column Headers
### ❌ What Goes Wrong
User creates a Google Sheet but doesn't make the header row. When data is appended, it goes into row 1 without column labels.

### Example Sheet (WRONG):
```
| [data instead of header] | | | |
```

### ✅ Fix:
1. Make your first row EXACTLY like this:
   - A1: `Timestamp`
   - B1: `Order ID`
   - C1: `Customer Name`
   - D1: `Phone`
   - E1: `Notes`
2. Data will be added starting from row 2
3. You can always add headers in row 1 later, data won't be affected

---

## MISTAKE #3: Sheet Name Doesn't Match Code
### ❌ What Goes Wrong
User renamed their sheet to "Orders" but the code still looks for "Sheet1".

### Example Error Message:
```
Exception: Sheet not found
```

### ✅ Fix:
1. Check what your sheet is named (bottom of screen)
2. Update this line in the code:
   ```javascript
   return "Sheet1"; // Change this to match your sheet name
   ```
   To:
   ```javascript
   return "Orders"; // If your sheet is named "Orders"
   ```
3. Save and redeploy

---

## MISTAKE #4: Deployment URL is Incorrect or Incomplete
### ❌ What Goes Wrong
User copies only part of the URL, or includes extra characters.

### Examples (WRONG):
```
https://script.google.com/macros/s/AKfycbw123/  (missing /useless)
/macros/s/AKfycbw123/useless (missing https://script.google.com)
https://script.google.com/macros/s/AKfycbw123/useless/ (extra slash)
```

### Example (CORRECT):
```
https://script.google.com/macros/s/AKfycbw1234567890abcdefghijklmno/useless
```

### ✅ Fix:
1. In Google Apps Script, click **Deploy** → **Manage deployments**
2. Find your deployment, click the URL or copy icon
3. The full URL will be copied automatically
4. Make sure it has NO trailing spaces or characters
5. Paste into Lookstylo Settings tab

---

## MISTAKE #5: Didn't Deploy - Just Saved the Code
### ❌ What Goes Wrong
User pasted the code, saved it, but never clicked **Deploy**. The code exists but has no public URL.

### How to Tell:
- You have no URL to give to the app
- Testing with curl/Postman returns 404

### ✅ Fix:
1. In Google Apps Script editor, click **Deploy** (top right)
2. Click **New deployment**
3. Select type: **Web app**
4. Click **Deploy**
5. Copy the URL that appears
6. Test it before using in app

---

## MISTAKE #6: Gave Wrong Permissions During Deployment
### ❌ What Goes Wrong
User selected "Only myself" or "Specific people" instead of "Anyone" for "Who has access".

### Results:
- Only you can send data to the endpoint
- Lookstylo app won't work if you're not logged in
- Testing with curl/Postman might fail

### ✅ Fix:
1. Click **Deploy** → **Manage deployments**
2. Find your deployment, click the edit/gear icon
3. Change "Who has access" to **"Anyone"**
4. Click **Update**
5. Test again

---

## MISTAKE #7: Forgot to Save Before Deploying
### ❌ What Goes Wrong
User modified the code, then deployed without saving. The old version is deployed.

### Results:
- Changes don't take effect
- Debugging is confusing: "I changed it but it still doesn't work!"

### ✅ Fix:
1. Modified the code? Press **Ctrl+S** (or **Cmd+S**)
2. You'll see "Saved" in the editor briefly
3. THEN click **Deploy** → **New deployment**
4. Each code change requires a new deployment with a new URL

---

## MISTAKE #8: Pasted Wrong Deployment URL into Settings
### ❌ What Goes Wrong
User tested multiple APIs or has multiple sheets. Each has a different URL. User pasted the wrong URL into Lookstylo Settings.

### Results:
- Data saves somewhere else
- User can't find their data

### ✅ Fix:
1. In Lookstylo Settings, paste the EXACT URL from THIS deployment
2. If unsure, go to Google Apps Script → **Deploy** → **Manage deployments**
3. Find your "Lookstylo Orders API" deployment
4. Copy that URL (the correct one!)
5. Paste into Settings

---

## MISTAKE #9: Used "Test Deployments" URL Instead of Actual Deployment
### ❌ What Goes Wrong
User sees a "Test Deployments" option in the dropdown and uses that URL instead of a real deployment.

### Results:
- URL starts with: `https://script.google.com/macros/d/` (has `/d/`, not `/s/`)
- URL works temporarily but can reset or expire
- Data might not save reliably

### ✅ Fix:
1. Use **New deployment** for production (web app access)
2. "Test Deployments" is only for testing during development
3. Real deployment URL has `/s/` not `/d/`: `/macros/s/`

---

## MISTAKE #10: Browser Cache Issues
### ❌ What Goes Wrong
User changes Settings URL, but the old URL is still cached in browser. When they scan, it uses the old URL.

### How to Tell:
- Changed URL in Settings but still getting old errors
- Other browser features also behaving strangely

### ✅ Fix:
1. Hard refresh the page:
   - **Windows**: Ctrl+Shift+Delete or Ctrl+Shift+R
   - **Mac**: Cmd+Shift+R
2. Or clear browser cache manually
3. Reload the Lookstylo app
4. Enter the new URL in Settings again
5. Test the connection

---

## MISTAKE #11: HTTP vs HTTPS
### ❌ What Goes Wrong
User accidentally typed `http://` instead of `https://`.

### Results:
- Browser blocks the request (mixed content)
- CORS error in console
- Request fails silently

### ✅ Fix:
Make sure your deployment URL starts with: `https://` (with S)
NOT: `http://` (without S)

---

## MISTAKE #12: Didn't Give Google Apps Script Permission to Access Sheet
### ❌ What Goes Wrong
When first deploying, Google asks for permissions but user clicked "Deny" or closed the dialog.

### How to Tell:
- Get errors like "Authorization required"
- App doesn't have permission to edit sheet

### ✅ Fix:
1. Go back to Google Apps Script
2. Try running the test function: select "testPost" from dropdown, click Run
3. Click "Review Permissions" when prompted
4. Select your Google account
5. Click "Allow"
6. Now try deploying again

---

## MISTAKE #13: Checking Google Sheet Without Refreshing
### ❌ What Goes Wrong
User looks at Google Sheet immediately after saving, but sees no data.

### Why:
- Browser might have cached the old sheet
- Google Sheet sometimes updates slowly

### ✅ Fix:
1. Press **F5** or **Ctrl+R** to refresh the sheet page
2. Wait 2-3 seconds
3. You should now see the new row
4. If not, see "MISTAKE #10: Browser Cache Issues"

---

## ERROR MESSAGE GUIDE

### "Failed to sync. Check console"
**Cause:** Deployment URL is wrong or connection failed
**Fix:**
1. Check URL in Settings is correct
2. Make sure URL is complete: `https://script.google.com/macros/s/ID/useless`
3. Test with curl or Postman
4. Check browser console (F12) for more details

### "Script completed with error"
**Cause:** Problem in Google Apps Script code
**Fix:**
1. In Apps Script, click **View** → **Logs** or **Execution log**
2. Look for the error message
3. Common causes:
   - Wrong Sheet ID
   - Sheet name doesn't exist
   - Google Sheet has no headers
4. Fix the issue and redeploy

### "Cannot find spreadsheet"
**Cause:** Sheet ID is wrong
**Fix:**
1. Get the correct Sheet ID from your Google Sheet URL
2. Update the code: `return "YOUR_CORRECT_ID_HERE";`
3. Save and redeploy

### "Cannot find sheet named 'Sheet1'"
**Cause:** Your sheet has a different name
**Fix:**
1. Check what your sheet is called (bottom of Google Sheet)
2. Update the code: `return "YourSheetName";`
3. Save and redeploy

### "Unexpected token < in JSON at position 0"
**Cause:** Response is not JSON (probably HTML error page)
**Fix:**
1. Your deployment URL might be broken
2. Try testing with Postman to see the actual response
3. Check your deployment is still active
4. Try redeploying

---

## IF NOTHING WORKS...

### Step-by-Step Restart

1. **Start fresh with the code:**
   - Delete all code in `Code.gs`
   - Copy-paste fresh code from `GOOGLE_APPS_SCRIPT_CODE.js`
   - Save (Ctrl+S)

2. **Verify your Sheet:**
   - Go to Google Sheet
   - Refresh (F5)
   - Check headers: Timestamp | Order ID | Customer Name | Phone | Notes
   - Verify Sheet ID in the URL

3. **Update the code with correct Sheet ID:**
   - Copy Sheet ID from URL
   - Replace `YOUR_SHEET_ID_HERE` in code
   - Save (Ctrl+S)

4. **Deploy:**
   - Click **Deploy** → **New deployment**
   - Type: **Web app**
   - Execute as: Your email
   - Who has access: **Anyone**
   - Click **Deploy**
   - Copy the new URL

5. **Test with Postman:**
   - Use the test instructions in main guide
   - Verify you get `status: success`

6. **Update app:**
   - Paste NEW URL in Lookstylo Settings
   - Test a scan

---

## DEBUGGING CHECKLIST

When something doesn't work:

- [ ] URL in Settings is exactly correct (copy-pasted fresh)
- [ ] URL in Settings is complete (starts with https, ends with /useless)
- [ ] Sheet ID in code is correct (tested by deploying)
- [ ] Sheet name in code matches your sheet (check bottom tab)
- [ ] Headers exist in row 1 of your sheet
- [ ] You deployed as "Web app"
- [ ] "Who has access" is set to "Anyone"
- [ ] You saved code before deploying
- [ ] Browser cache is cleared (hard refresh with Ctrl+Shift+R)
- [ ] You tested with Postman and got success message
- [ ] Your Google Sheet was refreshed with F5

---

## ASK FOR HELP

When asking for help, provide:
1. Your deployment URL (it's safe to share)
2. Error message from browser console (F12)
3. Error message from Google Apps Script logs (**View** → **Logs**)
4. Screenshot of your Google Sheet structure
5. What exact step failed

This helps diagnose quickly!
