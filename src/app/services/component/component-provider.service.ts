import { Injectable, Inject } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import { CacheService } from '@delon/cache';
import { Subject, BehaviorSubject } from 'rxjs';
import { CnRelativesMessageModel, BSN_RELATION_SUBJECT, BSN_RELATION_TRIGGER } from '../../core/relative-core';
import { CnApiService } from '../api/cn-api-service.service';
@Injectable()
export class ComponentProviderService {

    public com = [];
    public apiService: CnApiService;
    public cacheService: CacheService;
    public msgService: NzMessageService;
    public modalService: NzModalService;
    public activeRoute: ActivatedRoute;
    public commonRelationSubject: BehaviorSubject<CnRelativesMessageModel>;
    public commonRelationTrigger: BehaviorSubject<CnRelativesMessageModel>;
    constructor(
        private _apiService: CnApiService,
        private _cacheService: CacheService,
        private _msgService: NzMessageService,
        private _modalService: NzModalService,
        private _activeRoute: ActivatedRoute,
        @Inject(BSN_RELATION_SUBJECT)
        // tslint:disable-next-line: variable-name
        private _commonRelationSubject: BehaviorSubject<CnRelativesMessageModel>,
        @Inject(BSN_RELATION_TRIGGER)
        // tslint:disable-next-line: variable-name
        private _commonRelationTrigger: BehaviorSubject<CnRelativesMessageModel>
    ) {
        this.apiService = _apiService;
        this.cacheService = _cacheService;
        this.msgService = _msgService;
        this.modalService = _modalService;
        this.activeRoute = _activeRoute;
        this.commonRelationSubject = _commonRelationSubject;
        this.commonRelationTrigger = _commonRelationTrigger;
    }
}
