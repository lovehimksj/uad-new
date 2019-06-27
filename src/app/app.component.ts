import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {Decrement, Increment, Reset} from "./action/counter.actions";
import {Login} from "./action/login-page.actions";
import {MediaMatcher} from "@angular/cdk/layout";
import {MatIconRegistry, MatSort, MatTableDataSource} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";
import {FormControl} from "@angular/forms";
import {map, startWith} from "rxjs/operators";
import {Document} from './package/document';

export interface Tile {
  color: string;
  cols: number;
  text: string;
}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Copy of Copy of Society_API (2) - April 5, 6:23 PM - April 9, 1:07 PM', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Copy of Copy of Society_API (2) - April 5, 6:23 PM - April 9, 1:07 PM', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component ({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  count$: Observable<number>;
  tiles: Tile[] = [
    {text: 'Three', cols: 3, color: 'lightpink'},
    {text: 'Three', cols: 3, color: 'lightpink'},
    {text: 'Three', cols: 3, color: 'lightpink'}
  ];
  myControl = new FormControl ();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  private readonly _mobileQueryListener: () => void;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;
  gridView: boolean = true;
  constructor (changeDetectorRef: ChangeDetectorRef,
               media: MediaMatcher,
               private store: Store<{ count: number }>,
               private domSanitizer: DomSanitizer,
               private matIconRegistry: MatIconRegistry) {
    this.mobileQuery = media.matchMedia ('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges ();
    this.mobileQuery.addListener (this._mobileQueryListener);
    this.count$ = store.pipe (select ('count'));
    this.matIconRegistry.addSvgIcon (
      `settings_outline`,
      this.domSanitizer.bypassSecurityTrustResourceUrl ("../assets/icons/outline-settings-24px.svg")
    );
    this.matIconRegistry.addSvgIcon (
      `app_round`,
      this.domSanitizer.bypassSecurityTrustResourceUrl ("../assets/icons/round-apps-24px.svg")
    );
    this.matIconRegistry.addSvgIcon (
      `account_outline`,
      this.domSanitizer.bypassSecurityTrustResourceUrl ("../assets/icons/outline-account_circle-24px.svg")
    );
    this.matIconRegistry.addSvgIcon (
      `search_round`,
      this.domSanitizer.bypassSecurityTrustResourceUrl ("../assets/icons/round-search-24px.svg")
    );
    this.matIconRegistry.addSvgIcon (
      `drop_arrow_round`,
      this.domSanitizer.bypassSecurityTrustResourceUrl ("../assets/icons/round-arrow_drop_down-24px.svg")
    );
    this.matIconRegistry.addSvgIcon (
      `view_list`,
      this.domSanitizer.bypassSecurityTrustResourceUrl ("../assets/icons/outline-view_list-24px.svg")
    );
    this.matIconRegistry.addSvgIcon (
      `view_grid`,
      this.domSanitizer.bypassSecurityTrustResourceUrl ("../assets/icons/outline-view_module-24px.svg")
    );
    this.matIconRegistry.addSvgIcon (
      `outline_info`,
      this.domSanitizer.bypassSecurityTrustResourceUrl ("../assets/icons/outline-info-24px.svg")
    );
  }

  ngOnInit (): void {
    const newDocument: Document = new Document('home', 'word', 'sample.docx', 'docx', new Date());
    newDocument.setFileExpiry(new Date());
    console.log(newDocument.getFile());
    console.log(newDocument.fileExpiry);
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  ngOnDestroy (): void {
    this.mobileQuery.removeListener (this._mobileQueryListener);
  }

  increment () {
    this.store.dispatch (new Increment ());
  }

  decrement () {
    this.store.dispatch (new Decrement ());
  }

  reset () {
    this.store.dispatch (new Reset ());
  }

  click (username: string, password: string) {
    this.store.dispatch (new Login ({username: username, password: password}));
  }

  onRightClick ($event) {
    // this.nRightClicks++;
    // return false;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}
