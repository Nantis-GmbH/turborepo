# TSConfig

Had to remove the `typeRoots` property as hoisted types are not accessible, see https://github.com/microsoft/TypeScript/issues/33183

## Frontend Configuration

Probably we should copy a `.env` file and use Vite`s import.meta properties for the import to not write over the existing file in the frontend folder

# Issues

- Had to remove the `TIMING=1` parameter from one command as this does not work on Windows
- `turbo run clean` does not really work as this produces a `.turbo/turbo-clean.log` in the folder it is trying to delete
- Would be useful to declare scoped dependencies in order to avoid dependency clutter at least for graphing, see committed graph.jpg
