Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
}

Date.prototype.addDays = function (h) {
    this.setTime(this.getTime() + (h * 24 * 60 * 60 * 1000));
    return this;
}

Object.defineProperties(Date.prototype, {
    date: {
        get: function () { return new Date(this.getTime() - (this.getTimezoneOffset() * 60000)).toISOString().split('T')[0]; }
    },
    time: {
        get: function () { return this.toTimeString().match(/\d{2}:\d{2}:\d{2}/)[0]; }
    },
    datetime: {
        get: function () { return this.date + " " + this.time }
    }
});