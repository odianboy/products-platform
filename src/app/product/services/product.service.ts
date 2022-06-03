import { Injectable } from "@angular/core";
import { cloneDeep } from "lodash";
import { BehaviorSubject, Observable, of } from "rxjs";
import { IProduct } from "src/app/core/types/product.interface";

@Injectable({
    providedIn: 'root'
})
export class ProductService  {
    product$: Observable<IProduct>;
    private _product$: BehaviorSubject<IProduct>;

    constructor() {
        this._product$ = new BehaviorSubject({} as IProduct);
        this.product$ = this._product$.asObservable();
    }

    fillProduct(product: IProduct): Observable<IProduct> {
        return of(product);
    }
}