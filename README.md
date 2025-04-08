A JavaScript application that calculates the median of expenses up to the first Sunday of each month (inclusive), based on a structured expenses object.

🧠 Features
-Parses nested monthly expense data.
-Two implementations:
    solution1: basic version using iteration.
    solution2: optimized version using QuickSort.
-Calculates the median of valid numerical expenses.
-Handles empty or invalid data gracefully.

🛠 Technologies
- JavaScript (ES6)
- No external dependencies – uses only the standard library.

🚀 How it works
1. For each month, it determines the first Sunday.
2. Collects all valid expense values up to (and including) that day.
3. Computes the median of those values.
4. Returns a single median value or null if there are no valid expenses.
