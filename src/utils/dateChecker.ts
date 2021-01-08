
export class DateChecker {

     checkExpiredValue = (date: Date) => {
        const createdAT = new Date(date.toString());
        const presentdate = new Date();
        const diff = Math.abs((createdAT.valueOf()
         - presentdate.valueOf()) /
          (1000 * 60 * 60 * 24));
        return diff;
      };
      parseInt
}

