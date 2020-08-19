import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { fetch, optimisticUpdate } from '@nrwl/angular';
import * as ReadingListActions from './reading-list.actions';
import { HttpClient } from '@angular/common/http';
import { ReadingListItem } from '@tmo/shared/models';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ReadingListEffects implements OnInitEffects {
  loadReadingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.loadReadingList),
      fetch({
        run: () => {
          return this.http
            .get<ReadingListItem[]>('/api/reading-list')
            .pipe(
              map(data =>
                ReadingListActions.loadReadingListSuccess({ list: data })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return ReadingListActions.loadReadingListError({ error });
        }
      })
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.addToReadingList),
      optimisticUpdate({
        run: ({ book }) => {
          return this.http.post('/api/reading-list', book).pipe(
            map(() =>
              ReadingListActions.confirmedAddToReadingList({
                book
              })
            )
          );
        },
        undoAction: ({ book }) => {
          return ReadingListActions.failedAddToReadingList({
            book
          });
        }
      })
    )
  );

  undoAddBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.undoAddToReadingList),
      optimisticUpdate({
        run: ({ book }) => {
          const snackBarRef = this._snackBar.open('Add to list', 'Undo',{duration:2000,verticalPosition:'top'});
          return  snackBarRef.onAction().pipe(map(() =>{
            return  ReadingListActions.removeFromReadingList({
              item:{bookId:book.id,...book}
            })
          }
          ));
        },
        undoAction: ({ book }) => {
          return ReadingListActions.failedAddToReadingList({
            book
          });
        }
      })
    )
  );

  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.removeFromReadingList),
      optimisticUpdate({
        run: ({ item }) => {
          return this.http.delete(`/api/reading-list/${item.bookId}`).pipe(
            map(() =>
              ReadingListActions.confirmedRemoveFromReadingList({
                item
              })
            )
          );
        },
        undoAction: ({ item }) => {
          return ReadingListActions.failedRemoveFromReadingList({
            item
          });
        }
      })
    )
  );

  undoRemoveFromReadingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.undoRemoveFromReadingList),
      optimisticUpdate({
        run: ({ item }) => {
          const snackBarRef = this._snackBar.open('Remove from list', 'Undo',{duration:2000,verticalPosition:'top'});
        return  snackBarRef.onAction().pipe(map(() =>{
          return  ReadingListActions.addToReadingList({
            book:{id:item.bookId,...item}
            })
          }
          ));

          },
        undoAction: ({ item }) => {
          return ReadingListActions.failedRemoveFromReadingList({
            item
          });
        }
      })
    )
  );

  ngrxOnInitEffects() {
    return ReadingListActions.loadReadingList();
  }

  constructor(private actions$: Actions, private http: HttpClient,private _snackBar: MatSnackBar) {}
}
