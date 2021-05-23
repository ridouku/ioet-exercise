/**
 * PaymentService Service Interface
 */

export interface IPaymentService {
    /**
     * Calculate employee payment
     * @path File path
     * @returns object
     */
    calculateEmployeePayment(path: string): object;

}
