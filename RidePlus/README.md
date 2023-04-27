# RidePlus React Native Frontend

## Getting Started

Clone the repository

```bash
git clone https://github.com/WhatBurgerForToday/RidePlus.git
```

Navigate to the directory

```bash
cd RidePlus/RidePlus
```

Install project dependencies

```bash
npm ci
```

Launch the app

```bash
npm run dev:tunnel
```

> If your local machine and mobile device are in the same LAN, you can start the server without using a tunnel, results in a faster speed.
>
> ```bash
> npm run dev
> ```

## Scripts

- `npm run dev`

  Launch the dev server with hot reloading.

  > Either local machine and mobile device are in the same LAN or the use of a emulator / simulator is needed.

- `npm run dev:[ios|android|web]`

  Launch the dev server for a specific platform.

- `npm run dev:tunnel`

  Launch the dev server with a tunnel set up, suitible for most situations.

- `npm run lint`

  Lint the source code of the project.

- `npm run format[:check]`

  Overwrite or check the format of the project.

- `npm run typecheck`

  Run type checking for the project.
