import { IRulePayment } from "../types/IRulePayment";
import { DaysEnum } from "./DaysEnum";
import { CurrencyEnum } from "./CurrencyEnum";

const dailyFees: IRulePayment[] = [
  {
    fee: 25,
    endTime: "09:00",
    startTime: "00:01",
    currency: CurrencyEnum.USD,
  },
  {
    fee: 15,
    endTime: "18:00",
    startTime: "09:01",
    currency: CurrencyEnum.USD,
  },
  {
    fee: 20,
    endTime: "00:00",
    startTime: "18:01",
    currency: CurrencyEnum.USD,
  },
];

const weeklyFees: IRulePayment[] = [
  {
    fee: 30,
    endTime: "09:00",
    startTime: "00:01",
    currency: CurrencyEnum.USD,
  },
  {
    fee: 20,
    endTime: "18:00",
    startTime: "09:01",
    currency: CurrencyEnum.USD,
  },
  {
    fee: 25,
    endTime: "00:00",
    startTime: "18:01",
    currency: CurrencyEnum.USD,
  },
];

export const PAYMENT_DAY_RULE: Record<string, IRulePayment[]> = {
  [DaysEnum.MO]: dailyFees,
  [DaysEnum.TU]: dailyFees,
  [DaysEnum.WE]: dailyFees,
  [DaysEnum.TH]: dailyFees,
  [DaysEnum.FR]: dailyFees,
  [DaysEnum.SA]: weeklyFees,
  [DaysEnum.SU]: weeklyFees,
};
