const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

//Add new object
const addData = (obj) => {
  data.push(obj);

  updateDOM();
}

//fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name:  `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  }
  addData(newUser);
}

getRandomUser();
getRandomUser();
getRandomUser();

//Update DOM using foreach()
const updateDOM = (providedData = data) => {
  //clear Main Div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`
    main.appendChild(element);
  });
}

//format number as money
const formatMoney = number => {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// double money using MAP()
const doubleMoney = () => {
  data = data.map(user => {
    return {...user, money: user.money * 2};
  });
  updateDOM();
}

//sort users by Richest using SORT()
const sortByRichest = () => {
  data.sort((a,b) => b.money - a.money)

  updateDOM();
}

//filter millionaires using filter()
const showMillionaires = () => {
  data = data.filter(user => user.money > 1000000);
  updateDOM();
}

//calculate total wealth using reduce()
const calculateWealth = () => {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth <strong>${formatMoney(wealth)}</strong</h3>`
  // console.log(formatMoney(wealth));
  main.appendChild(wealthEl);
}

//Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);

console.log(data);