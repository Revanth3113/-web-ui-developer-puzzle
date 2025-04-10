Dev Puzzle

## Getting Started

Please **DO NOT** clone or fork this repo. Follow the steps below to get started.

1. [Download the ZIP](../../archive/master.zip) file and extract it on your machine.

2. Install dependencies with `npm install`.

You should be able to start the app with `npm start`. The app runs at http://localhost:4200.

### About this app

The app you will be working on is called _okreads_. This app allows you to search for books and add them to your reading list. It is like [goodreads](https://goodreads.com) but lighter on features.

Users can search for books.

![](./screencapture-1.png)

Then add them to their reading list.

![](./screencapture-2.png)

#### Technologies used

- [Angular](http://angular.io/) - Browser app
- [NgRx](https://ngrx.io/) - State management
- [NestJS](https://docs.nestjs.com/) - API app
- [Nx](https://nx.dev/) - CLI dev tools

### Helpful Hints

- You can see an overview of the architecture by running `npx nx dep-graph`.
- You should not need to modify anything in the `apps/okreads` folder. The `browser` and `api` apps are shells that wrap around projects in the `libs` folder.
- Make sure lint and tests are passing before submitting your code. Write new tests as necessary.
- You can run individual tests by providing the project name as found in `angular.json`. For example,
  ```
  npx nx test books-data-access
  npx nx test books-feature
  ```

**Please take a look at the open Pull requests for some enhancements made to the functionality for this project**

