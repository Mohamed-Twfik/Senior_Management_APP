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
exports.ClientsController = void 0;
const common_1 = require("@nestjs/common");
const clients_service_1 = require("./clients.service");
const get_user_decorator_1 = require("../../utils/decorators/get-user.decorator");
const client_dto_1 = require("./dto/client.dto");
const queryParam_pipe_1 = require("../../utils/pipes/queryParam.pipe");
const ObjectId_pipe_1 = require("../../utils/pipes/ObjectId.pipe");
const client_id_pipe_1 = require("./pipes/client-id.pipe");
let ClientsController = class ClientsController {
    constructor(clientsService) {
        this.clientsService = clientsService;
    }
    create(user, clientDto) {
        return this.clientsService.create(clientDto, user);
    }
    findAll(queryParams, user) {
        return this.clientsService.findAll(queryParams, user);
    }
    update(client, queryParams, clientDto, user) {
        return this.clientsService.updateRoute(client, clientDto, user, queryParams);
    }
    remove(client, queryParams) {
        return this.clientsService.remove(client, queryParams);
    }
};
exports.ClientsController = ClientsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.Redirect)('/clients'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, client_dto_1.ClientsDto]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('index'),
    __param(0, (0, common_1.Query)(queryParam_pipe_1.QueryParamPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('update/:clientId'),
    (0, common_1.Redirect)(),
    __param(0, (0, common_1.Param)('clientId', ObjectId_pipe_1.ObjectIdPipe, client_id_pipe_1.ClientIdPipe)),
    __param(1, (0, common_1.Query)(queryParam_pipe_1.QueryParamPipe)),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, client_dto_1.ClientsDto, Object]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('delete/:clientId'),
    (0, common_1.Redirect)(),
    __param(0, (0, common_1.Param)('clientId', ObjectId_pipe_1.ObjectIdPipe, client_id_pipe_1.ClientIdPipe)),
    __param(1, (0, common_1.Query)(queryParam_pipe_1.QueryParamPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "remove", null);
exports.ClientsController = ClientsController = __decorate([
    (0, common_1.Controller)('clients'),
    __metadata("design:paramtypes", [clients_service_1.ClientsService])
], ClientsController);
//# sourceMappingURL=clients.controller.js.map