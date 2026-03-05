# 🚀 QUICK REFERENCE: Google Apps Script Setup
## 30-Second Overview + Flowchart

---

## THE FLOW (What Happens)

```
┌─────────────────────────────────────┐
│  Lookstylo App in Browser           │
│  User generates QR code             │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  User clicks "Scan QR"              │
│  Camera scans: {id, name, phone}    │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  User clicks "Save to Sheets"       │
│  POST request sent to:              │
│  https://script.google.com/...      │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  Google Apps Script                 │
│  doPost() receives data             │
│  Extracts: id, name, phone          │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  Google Apps Script                 │
│  Adds row to Google Sheet:          │
│  [Timestamp, id, name, phone, ""]   │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  Response sent to app               │
│  {"status": "success"}              │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  User sees:                         │
│  "Successfully saved to             │
│   Google Sheets!"                   │
└─────────────────────────────────────┘
```

---

## SETUP CHECKLIST (Step-by-Step)

### ✅ Phase 1: Create Google Sheet (2 minutes)
- [ ] Go to sheets.google.com
- [ ] Click "+ Blank"
- [ ] Name it "Lookstylo Orders"
- [ ] Add headers in row 1:
  - A1: Timestamp
  - B1: Order ID
  - C1: Customer Name
  - D1: Phone
  - E1: Notes

### ✅ Phase 2: Create Google Apps Script (5 minutes)
- [ ] Go to **Extensions** → **Apps Script**
- [ ] Delete default code (Ctrl+A, Delete)
- [ ] Copy-paste code from `GOOGLE_APPS_SCRIPT_CODE.js`
- [ ] Get your Sheet ID from the URL
- [ ] Replace `YOUR_SHEET_ID_HERE` with your actual ID
- [ ] Click **File** → **Save** (Ctrl+S)

### ✅ Phase 3: Deploy (3 minutes)
- [ ] Click **Deploy** (top-right)
- [ ] Click **New deployment**
- [ ] Click **Select type** dropdown → Choose **Web app**
- [ ] Description: "Lookstylo Orders API"
- [ ] Execute as: Your email (default)
- [ ] Who has access: **Anyone**
- [ ] Click **Deploy**
- [ ] Copy the URL that appears

### ✅ Phase 4: Test (2 minutes)
- [ ] Use curl or Postman to test the URL
- [ ] Check that you get: `"status": "success"`
- [ ] Go to Google Sheet → refresh page
- [ ] Verify test row appears

### ✅ Phase 5: Connect to App (1 minute)
- [ ] Open Lookstylo app → **Settings** tab
- [ ] Paste deployment URL
- [ ] URL is automatically saved
- [ ] Done! ✓

---

## QUICK ANSWERS

**Q: Where is my Sheet ID?**
A: In your Google Sheet URL, find the part between `/d/` and `/edit`:
```
https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7/edit#gid=0
                                       ↑ Copy this ↑
```

**Q: What does "doPost" mean?**
A: It's a Google Apps Script function that automatically runs when someone sends a POST request to your URL. POST = sending data.

**Q: Where do I find the deployment URL later?**
A: Click **Deploy** → **Manage deployments** → You'll see it listed there with a copy button.

**Q: What if I paste the wrong Sheet ID?**
A: You'll get an error in the logs. Go back to Apps Script code, fix the ID, save, and redeploy.

**Q: What if the QR scan doesn't save?**
A: Check:
1. Is the URL in your Settings correct?
2. Have you deployed the script?
3. Check browser console for errors (F12)

**Q: Can I delete data from Google Sheet?**
A: Yes! Just select rows and press delete. Or click a row number to delete the whole row.

**Q: What if I want to add more columns?**
A: Add headers to your sheet, then modify the `row` array in the code. Ask for help - it requires code changes.

---

## FILE PURPOSES

| File | Purpose |
|------|---------|
| `GOOGLE_APPS_SCRIPT_SETUP.md` | Complete detailed guide with screenshots descriptions |
| `GOOGLE_APPS_SCRIPT_CODE.js` | The exact code to copy-paste into Apps Script |
| `QUICK_REFERENCE.md` | This file - quick checklist and answers |

---

## ESTIMATED TIME

- Total setup: **15 minutes** (first time)
- Subsequent deployments: **2 minutes** (if you change code)

---

## SUPPORT

If something doesn't work:
1. Read `GOOGLE_APPS_SCRIPT_SETUP.md` → Troubleshooting section
2. Check Google Apps Script Logs: **View** → **Execution log**
3. Try testing with Postman to isolate the problem
4. Verify your Sheet ID is correct: `return "YOUR_ID_HERE";`

---

## YOU'RE ALL SET!

Once deployment works:
- Every QR scan saves automatically to Google Sheet
- Timestamp is added automatically
- No manual data entry needed
- You have a complete audit trail of all scans

Happy scanning! 📱✨
