import { BehaviorSubject, Observable } from "rxjs";
import { Exception } from "src/shared/Exception";

export abstract class AsyncTaskProcessor {

    protected isLoading$ = new BehaviorSubject<boolean>(false);
    protected error$ = new BehaviorSubject<Exception | null>(null);

    protected async makeAsyncTask<T>(task: Promise<T>, update: Function): Promise<void> {
        try {
            this.isLoading$.next(true);
            const result = await task;
            update(result);
        } catch (error: any) {
            this.error$.next(error);
        }
        this.isLoading$.next(false);
    }

    public isLoading(): Observable<boolean> {
        return this.isLoading$.asObservable();
    }

    public getError(): Observable<Exception | null> {
        return this.error$.asObservable();
    }
}