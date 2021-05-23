import { PaymentService } from "./PaymentService";
import { expect } from "chai";
import { get } from "lodash";
import assert = require("assert");
import * as mock from "mock-fs";

describe("Payment Service - ", () => {
  let paymentService = new PaymentService();

  afterEach(() => {
    mock.restore();
  });

  it("should test payments from txt file", (done: Mocha.Done) => {
    mock({
      "./resources/employeeInfoUnitTest.txt": Buffer.from(
        "RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00\n" +
          "ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00\n" +
          "FRANCISCO=MO08:00-12:00,TH12:00-14:00,FR20:00-21:00,SU20:00-21:00\n" +
          "JEFFAR=MO07:00-12:00,TH13:00-14:00,FR20:00-21:00,SU20:00-21:00\n" +
          "RAMON=MO05:00-09:00,TU14:00-18:00,FR20:00-21:00,SA09:00-16:00,SU22:00-23:00\n" +
          "LUIS=TU08:00-12:00,WE12:00-14:00,SA01:00-08:00,SU00:00-01:00\n" +
          "RAFAEL=MO01:00-14:00"
      ),
    });
    const result: object = paymentService.calculateEmployeePayment(
      "./resources/employeeInfoUnitTest.txt"
    );
    expect(get(result, "RENE")).to.be.eq(215);
    expect(get(result, "ASTRID")).to.be.eq(85);
    expect(get(result, "FRANCISCO")).to.be.eq(145);
    expect(get(result, "JEFFAR")).to.be.eq(155);
    expect(get(result, "LUIS")).to.be.eq(340);
    expect(get(result, "RAMON")).to.be.eq(345);
    expect(get(result, "RAFAEL")).to.be.eq(275);
    expect(Object.keys(result).length).to.be.eq(7);
    done();
  });

  it("should test, unexpected error", (done: Mocha.Done) => {
    mock({
      "./resources/employeeInfoUnexpectedErrorTest.txt": Buffer.from("////"),
    });
    assert.throws(
      () => {
        paymentService.calculateEmployeePayment(
          "./resources/employeeInfoUnexpectedErrorTest.txt"
        );
      },
      Error,
      "Unexpected error"
    );
    done();
  });

  it("should test payments from empty file", (done: Mocha.Done) => {
    mock({
      "./resources/employeeInfoEmptyTest.txt": Buffer.from(""),
    });
    assert.throws(
      () => {
        paymentService.calculateEmployeePayment(
          "./resources/employeeInfoEmptyTest.txt"
        );
      },
      Error,
      "Empty file"
    );
    done();
  });

  it("should test error, file not found", (done: Mocha.Done) => {
    assert.throws(
      () => {
        paymentService.calculateEmployeePayment("");
      },
      Error,
      "Error from file not found"
    );
    done();
  });
});
