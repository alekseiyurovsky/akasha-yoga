export class Deferred<T> {
    public resolve: ((value?: T) => void) | undefined;
    public reject: ((reason?: any) => void) | undefined;

    public promise = new Promise((resolve: (value?: T) => void, reject: (reason?: any) => void): void => {
        this.resolve = resolve;
        this.reject = reject;
    });
}
