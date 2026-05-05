# Release Process

## Local Checklist

```bash
npm ci
npm test
npm run build
```

## Version

Update `package.json` and `CHANGELOG.md`.

## Tag

```bash
git tag -a v0.1.0 -m "Quantum Noir v0.1.0"
git push origin v0.1.0
```

## GitHub Release

Create a GitHub release from the pushed tag and use the changelog section as release notes.
