'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2024-07-26T23:36:17.929Z',
    '2024-07-20T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

let currentAccount;

// Fake Login

currentAccount = account1;
updateMovementContainer(currentAccount);
containerApp.style.opacity = '100';

const createUserNames = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUserNames(accounts);

btnLogin.addEventListener('click', e => {
  e.preventDefault();

  let account = accounts.find(
    account =>
      account.username == inputLoginUsername.value &&
      account.pin == inputLoginPin.value
  );

  if (account) {
    currentAccount = account;
    labelWelcome.textContent = `Welcome back, ${account.owner.split(' ')[0]}`;
    labelBalance.textContent = `${getBalance(account)}€`;
    updateMovementContainer(account);
    containerApp.style.opacity = '100';
    inputLoginUsername.value = inputLoginPin.value = '';
  }
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const loanAmount = Number(Number(inputLoanAmount.value).toFixed(2));

  if (
    loanAmount > 0 &&
    currentAccount.movements.some(mov => mov > loanAmount * (10 / 100))
  ) {
    currentAccount.movements.push(loanAmount);
    currentAccount.movementsDates.push(new Date().toISOString());
    updateMovementContainer(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  let receiverAcc = accounts.find(acc => acc.username == inputTransferTo.value);
  const amount = Number(inputTransferAmount.value);
  const balance = getBalance(currentAccount);

  if (
    receiverAcc &&
    amount > 0 &&
    balance >= amount &&
    receiverAcc.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-Number(inputTransferAmount.value));
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movements.push(+inputTransferAmount.value);
    receiverAcc.movementsDates.push(new Date().toISOString());
    updateMovementContainer(currentAccount);
  }
  inputTransferTo.value = inputTransferAmount.value = '';
});

btnClose.addEventListener('click', e => {
  e.preventDefault();

  if (
    inputCloseUsername.value == currentAccount.username &&
    inputClosePin.value == currentAccount.pin
  ) {
    const accIndex = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(accIndex, 1);
    containerApp.style.opacity = '0';
    inputCloseUsername.value = inputClosePin.value = '';
  }
});

let sort = false;

btnSort.addEventListener('click', () => {
  updateMovementContainer(currentAccount, !sort);
  sort = !sort;
});

function findAccountByUserName(userName) {
  let foundAccount;
  accounts.forEach(account => {
    if (userName == account.username) foundAccount = account;
  });
  return foundAccount;
}

function getBalance(account) {
  return account.movements.reduce((acc, curr) => acc + curr).toFixed(2);
}

function formatMovementDate(date) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth()}`.padStart(2, 0);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}

function updateMovementContainer(account, sort = false) {
  containerMovements.innerHTML = '';
  const now = new Date();

  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movs.forEach((movement, i) => {
    let movementType;

    const date = new Date(account.movementsDates[i]);
    const displayDate = formatMovementDate(date);

    if (movement > 0) movementType = 'deposit';
    else movementType = 'withdrawal';

    let element = `<div class="movements__row">
        <div class="movements__type movements__type--${movementType}">${
      i + 1
    } ${movementType}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${movement.toFixed(2)}€</div>
      </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', element);

    labelBalance.textContent = `${getBalance(account)}€`;
    labelDate.textContent = `${String(now.getDate()).padStart(2, 0)}/${String(
      now.getMonth() + 1
    ).padStart(2, 0)}/${now.getFullYear()}, ${String(now.getHours()).padStart(
      2,
      0
    )}:${String(now.getMinutes()).padStart(2, 0)}`;
  });

  const sumIn = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = `${sumIn.toFixed(2)}€`;

  const sumOut = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = `${Math.abs(sumOut.toFixed(2))}€`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
}
