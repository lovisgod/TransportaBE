"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateChecker = void 0;
class DateChecker {
    constructor() {
        this.checkExpiredValue = (date) => {
            const createdAT = new Date(date.toString());
            const presentdate = new Date();
            const diff = Math.abs((createdAT.valueOf()
                - presentdate.valueOf()) /
                (1000 * 60 * 60 * 24));
            return diff;
        };
    }
}
exports.DateChecker = DateChecker;
//# sourceMappingURL=dateChecker.js.map