"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceController = void 0;
const common_1 = require("@nestjs/common");
const get_user_decorator_1 = require("../utils/decorators/get-user.decorator");
const ObjectId_pipe_1 = require("../utils/pipes/ObjectId.pipe");
const queryParam_pipe_1 = require("../utils/pipes/queryParam.pipe");
const attendance_service_1 = require("./attendance.service");
const create_attendance_data_pipe_1 = require("./pipes/create-attendance-data.pipe");
const attendance_id_pipe_1 = require("./pipes/attendance-id.pipe");
const update_attendance_dto_1 = require("./dto/update-attendance.dto");
const update_attendance_data_pipe_1 = require("./pipes/update-attendance-data.pipe");
let AttendanceController = class AttendanceController {
    constructor(attendanceService) {
        this.attendanceService = attendanceService;
    }
    create(createAttendanceDto, user) {
        return this.attendanceService.create(createAttendanceDto, user);
    }
    findAll(queryParams, user) {
        return this.attendanceService.findAll(queryParams, user);
    }
    update(attendance, updateDto, user) {
        return this.attendanceService.update(attendance, updateDto, user);
    }
    remove(attendance) {
        return this.attendanceService.remove(attendance);
    }
};
exports.AttendanceController = AttendanceController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.Redirect)('/attendance'),
    __param(0, (0, common_1.Body)(create_attendance_data_pipe_1.CreateAttendanceDataPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('index'),
    __param(0, (0, common_1.Query)(queryParam_pipe_1.QueryParamPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('update/:attendanceId'),
    (0, common_1.Redirect)('/attendance?sort=-updatedAt'),
    __param(0, (0, common_1.Param)('attendanceId', ObjectId_pipe_1.ObjectIdPipe, attendance_id_pipe_1.AttendanceIdPipe)),
    __param(1, (0, common_1.Body)(update_attendance_data_pipe_1.UpdateAttendanceDataPipe)),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_attendance_dto_1.UpdateAttendanceDto, Object]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('delete/:attendanceId'),
    (0, common_1.Redirect)('/attendance'),
    __param(0, (0, common_1.Param)('attendanceId', ObjectId_pipe_1.ObjectIdPipe, attendance_id_pipe_1.AttendanceIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "remove", null);
exports.AttendanceController = AttendanceController = __decorate([
    (0, common_1.Controller)('attendance'),
    __metadata("design:paramtypes", [attendance_service_1.AttendanceService])
], AttendanceController);
//# sourceMappingURL=attendance.controller.js.map