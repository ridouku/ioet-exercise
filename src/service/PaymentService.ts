import * as fs from "fs";
import { IPaymentService } from "../types/IPaymentService";
import { PAYMENT_DAY_RULE } from "../constants/Rules";
import { DaysEnum } from "../constants/DaysEnum";
import { IRulePayment } from "../types/IRulePayment";
import { IScheduleFee, IScheduleInfo } from "../types/ISchedules";

export class PaymentService implements IPaymentService {
  private readonly _mockDate: string = "1/1/1999 ";

  public calculateEmployeePayment(path: string): object {
    const data: string = fs.readFileSync(path, "utf8");
    if (data.length === 0) {
      throw new Error("Empty file");
    }

    const employeesPayments: object = {};
    try {
      data.split("\n").forEach((line: string, index: number) => {
        const employeeInfo: string[] = line.split("=");
        const employeeName: string = employeeInfo[0];
        const payment = this._processSchedulesLine(employeeInfo[1]);
        employeesPayments[employeeName] = payment;
      });
      return employeesPayments;
    } catch {
      throw new Error("Unexpected Error");
    }
  }

  private _processSchedulesLine(scheduleInfo: string): number {
    let payment: number = 0;
    scheduleInfo.split(",").forEach((line: string, index: number) => {
      const scheduleDay: IScheduleInfo = this._getScheduleDay(line);
      const rule: IRulePayment[] = PAYMENT_DAY_RULE[scheduleDay.day];
      const times = scheduleDay.schedule.split("-");
      const startDate = times[0];
      const endDate = times[1];
      const fees: IScheduleFee[] = this._getFee(startDate, endDate, rule);
      fees.forEach((fee: IScheduleFee) => {
        payment = payment + fee.fee * fee.interval;
      });
    });

    return payment;
  }

  private _getScheduleDay(scheduleInfo: string): IScheduleInfo {
    let scheduleDayInfo: IScheduleInfo = {
      day: "",
      schedule: "",
    };

    Object.keys(DaysEnum).forEach((value: string) => {
      const data: string[] = scheduleInfo.split(DaysEnum[value]);
      if (data.length > 1) {
        scheduleDayInfo.day = DaysEnum[value];
        scheduleDayInfo.schedule = data[1];
      }
    });

    return scheduleDayInfo;
  }

  private _calculateIntervalHours(start: string, end: string): number {
    const startTime: string[] = start.split(":");
    const endTime: string[] = end.split(":");

    const startDate = new Date(0, 0, 0, parseInt(startTime[0]), 0, 0);
    const endDate = new Date(
      0,
      0,
      0,
      parseInt(endTime[0]),
      parseInt(endTime[1]),
      0
    );
    let diff = endDate.getTime() - startDate.getTime();
    let hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    if (hours < 0) hours = hours + 24;

    return hours;
  }

  private _getFee(
    start: string,
    end: string,
    rule: IRulePayment[]
  ): IScheduleFee[] {
    const startTime: Date = new Date(this._mockDate + start);
    const endTime: Date = new Date(this._mockDate + end);
    const fees: IScheduleFee[] = [];
    let checkNextInterval: boolean = false;

    rule.forEach((info: IRulePayment) => {
      const ruleStartTime: Date = new Date(this._mockDate + info.startTime);
      const infoEndTime: string =
        info.endTime.split(":")[0] === "00" ? "24:00" : info.endTime;
      let ruleEndTime: Date = new Date(this._mockDate + infoEndTime);
      const ruleInterval: number = this._calculateIntervalHours(
        info.startTime,
        info.endTime
      );
      const currentInterval: number = this._calculateIntervalHours(start, end);
      const initCurrentInterval: number = this._calculateIntervalHours(
        info.startTime,
        start
      );
      const sumIntervals: number = initCurrentInterval + currentInterval;
      const targetIntervalTime: string = checkNextInterval
        ? info.startTime
        : start;
      const targetEndIntervalTime: string =
        sumIntervals > ruleInterval && !checkNextInterval ? info.endTime : end;
      const targetTime: Date =
        startTime >= ruleStartTime && startTime <= ruleEndTime
          ? startTime
          : endTime;

      if (targetTime >= ruleStartTime && targetTime <= ruleEndTime) {
        const interval: number = this._calculateIntervalHours(
          targetIntervalTime,
          targetEndIntervalTime
        );
        fees.push({
          interval,
          fee: info.fee
        });
      }

      if (
        targetTime >= ruleStartTime &&
        targetTime <= ruleEndTime &&
        sumIntervals > ruleInterval
      )
        checkNextInterval = true;
      else checkNextInterval = false;
    });

    return fees;
  }
}
