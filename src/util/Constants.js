export default {
    daysOfTheWeek: ["sun","mon","tue","wed","thu","fri","sat"],
    hourRange24: () => {
        const hours = [];
        for (let i=1; i<25; i++) { hours.push(`${i}:00`); }
        return hours;
    }
}