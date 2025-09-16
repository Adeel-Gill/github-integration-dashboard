import {
  Component, OnInit, OnChanges, SimpleChanges, Input
} from '@angular/core';
import { GridOptions, IGetRowsParams, ColDef, GridApi } from 'ag-grid-community';
import { GithubIntegrationService } from '../../services/github-integration.service';
import { flattenObject, deepValue, prettifyHeader } from '../../../../shared/utils/object-helpers';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

// ...existing imports...
@Component({
  selector: 'app-ag-grid-view',
  standalone: false,
  templateUrl: './ag-grid-view.component.html',
  styleUrls: ['./ag-grid-view.component.scss']
})
export class AgGridViewComponent implements OnInit, OnChanges {
  @Input() collection!: string;

  gridOptions: GridOptions<any> = {
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true
    },
    rowModelType: 'infinite',
    cacheBlockSize: 50,
    paginationPageSize: 50
  };

  private gridApi!: GridApi;
  //private gridColumnApi!: ColumnApi;

  private search$ = new Subject<string>();
  searchTerm = '';

  constructor(private svc: GithubIntegrationService) { }

  ngOnInit() {
    this.search$.pipe(debounceTime(300)).subscribe(q => {
      this.searchTerm = q;
      if (this.gridApi) {
        this.setDatasource(q);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['collection'] && this.collection) {
      this.searchTerm = '';
      if (this.gridApi) {
        this.setDatasource('');
      }
    }
  }

  onSearchChange(value: string) {
    this.search$.next(value);
  }

  onGridReady(event: any) {
    this.gridApi = event.api;
   // this.gridColumnApi = event.columnApi;
    this.setDatasource(this.searchTerm);
  }

  private setDatasource(search: string) {
    if (!this.gridApi) {
      return;
    }
    // Set columnDefs to empty before setting new datasource
    this.gridApi.setGridOption?.('columnDefs', []);
    this.gridApi.setGridOption?.('datasource', this.createDatasource(search));
  }

  private createDatasource(search: string) {
    const me = this;
    return {
      getRows(params: IGetRowsParams) {
        const page = Math.floor(params.startRow / (me.gridOptions!.cacheBlockSize!)) + 1;
        const body = {
          page,
          pageSize: me.gridOptions!.cacheBlockSize!,
          sort: params.sortModel,
          filters: params.filterModel,
          search
        };
        me.svc.fetchCollection(me.collection, body).subscribe({
          next: resp => {
            const rows = resp.data || [];
            const total = resp.total || 0;
            const currentColDefs = me.gridApi?.getColumnDefs() || [];
            if ((currentColDefs.length === 0) && rows.length > 0) {
              const flat = flattenObject(rows[0]);
              const colDefs: ColDef[] = Object.keys(flat).map(key => ({
                headerName: prettifyHeader(key),
                field: key,
                valueGetter: (p: any) => deepValue(p.data, key)
              }));
              me.gridApi?.setGridOption('columnDefs', colDefs);
              setTimeout(() => me.gridApi?.sizeColumnsToFit(), 50);
            }
            params.successCallback(rows, total);
          },
          error: () => {
            params.failCallback();
          }
        });
      }
    };
  }
}