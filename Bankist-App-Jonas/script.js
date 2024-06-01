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

console.log(accounts);

btnLogin.addEventListener('click', e => {
  e.preventDefault();
  accounts.forEach(account => {
    if (
      inputLoginUsername.value == account.username &&
      inputLoginPin.value == account.pin
    ) {
      currentAccount = account;
      // welcome
      labelWelcome.textContent = `Welcome back, ${account.owner.split(' ')[0]}`;

      // Balance Calculate
      labelBalance.textContent = `${calculateBalance(account)}€`;

      // Transactions container

      updateMovementContainer(account);

      containerApp.style.opacity = '100';
    }
  });
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();
  currentAccount.movements.push(+inputLoanAmount.value);
  updateMovementContainer(currentAccount);
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  if (+inputTransferAmount.value > calculateBalance(currentAccount)) {
    inputTransferTo.value = '';
    inputTransferAmount.value = '';
    return;
  }
  let account = findAccountByUserName(inputTransferTo.value);
  if (!account || account == currentAccount) {
    inputTransferTo.value = '';
    inputTransferAmount.value = '';
    return;
  }

  account?.movements.push(+inputTransferAmount.value);

  currentAccount.movements.push(-Number(inputTransferAmount.value));
  updateMovementContainer(currentAccount);

  inputTransferTo.value = '';
  inputTransferAmount.value = '';
});

btnClose.addEventListener('click', e => {
  e.preventDefault();

  if (
    inputCloseUsername.value == currentAccount.username &&
    inputClosePin.value == currentAccount.pin
  ) {
    for (let [i, account] of accounts.entries()) {
      if (account == currentAccount) {
        accounts.splice(i, 1);
        containerApp.style.opacity = '0';

        break;
      }
    }
    inputCloseUsername.value = '';
    inputClosePin.value = '';
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

function calculateBalance(account) {
  return account.movements.reduce((acc, curr) => acc + curr);
}

function updateMovementContainer(account, sort = undefined) {
  containerMovements.innerHTML = '';
  let sumIn = 0;
  let sumOut = 0;

  if (sort == true) {
    account.movements.sort((a, b) => a - b);
  } else if (sort == false) {
    account.movements.sort((a, b) => b - a);
  }

  account.movements.forEach((movement, i) => {
    let movementType;

    if (movement > 0) {
      movementType = 'deposit';
      sumIn += movement;
    } else {
      movementType = 'withdrawal';
      sumOut += movement;
    }

    let element = `<div class="movements__row">
        <div class="movements__type movements__type--${movementType}">${
      i + 1
    } ${movementType}</div>
        <div class="movements__value">${movement}€</div>
      </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', element);

    labelBalance.textContent = `${calculateBalance(account)}€`;
  });

  labelSumIn.textContent = `${sumIn}€`;
  labelSumOut.textContent = `${Math.abs(sumOut)}€`;
  labelSumInterest.textContent = `${sumIn * (account.interestRate / 100)}€`;
}
