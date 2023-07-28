import { ActivatedRoute, ParamMap } from "@angular/router";
import { Observable, of } from "rxjs";

export class FakeActivatedRoute extends ActivatedRoute {
    public static paramValue = "1"
    public override get paramMap(): Observable<ParamMap> {
        return of({
            getAll: (name: string): string[] => [FakeActivatedRoute.paramValue],
            get: (name: string): string | null => FakeActivatedRoute.paramValue,
            has: (name: string): boolean => true,
            keys: ["id"]
        })
    }
}