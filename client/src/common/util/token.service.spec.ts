import {JWTService} from "../token.service";

describe('JwtService', () => {
    describe('#setToken', () => {
        it ('should set token if argument provided is truthy', () => {
            const service = new JWTService();
            expect(service.getToken()).toBe('');
            service.setToken('test');
            expect(service.getToken()).toBe('test');
            service.setToken('');
            expect(service.getToken()).toBe('test');
        });
    });
});
