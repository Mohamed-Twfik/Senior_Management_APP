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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientIdPipe = void 0;
const common_1 = require("@nestjs/common");
const clients_service_1 = require("../clients.service");
let ClientIdPipe = class ClientIdPipe {
    constructor(clientsService) {
        this.clientsService = clientsService;
    }
    async transform(clientId, metadata) {
        const client = await this.clientsService.findById(clientId);
        if (!client)
            throw new common_1.NotFoundException('خطأ في معرف المنتج.');
        return client;
    }
};
exports.ClientIdPipe = ClientIdPipe;
exports.ClientIdPipe = ClientIdPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [clients_service_1.ClientsService])
], ClientIdPipe);
//# sourceMappingURL=client-id.pipe.js.map