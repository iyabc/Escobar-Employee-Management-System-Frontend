class Account {
    accountId: number;
    accountUsername: string;
    accountPassword: string;
    employeeName: string;
    accessInventoryManagementSystem: boolean;
    accessEmployeeManagementSystem: boolean;
    accessIncomeAndExpenseSystem: boolean;
    accessOrderingSystem: boolean;
    isActive: boolean

    constructor (
        accountId: number,
        accountUsername: string,
        accountPassword: string,
        employeeName: string,
        accessInventoryManagementSystem: boolean,
        accessEmployeeManagementSystem: boolean,
        accessIncomeAndExpenseSystem: boolean,
        accessOrderingSystem: boolean,
        isActive: boolean
    ){
        this.accountId = accountId;
        this.accountUsername = accountUsername;
        this.accountPassword = accountPassword;
        this.employeeName = employeeName;
        this.accessInventoryManagementSystem = accessInventoryManagementSystem;
        this.accessEmployeeManagementSystem = accessEmployeeManagementSystem;
        this.accessIncomeAndExpenseSystem = accessIncomeAndExpenseSystem;
        this.accessOrderingSystem = accessOrderingSystem;
        this.isActive = isActive;
    }
}

export default Account;

// class Account {
//     accountUsername: string;
//     accountPassword: string;
//     employeeName: string;
  
//     constructor(accountUsername: string, accountPassword: string, employeeName: string) {
//       this.accountUsername = accountUsername;
//       this.accountPassword = accountPassword;
//       this.employeeName = employeeName
//     }
  
//     toJson(){
//       return {
//           accountUsername: this.accountUsername,
//           accountPassword: this.accountPassword,
//           employeeName: this.employeeName
//       }
//     }
//   }
  
//   export default Account;