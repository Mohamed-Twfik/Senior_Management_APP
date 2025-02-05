"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lastSaturdayFormatted = exports.lastSaturday = exports.todayFormatted = exports.today = exports.formatDate = void 0;
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
exports.formatDate = formatDate;
exports.today = new Date();
exports.todayFormatted = (0, exports.formatDate)(exports.today);
const lastSaturday = new Date(exports.today);
exports.lastSaturday = lastSaturday;
lastSaturday.setDate(exports.today.getDate() - (exports.today.getDay() + 1) % 7);
exports.lastSaturdayFormatted = (0, exports.formatDate)(lastSaturday);
//# sourceMappingURL=input-field-date-format.js.map