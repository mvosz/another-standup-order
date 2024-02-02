import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'standup';
  unfocus: Subject<void> = new Subject();
  focusFirst: Subject<void> = new Subject();

  urlNames$: Observable<string[]> = this.activatedRoute.queryParamMap.pipe(
    map((parameter) => {
      return !!parameter.get('names')
        ? parameter.get('names')!.split(',')
        : parameter.keys;
    })
  );

  storedNames: string[] = localStorage.getItem('names')
    ? JSON.parse(localStorage.getItem('names')!)
    : [];

  unusedNames$: Observable<string[]> = this.urlNames$.pipe(
    map((urlNames) => {
      return this.storedNames && urlNames
        ? this.storedNames.filter(
            (storedName) => !urlNames.some((urlName) => urlName === storedName)
          )
        : [];
    })
  );

  listNames: string[] = [];
  recentlyNames: string[] = [];
  focusPerson: string;
  alreadyRandomize: boolean;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.urlNames$.subscribe((names) => {
      const storedNames = [...new Set([...this.storedNames, ...names])];
      localStorage.setItem('names', JSON.stringify(storedNames));

      this.listNames = names;
    });

    this.unusedNames$.subscribe((unused) => {
      this.recentlyNames = [...new Set(unused)];
    });
  }

  onRandomize() {
    if (this.alreadyRandomize) {
      return;
    }

    this.alreadyRandomize = true;

    this.unfocus.next();

    setTimeout(() => {
      const loop = Math.floor(Math.random() * (6 - 3 + 1) + 3);
      for (let i = 0; i < loop; i++) {
        setTimeout(() => {
          this.listNames = this.listNames.sort(() => 0.5 - Math.random());
          if (i === loop - 1) {
            this.alreadyRandomize = false;
            setTimeout(() => {
              this.focusFirst.next();
            }, 200);
          }
        }, 200 * i);
      }
    }, 300);
  }

  onAdd(name: string, placing: 'top' | 'bottom' = 'top'): void {
    this.listNames =
      placing === 'top' && !this.focusPerson
        ? [...new Set([...[name], ...this.listNames])]
        : [...new Set([...this.listNames, ...[name]])];
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        names: this.listNames.toString(),
      },
    });
  }

  onCancel(name: string): void {
    this.storedNames = localStorage.getItem('names')
      ? JSON.parse(localStorage.getItem('names')!)
      : [];

    this.storedNames.push(name);

    this.listNames = this.listNames.filter((listName) => listName !== name);
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: this.listNames.length
        ? {
            names: this.listNames.toString(),
          }
        : {},
    });
  }

  onCancelAll(): void {
    this.recentlyNames = [
      ...new Set([...this.recentlyNames, ...this.listNames]),
    ].sort();

    localStorage.setItem('names', JSON.stringify(this.recentlyNames));

    this.listNames = [];
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {},
    });
  }

  onRemove(name: string): void {
    this.recentlyNames = this.recentlyNames
      .filter((recentlyName) => recentlyName !== name)
      .sort();

    let newStorageList: string[] = JSON.parse(localStorage.getItem('names')!);
    newStorageList = newStorageList.filter(
      (storageName) => storageName !== name
    );

    localStorage.setItem('names', JSON.stringify(newStorageList));
  }

  setFocusPerson(person) {
    this.focusPerson = person;
  }
}
