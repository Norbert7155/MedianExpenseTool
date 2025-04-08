// solution1: 0.300ms solution2: 0.300ms

/* 
In my case, the times of both functions are the same.   
The difference should be visible on a larger dataset.

If there are very few days in each month (e.g. 3 entries), 
the benefit of QuickSort is small. In such a case, 
simply iterating and checking if (day <= firstSunday) may be even faster than performing QuickSort. 
In a professional solution, a hybrid of the two functions can be used.
*/

expenses = {
    "2023-01": {
        "01": {
            "food": [ 22.11, 43, 11.72, 2.2, 36.29, 2.5, 19 ],
            "fuel": [ 210.22 ]
        },
        "09": {
            "food": [ 11.9 ],
            "fuel": [ 190.22 ]
        }
    },
    "2023-03": {
        "07": {
            "food": [ 20, 11.9, 30.20, 11.9 ]
        },
        "04": {
            "food": [ 10.20, 11.50, 2.5 ],
            "fuel": []
        }
    },
    "2023-04": {}
};

// Partition function to QuickSort
function partition(arr, left, right) {
    const pivot = arr[Math.floor((right + left) / 2)].day;
    let i = left;
    let j = right;

    while (i <= j) {
        while (arr[i].day < pivot) i++;  // Increment i until an element with day >= pivot is found
        while (arr[j].day > pivot) j--; // Decrement j until an element with day <= pivot is found
        if (i <= j) {
            [arr[i], arr[j]] = [arr[j], arr[i]]; // ES6 destructuring assignment for swap
            i++;
            j--;
        }
    }
    return i; 
}

// QuickSort function to sort an array of day objects based on the day

function quickSortArrayOffDays(arr, left = 0, right = arr.length - 1) {

    if(arr.length <= 1) {  
        return arr;
    }

    if (left < right) {
        const index = partition(arr, left, right);
        if (left < index - 1) quickSortArrayOffDays(arr, left, index - 1);
        if (index < right) quickSortArrayOffDays(arr, index, right);
    }
      
    return arr;
}

//function returning the first Sunday of the month
function getFirstSunday(year, month){
    const date = new Date(year,month-1,1);
    while (date.getDay() !== 0) { 
        date.setDate(date.getDate() + 1);
    } 
    return date.getDate();
}

// function returning the median of the array
function mediana(values) {
    if (!Array.isArray(values) || values.length === 0){ 
        return null; // Return null for empty array
    }
    const sorted = values.slice().sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : ((sorted[mid - 1] + sorted[mid]) / 2);
}




//Solution 1 - using forEach
function solution1(expenses){  
    let result = null;
    let allExpenses = [];

    Object.entries(expenses)
        .forEach(([yearAndMonth , days]) =>{  
            const [year, month] = yearAndMonth.split('-').map(val => parseInt(val, 10));
            if (isNaN(year) || isNaN(month)) {
                console.warn(`Incorrect year or month:${yearAndMonth}`);
                return;
            }
            let firstSunday = getFirstSunday(year, month) ;
            
            Object.entries(days)
                .forEach(([day, categories]) =>{  
                    const intDay = parseInt(day, 10);
                    if( intDay <= firstSunday){    // Only process days up to the first Sunday
                        Object.values(categories)
                            .forEach((expenses) => {  
                                expenses.forEach((expense) => {  
                                    if (typeof expense !== 'number' || isNaN(expense) || expense < 0) {  
                                        console.warn(`Incorrect value in expenses : ${expense}`);
                                        return;
                                    }
                                    allExpenses.push(expense);
                                });
                            })
                    }
                })
        })
    result = mediana(allExpenses); 
    return result;
}

//Solution 2 - using QuickSort  
function solution2(expenses){  
    let result = null;   
    let allExpenses = [];  
   
    Object.entries(expenses).forEach(([yearAndMonth , days]) => {
        const [year, month] = yearAndMonth.split('-').map(val => parseInt(val, 10));  
        if (isNaN(year) || isNaN(month)) {
            console.warn(`Incorrect year or month:${yearAndMonth}`);
            return;  
        }
        let firstSunday = getFirstSunday(year, month);
        const dayKeys = Object.keys(days)

        // Convert the object to an array of objects with day and categories.   
        const daysArray = dayKeys.map((day) => {   
            const intDay = parseInt(day, 10);  
            return{
                day: intDay,
                categories: days[day]  
            }; 
        });

        // Sort the days array using QuickSort
        quickSortArrayOffDays(daysArray);

        for (let i = 0; i < daysArray.length; i++) {    
            const dayObject = daysArray[i];   
            if (dayObject.day > firstSunday) {
                break;  
            } 
             
            Object.values(dayObject.categories)
                .forEach((expenses) => {  
                    expenses.forEach((expense) => {  
                        if (typeof expense !== 'number' || isNaN(expense) || expense < 0) {   
                            console.warn(`Incorrect value in expenses : ${expense}`);  
                            return;  
                        }
                        allExpenses.push(expense);
                    });
                });
        }
   
    });
    result = mediana(allExpenses);  
    return result;
}

const t1Start = performance.now();
const s1Result = solution1(expenses);
const t1End = performance.now();

const t2Start = performance.now();
const s2Result = solution2(expenses);
const t2End = performance.now();

//console.log("solution1 time:", (t1End - t1Start).toFixed(3) + "ms");
//console.log("solution2 time:", (t2End - t2Start).toFixed(3) + "ms");
//console.log("solution1 result:", s1Result);
//console.log("solution2 result:", s2Result);