'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
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
  const loanAmount = Number(inputLoanAmount.value);

  if (
    loanAmount > 0 &&
    currentAccount.movements.some(mov => mov > loanAmount * (10 / 100))
  ) {
    currentAccount.movements.push(loanAmount);
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
    receiverAcc.movements.push(+inputTransferAmount.value);
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
  return account.movements.reduce((acc, curr) => acc + curr);
}

function updateMovementContainer(account, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movs.forEach((movement, i) => {
    let movementType;

    if (movement > 0) movementType = 'deposit';
    else movementType = 'withdrawal';

    let element = `<div class="movements__row">
        <div class="movements__type movements__type--${movementType}">${
      i + 1
    } ${movementType}</div>
        <div class="movements__value">${movement}€</div>
      </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', element);

    labelBalance.textContent = `${getBalance(account)}€`;
  });

  const sumIn = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = `${sumIn}€`;

  const sumOut = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = `${Math.abs(sumOut)}€`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumInterest.textContent = `${interest}€`;
}
