Design a modern mobile-first and desktop-friendly app UI called “3-in-1 Money Tracker”.

Theme:
Clean, friendly, motivating, simple, and organized. Use soft card layouts, rounded corners, clear tables, and easy-to-read financial summaries. The vibe should feel practical, Filipino-friendly, and encouraging for budgeting and saving. Use colors that feel fresh and positive, like white, light neutral backgrounds, green for income/saved, red for expenses/unpaid, blue or purple for planning and savings goals.

Main app structure:
Create a dashboard with a header showing:
- App title: 3-in-1 Money Tracker
- Person Name field
- Current month and year
- Summary cards for total income, total expenses, remaining balance, unpaid dues, and total saved

Add 3 main sections or tabs:

1) CASH FLOW TRACKER
This section should include:
- Person Name
- Month selector
- Year selector
- Starting Balance input
- Add Another Month button
- Add Transaction Row button

Create a responsive table with columns:
- Date
- Description
- In
- Out
- Amount
- Balance

Behavior to reflect in UI:
- “In” means income
- “Out” means expense
- “Amount” auto-displays the entered income or expense value
- “Balance” auto-calculates the running balance per row
- Show totals at the bottom or top:
  - Total Expenses
  - Total Income
  - Remaining Balance

Design notes:
- Make the table easy to scan
- Use sticky summary cards if possible
- Show empty state for a new month
- Add a button/card to create another month record

2) DUES KO PO! BAYARIN TRACKER
This section should include:
- Month of selector
- Add Bill button

Create a table with columns:
- Payment
- How Much
- Due Date
- Ano?
- Bayad na ba? (Yes / No checkbox or toggle)

Behavior to reflect in UI:
- User can mark bills as paid or unpaid
- Show visual distinction between paid and unpaid
- Include summary cards:
  - Total Bills
  - Total Paid
  - Total Unpaid

Design notes:
- Make “Bayad na ba?” a very clear yes/no interaction
- Use green badge for paid, red/orange for unpaid
- Keep the wording Filipino-friendly

3) MISSION IMPOSSIBLE IPON CHALLENGE
Create a savings challenge section with 5 challenge cards:

- 20 PESOS IPON CHALLENGE → 20 x 100 = 2,000
- 50 PESOS IPON CHALLENGE → 50 x 100 = 5,000
- 100 PESOS IPON CHALLENGE → 100 x 100 = 10,000
- 500 PESOS IPON CHALLENGE → 500 x 100 = 50,000
- 1000 PESOS IPON CHALLENGE → 1000 x 100 = 100,000

Each challenge card must include:
- Challenge title
- Amount per circle
- Total target amount
- 100 circles in a grid layout
- Each circle can be checked/filled
- Saved amount auto-calculated based on checked circles
- Remaining amount auto-calculated
- Progress bar
- Percentage complete

Also include smart savings suggestion area for each challenge:
- If target should be completed in 1 year:
  - Daily savings suggestion
  - Weekly savings suggestion
  - Monthly savings suggestion
- Example:
  - Goal: 100,000
  - Saved: 25,000
  - Remaining: 75,000
  - Suggested daily save: X
  - Suggested weekly save: X

Design notes:
- The 100 circles should be visually fun and motivating
- Checked circles should feel satisfying, like filled tokens or coins
- Show a countdown style text:
  - “You already saved: ₱____”
  - “You still need: ₱____”
- Add motivational microcopy like:
  - “Konti pa, kaya mo ‘yan!”
  - “Stay consistent every day.”
  - “1 step closer to your goal.”

Overall UX requirements:
- Mobile-first layout
- Desktop version too
- Clear navigation between the 3 features
- Friendly Taglish copy
- Clean empty states
- Easy data entry
- Financial summaries should always be visible and understandable
- Use charts only if they help, such as a small monthly cash flow bar chart or savings progress chart

Important logic to reflect in the UI:
- Running balance auto-calculates in Cash Flow Tracker
- Total income and total expenses auto-sum
- Dues can be marked yes/no for payment status
- Every checked savings circle auto-calculates saved amount
- Remaining target automatically counts down
- App shows recommended daily/weekly/monthly savings to finish within 1 year

Create these screens:
1. Login or welcome screen with person name
2. Main dashboard
3. Cash Flow Tracker screen
4. Add/edit month screen
5. Dues Ko Po screen
6. Ipon Challenge screen
7. Detailed challenge progress screen
8. Simple reports or summary screen

Design components needed:
- Buttons
- Inputs
- Dropdowns for month/year
- Tables
- Summary cards
- Progress bars
- Check circles
- Yes/No checkbox or toggle
- Empty states
- Modal for adding transaction or bill
- Motivational savings widgets

Use clear labels in English + Taglish:
- Cash Flow Tracker
- Dues Ko Po!
- Bayarin Tracker
- Mission Impossible Ipon Challenge
- Starting Balance
- Total Income
- Total Expenses
- Remaining Balance
- Bayad na ba?
- Saved Amount
- Remaining Goal
- Daily Suggestion
- Weekly Suggestion

Make the UI feel like a real app ready for development, with polished spacing, consistent typography, and reusable components.