import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private openModalSource = new Subject<{ m: any, s: any }>();
    openModal$ = this.openModalSource.asObservable();

    openSubmoduleModal(m: any, s: any) {
        this.openModalSource.next({ m, s });
    }
}
