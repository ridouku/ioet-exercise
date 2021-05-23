import { PaymentService } from "./service/PaymentService";

const paymentService = new PaymentService();
const result: object = paymentService.calculateEmployeePayment(
  "./resources/employeeInfo.txt"
);

Object.keys(result).forEach((key: string) => {
  console.log(`The amount to pay ${key} is: ${result[key]} USD`);
});
